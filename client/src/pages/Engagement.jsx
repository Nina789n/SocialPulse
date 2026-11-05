import React, { useState, useEffect } from 'react';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import KpiCard from '../components/KpiCard';
import BarChart from '../charts/BarChart';
import DonutChart from '../charts/DonutChart';
import RecentPostsTable from '../components/RecentPostsTable';
import { Heart, MessageSquare, Share2, Percent, AlertCircle } from 'lucide-react';

const Engagement = () => {
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEngagement = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getEngagementAnalytics(days, platform);
        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch engagement data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEngagement();
    return () => {
      isMounted = false;
    };
  }, [days, platform]);

  if (loading && !data) {
    return (
      <div className="state-center">
        <div className="spinner" />
        <p>Loading engagement analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-banner">
        <AlertCircle size={20} />
        <div>{error}</div>
      </div>
    );
  }

  const summary = data?.summary || {};

  return (
    <div>
      <FilterBar
        days={days}
        setDays={setDays}
        platform={platform}
        setPlatform={setPlatform}
      />

      {/* Engagement KPI Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Likes</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
              <Heart size={18} />
            </div>
          </div>
          <div className="kpi-value">{summary.totalLikes?.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="trend-caption">Direct post appreciations</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Comments</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="kpi-value">{summary.totalComments?.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="trend-caption">Active audience discussions</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Shares & Reposts</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
              <Share2 size={18} />
            </div>
          </div>
          <div className="kpi-value">{summary.totalShares?.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="trend-caption">Content virality and distribution</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Average Engagement Rate</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
              <Percent size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#4f46e5' }}>
            {summary.avgEngagementRate}%
          </div>
          <div className="kpi-footer">
            <span className="trend-caption">Interactions relative to reach</span>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="charts-grid-2">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Engagement Trends Over Time</h3>
              <p>Daily volume of interactions (hover for metric breakdown)</p>
            </div>
          </div>
          <BarChart
            data={data?.engagementTrends || []}
            valueKey="total"
            labelKey="label"
            barColor="#6366f1"
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Platform Engagement Distribution</h3>
              <p>Contribution per channel towards overall engagement</p>
            </div>
          </div>
          <DonutChart
            data={data?.platformDistribution || []}
            valueKey="value"
            labelKey="platformName"
            centerTitle="Total"
          />
        </div>
      </div>

      {/* Top Engaging Posts Table */}
      <RecentPostsTable
        posts={data?.topPosts || []}
        title="Top Performing Content by Engagement Rate"
      />
    </div>
  );
};

export default Engagement;
