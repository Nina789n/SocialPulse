import React, { useState } from 'react';

/**
 * Pure SVG Bar Chart with rounded corners, gridlines, and interactive tooltip
 */
const BarChart = ({
  data = [],
  valueKey = 'total',
  labelKey = 'label',
  barColor = '#6366f1',
  height = 240,
  unit = '',
  formatValue = (v) => v.toLocaleString()
}) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  if (!data || data.length === 0) {
    return <div className="state-center" style={{ height }}>No trend data available</div>;
  }

  const padding = { top: 20, right: 20, bottom: 35, left: 55 };
  const width = 600;

  const values = data.map((d) => d[valueKey] || 0);
  const maxVal = Math.max(...values, 10);
  const yMax = Math.ceil(maxVal * 1.15);

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const barWidth = Math.max(4, Math.min(28, (chartWidth / data.length) * 0.65));

  // 4 horizontal gridlines
  const yGridLines = [0, 0.33, 0.66, 1].map((ratio) => {
    const val = Math.round(ratio * yMax);
    const y = padding.top + chartHeight - ratio * chartHeight;
    return { val, y };
  });

  // Pick ~5-6 x-axis labels
  const step = Math.max(1, Math.floor(data.length / 6));
  const xLabelsIndices = new Set(data.map((_, i) => (i % step === 0 || i === data.length - 1 ? i : null)).filter(i => i !== null));

  return (
    <div className="chart-container" style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        {/* Horizontal grid lines */}
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

        {/* Bars */}
        {data.map((d, index) => {
          const val = d[valueKey] || 0;
          const barHeight = Math.max(2, (val / yMax) * chartHeight);
          const x = padding.left + (index + 0.5) * (chartWidth / data.length) - barWidth / 2;
          const y = padding.top + chartHeight - barHeight;
          const isHovered = hoveredBar?.index === index;

          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredBar({ index, x: x + barWidth / 2, y, data: d })}
              onMouseLeave={() => setHoveredBar(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Invisible touch target */}
              <rect
                x={x - 2}
                y={padding.top}
                width={barWidth + 4}
                height={chartHeight}
                fill="transparent"
              />
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={Math.min(4, barWidth / 2)}
                fill={isHovered ? '#4f46e5' : barColor}
                opacity={isHovered ? 1 : 0.85}
                style={{ transition: 'all 0.15s ease' }}
              />
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, index) => {
          if (!xLabelsIndices.has(index)) return null;
          const x = padding.left + (index + 0.5) * (chartWidth / data.length);
          return (
            <text
              key={index}
              x={x}
              y={height - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#94a3b8"
              fontFamily="inherit"
            >
              {d[labelKey] || d.date}
            </text>
          );
        })}
      </svg>

      {/* Floating Tooltip */}
      {hoveredBar && (
        <div
          style={{
            position: 'absolute',
            left: `${(hoveredBar.x / width) * 100}%`,
            top: `${(hoveredBar.y / height) * 100}%`,
            transform: 'translate(-50%, -115%)',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: 10
          }}
        >
          <div style={{ color: '#94a3b8', marginBottom: '2px', fontWeight: 600 }}>
            {hoveredBar.data[labelKey] || hoveredBar.data.date}
          </div>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff', marginBottom: '4px' }}>
            {formatValue(hoveredBar.data[valueKey])} {unit} Total
          </div>
          {hoveredBar.data.likes !== undefined && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: '#cbd5e1' }}>
              <div>❤️ Likes: {hoveredBar.data.likes.toLocaleString()}</div>
              <div>💬 Comments: {hoveredBar.data.comments.toLocaleString()}</div>
              <div>🔁 Shares: {hoveredBar.data.shares.toLocaleString()}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BarChart;
