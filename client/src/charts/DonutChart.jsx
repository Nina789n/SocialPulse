import React, { useState } from 'react';

const PLATFORM_COLORS = {
  Instagram: '#e1306c',
  Facebook: '#1877f2',
  YouTube: '#ff0000',
  X: '#0f1419',
  Twitter: '#0f1419'
};

const DEFAULT_PALETTE = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

/**
 * Pure SVG Donut Chart with center value and platform legend
 */
const DonutChart = ({
  data = [],
  valueKey = 'value',
  labelKey = 'platformName',
  height = 240,
  centerTitle = 'Total',
  formatValue = (v) => v.toLocaleString()
}) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  if (!data || data.length === 0) {
    return <div className="state-center" style={{ height }}>No distribution data</div>;
  }

  const total = data.reduce((acc, d) => acc + (d[valueKey] || 0), 0);
  const size = 200;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  const slices = data.map((d, index) => {
    const val = d[valueKey] || 0;
    const percent = total > 0 ? (val / total) * 100 : 0;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += percent;

    const color = PLATFORM_COLORS[d[labelKey]] || DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];

    return {
      ...d,
      percent: percent.toFixed(1),
      strokeDasharray,
      strokeDashoffset,
      color,
      index
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', width: '100%', minHeight: height }}>
      {/* SVG Donut */}
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', overflow: 'visible' }}
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {slices.map((slice) => {
            const isHovered = hoveredSlice?.index === slice.index;
            return (
              <circle
                key={slice.index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                strokeLinecap="round"
                style={{
                  cursor: 'pointer',
                  transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                  opacity: hoveredSlice && !isHovered ? 0.6 : 1
                }}
                onMouseEnter={() => setHoveredSlice(slice)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            );
          })}
        </svg>

        {/* Center Label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
            {hoveredSlice ? hoveredSlice[labelKey] : centerTitle}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            {hoveredSlice
              ? `${hoveredSlice.percent}%`
              : total >= 1000000
              ? `${(total / 1000000).toFixed(1)}M`
              : total >= 1000
              ? `${(total / 1000).toFixed(0)}k`
              : total}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, minWidth: '160px' }}>
        {slices.map((slice) => {
          const isHovered = hoveredSlice?.index === slice.index;
          return (
            <div
              key={slice.index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.35rem 0.6rem',
                borderRadius: '6px',
                backgroundColor: isHovered ? '#f1f5f9' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={() => setHoveredSlice(slice)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: slice.color,
                    flexShrink: 0
                  }}
                />
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>
                  {slice[labelKey]}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                  {slice.percent}%
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  ({formatValue(slice[valueKey])})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutChart;
