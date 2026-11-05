import React, { useState } from 'react';

/**
 * Pure SVG Line Chart with gradient area fill, grid lines, and interactive tooltip
 */
const LineChart = ({
  data = [],
  valueKey = 'value',
  labelKey = 'label',
  color = '#6366f1',
  height = 240,
  unit = '',
  formatValue = (v) => v.toLocaleString()
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) {
    return <div className="state-center" style={{ height }}>No trend data available</div>;
  }

  const padding = { top: 20, right: 25, bottom: 35, left: 55 };
  const width = 600; // SVG viewBox width

  const values = data.map((d) => d[valueKey] || 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  // Add 10% breathing room top and bottom
  const yMin = Math.max(0, Math.floor(minVal - range * 0.1));
  const yMax = Math.ceil(maxVal + range * 0.1);
  const yRange = yMax - yMin || 1;

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, index) => {
    const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d[valueKey] - yMin) / yRange) * chartHeight;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Generate 4 horizontal grid levels
  const yGridLines = [0, 0.33, 0.66, 1].map((ratio) => {
    const val = Math.round(yMin + ratio * yRange);
    const y = padding.top + chartHeight - ratio * chartHeight;
    return { val, y };
  });

  // Pick ~5 x-axis labels evenly spaced
  const step = Math.max(1, Math.floor(data.length / 5));
  const xLabels = data.filter((_, idx) => idx % step === 0 || idx === data.length - 1);

  return (
    <div className="chart-container" style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`line-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines & Y labels */}
        {yGridLines.map((grid, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={grid.y}
              x2={width - padding.right}
              y2={grid.y}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={grid.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#94a3b8"
              fontFamily="inherit"
            >
              {grid.val >= 1000 ? `${(grid.val / 1000).toFixed(0)}k` : grid.val}
            </text>
          </g>
        ))}

        {/* Area Fill */}
        <path d={areaD} fill={`url(#line-gradient-${color})`} />

        {/* Line Stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive Points */}
        {points.map((p, i) => (
          <g key={i} onMouseEnter={() => setHoveredPoint(p)} onMouseLeave={() => setHoveredPoint(null)}>
            {/* Invisible large hit area */}
            <circle cx={p.x} cy={p.y} r="10" fill="transparent" style={{ cursor: 'pointer' }} />
            {/* Visible circle if hovered or if few points */}
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredPoint?.x === p.x ? 5 : data.length <= 14 ? 3 : 0}
              fill="#ffffff"
              stroke={color}
              strokeWidth="2.5"
              style={{ pointerEvents: 'none', transition: 'r 0.15s ease' }}
            />
          </g>
        ))}

        {/* X Axis Labels */}
        {xLabels.map((item, idx) => {
          const originalIdx = data.indexOf(item);
          const x = padding.left + (originalIdx / (data.length - 1 || 1)) * chartWidth;
          return (
            <text
              key={idx}
              x={x}
              y={height - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#94a3b8"
              fontFamily="inherit"
            >
              {item[labelKey] || item.date}
            </text>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredPoint && (
        <div
          style={{
            position: 'absolute',
            left: `${(hoveredPoint.x / width) * 100}%`,
            top: `${(hoveredPoint.y / height) * 100}%`,
            transform: 'translate(-50%, -125%)',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 10
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '10px' }}>
            {hoveredPoint.data[labelKey] || hoveredPoint.data.date}
          </div>
          <div style={{ fontWeight: 700, color: '#ffffff' }}>
            {formatValue(hoveredPoint.data[valueKey])} {unit}
          </div>
        </div>
      )}
    </div>
  );
};

export default LineChart;
