import React, { useState, useEffect } from 'react';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import DonutChart from '../charts/DonutChart';
import { Users, UserPlus, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const AudienceGrowth = () => {
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('All');
  const [trendView, setTrendView] = useState('daily'); // 'daily' | 'weekly'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAudience = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getAudienceGrowth(days, platform);
        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch audience growth data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAudience();
    return () => {
      isMounted = false;
    };
  }, [days, platform]);

  if (loading && !data) {
    return (
      <div className="state-center">
        <div className="spinner" />
        <p>Loading audience analytics...</p>
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

      {/* Audience KPI Metrics */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Audience</span>
            <div className="kpi-icon-wrap">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">{summary.totalAudience?.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="trend-caption">Active cumulative community size</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">New Followers Gained</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
              <UserPlus size={18} />
            </div>
          </div>
          <div className="kpi-value">+{summary.newFollowers?.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="trend-caption">Acquired across the last {days} days</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Growth Percentage</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#4f46e5' }}>
            +{summary.growthPercentage}%
          </div>
          <div className="kpi-footer">
            <span className="trend-caption">Net expansion rate over baseline</span>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="charts-grid-2">
        {/* Cumulative Audience Trajectory */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Audience Trajectory</h3>
              <p>Cumulative follower base expansion over time</p>
            </div>
          </div>
          <LineChart
            data={data?.dailyTrends || []}
            valueKey="followers"
            labelKey="label"
            color="#4f46e5"
          />
        </div>

        {/* Platform Distribution */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Platform-wise Audience Share</h3>
              <p>Follower concentration across connected social networks</p>
            </div>
          </div>
          <DonutChart
            data={data?.audienceDistribution || []}
            valueKey="followers"
            labelKey="platformName"
            centerTitle="Total"
          />
        </div>
      </div>

      {/* Daily & Weekly Growth Trends */}
      <div className="chart-card">
        <div className="chart-card-header">
          <div className="chart-title-area">
            <h3>Net Follower Gain Trends</h3>
            <p>Pace of new audience acquisition</p>
          </div>
          <div className="pill-group">
            <button
              className={`pill-btn ${trendView === 'daily' ? 'active' : ''}`}
              onClick={() => setTrendView('daily')}
            >
              Daily
            </button>
            <button
              className={`pill-btn ${trendView === 'weekly' ? 'active' : ''}`}
              onClick={() => setTrendView('weekly')}
            >
              Weekly
            </button>
          </div>
        </div>

        {trendView === 'daily' ? (
          <BarChart
            data={data?.dailyTrends || []}
            valueKey="newFollowers"
            labelKey="label"
            barColor="#10b981"
          />
        ) : (
          <BarChart
            data={data?.weeklyTrends || []}
            valueKey="newFollowers"
            labelKey="label"
            barColor="#6366f1"
          />
        )}
      </div>
    </div>
  );
};

export default AudienceGrowth;
