import React, { useState, useEffect } from 'react';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import KpiCard from '../components/KpiCard';
import RecentPostsTable from '../components/RecentPostsTable';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import DonutChart from '../charts/DonutChart';
import ComparisonChart from '../charts/ComparisonChart';
import { Info, AlertCircle } from 'lucide-react';

const Overview = () => {
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getOverview(days, platform);
        if (isMounted) {
          setOverviewData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load overview data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOverview();
    return () => {
      isMounted = false;
    };
  }, [days, platform]);

  if (loading && !overviewData) {
    return (
      <div className="state-center">
        <div className="spinner" />
        <p>Loading analytics overview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-banner">
        <AlertCircle size={20} />
        <div>
          <strong>Error connecting to API:</strong> {error}. Please verify the backend server and MongoDB are running.
        </div>
      </div>
    );
  }

  const kpis = overviewData?.kpis || {};

  return (
    <div>
      {/* Notice on simulated data */}
      <div className="simulated-notice">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={16} color="#6366f1" />
          <span>
            <strong>Simulated Analytics Environment:</strong> Demonstrating realistic multi-platform metrics across Instagram, Facebook, YouTube, and X.
          </span>
        </div>
        <span style={{ color: '#64748b' }}>Updated for {days} Days ({platform})</span>
      </div>

      {/* Filter Bar */}
      <FilterBar
        days={days}
        setDays={setDays}
        platform={platform}
        setPlatform={setPlatform}
      />

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <KpiCard
          title={kpis.followers?.label || 'Total Followers'}
          value={kpis.followers?.value || 0}
          change={kpis.followers?.change || 0}
          trend={kpis.followers?.trend || 'positive'}
          iconType="followers"
        />
        <KpiCard
          title={kpis.engagement?.label || 'Total Engagement'}
          value={kpis.engagement?.value || 0}
          change={kpis.engagement?.change || 0}
          trend={kpis.engagement?.trend || 'positive'}
          iconType="engagement"
        />
        <KpiCard
          title={kpis.engagementRate?.label || 'Engagement Rate'}
          value={kpis.engagementRate?.value || 0}
          change={kpis.engagementRate?.change || 0}
          trend={kpis.engagementRate?.trend || 'positive'}
          unit="%"
          iconType="engagementRate"
        />
        <KpiCard
          title={kpis.reach?.label || 'Total Reach'}
          value={kpis.reach?.value || 0}
          change={kpis.reach?.change || 0}
          trend={kpis.reach?.trend || 'positive'}
          iconType="reach"
        />
        <KpiCard
          title={kpis.impressions?.label || 'Total Impressions'}
          value={kpis.impressions?.value || 0}
          change={kpis.impressions?.change || 0}
          trend={kpis.impressions?.trend || 'positive'}
          iconType="impressions"
        />
        <KpiCard
          title={kpis.posts?.label || 'Total Posts'}
          value={kpis.posts?.value || 0}
          change={kpis.posts?.change || 0}
          trend={kpis.posts?.trend || 'positive'}
          iconType="posts"
        />
      </div>

      {/* Visualizations Grid 1: Follower Growth & Engagement Trends */}
      <div className="charts-grid-2">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Follower Growth</h3>
              <p>Cumulative follower growth trajectory over selected timeframe</p>
            </div>
          </div>
          <LineChart
            data={overviewData?.followerGrowth || []}
            valueKey="value"
            labelKey="label"
            color="#6366f1"
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Engagement Trends</h3>
              <p>Daily combined interactions (likes, comments, and shares)</p>
            </div>
          </div>
          <BarChart
            data={overviewData?.engagementTrends || []}
            valueKey="total"
            labelKey="label"
            barColor="#6366f1"
          />
        </div>
      </div>

      {/* Visualizations Grid 2: Platform Performance & Engagement Distribution */}
      <div className="charts-grid-2">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Platform Performance Comparison</h3>
              <p>Cross-channel benchmark across audience, reach, and engagement</p>
            </div>
          </div>
          <ComparisonChart data={overviewData?.platformPerformance || []} />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Engagement Distribution</h3>
              <p>Proportion of total interactions generated by each social platform</p>
            </div>
          </div>
          <DonutChart
            data={overviewData?.engagementDistribution || []}
            valueKey="value"
            labelKey="platformName"
            centerTitle="Total Eng"
          />
        </div>
      </div>

      {/* Recent Posts Table */}
      <RecentPostsTable posts={overviewData?.recentPosts || []} />
    </div>
  );
};

export default Overview;
