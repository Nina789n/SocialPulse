import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  HeartHandshake,
  Percent,
  Radio,
  Eye,
  FileSpreadsheet
} from 'lucide-react';

const iconMap = {
  followers: Users,
  engagement: HeartHandshake,
  engagementRate: Percent,
  reach: Radio,
  impressions: Eye,
  posts: FileSpreadsheet
};

const KpiCard = ({ title, value, change, trend = 'positive', unit = '', iconType = 'followers' }) => {
  const Icon = iconMap[iconType] || Users;
  const isPositive = trend === 'positive';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const formattedValue =
    typeof value === 'number'
      ? unit === '%'
        ? `${value.toFixed(2)}%`
        : value >= 1000000
        ? `${(value / 1000000).toFixed(2)}M`
        : value >= 1000
        ? value.toLocaleString()
        : value
      : value;

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className="kpi-icon-wrap">
          <Icon size={18} />
        </div>
      </div>

      <div className="kpi-value">{formattedValue}</div>

      <div className="kpi-footer">
        <div className={`trend-badge ${isPositive ? 'positive' : 'negative'}`}>
          <TrendIcon size={13} />
          <span>{Math.abs(change)}%</span>
        </div>
        <span className="trend-caption">vs previous period</span>
      </div>
    </div>
  );
};

export default KpiCard;
