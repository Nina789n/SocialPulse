import React, { useState } from 'react';

const PLATFORM_COLORS = {
  Instagram: '#e1306c',
  Facebook: '#1877f2',
  YouTube: '#ff0000',
  X: '#0f1419'
};

/**
 * Platform Comparison Bar Chart with selectable comparison metric
 */
const ComparisonChart = ({ data = [] }) => {
  const [activeMetric, setActiveMetric] = useState('engagement');

  const metrics = [
    { key: 'engagement', label: 'Engagement', unit: '' },
    { key: 'reach', label: 'Reach', unit: '' },
    { key: 'followers', label: 'Followers', unit: '' },
    { key: 'engagementRate', label: 'Eng Rate', unit: '%' }
  ];

  if (!data || data.length === 0) {
    return <div className="state-center" style={{ height: 200 }}>No platform data available</div>;
  }

  const values = data.map((d) => d[activeMetric] || 0);
  const maxVal = Math.max(...values, 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Metric Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {metrics.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setActiveMetric(m.key)}
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '6px',
              border: activeMetric === m.key ? '1px solid #6366f1' : '1px solid #e2e8f0',
              backgroundColor: activeMetric === m.key ? '#eef2ff' : '#ffffff',
              color: activeMetric === m.key ? '#4f46e5' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Comparison Horizontal Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {data.map((item) => {
          const val = item[activeMetric] || 0;
          const percentage = Math.max(4, Math.round((val / maxVal) * 100));
          const color = PLATFORM_COLORS[item.platformName] || '#6366f1';
          const isRate = activeMetric === 'engagementRate';

          return (
            <div key={item.platformName} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.platformName}</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>
                  {isRate ? `${val}%` : val.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '9999px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonChart;
