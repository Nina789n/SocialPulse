import React, { useState, useEffect } from 'react';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import ComparisonChart from '../charts/ComparisonChart';
import LineChart from '../charts/LineChart';
import {
  Users,
  Heart,
  MessageSquare,
  Share2,
  Radio,
  Eye,
  Percent,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

const PLATFORM_THEMES = {
  Instagram: {
    color: '#e1306c',
    bg: '#fdf2f8',
    name: 'Instagram'
  },
  Facebook: {
    color: '#1877f2',
    bg: '#eff6ff',
    name: 'Facebook'
  },
  YouTube: {
    color: '#ff0000',
    bg: '#fef2f2',
    name: 'YouTube'
  },
  X: {
    color: '#0f1419',
    bg: '#f1f5f9',
    name: 'X (Twitter)'
  }
};

const PlatformAnalytics = () => {
  const [days, setDays] = useState(30);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platformData, setPlatformData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPlatformAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getPlatformsAnalytics(days);
        if (isMounted) {
          setPlatformData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch platform analytics');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlatformAnalytics();
    return () => {
      isMounted = false;
    };
  }, [days]);

  if (loading && !platformData) {
    return (
      <div className="state-center">
        <div className="spinner" />
        <p>Loading platform analytics...</p>
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

  const platforms = platformData?.platforms || [];
  const filteredPlatforms =
    selectedPlatform === 'All'
      ? platforms
      : platforms.filter((p) => p.platformName.toLowerCase() === selectedPlatform.toLowerCase());

  return (
    <div>
      <FilterBar
        days={days}
        setDays={setDays}
        platform={selectedPlatform}
        setPlatform={setSelectedPlatform}
      />

      {/* Platform Summary Cards Grid */}
      <div className="platform-cards-grid">
        {filteredPlatforms.map((plat) => {
          const theme = PLATFORM_THEMES[plat.platformName] || { color: '#6366f1', bg: '#eef2ff' };

          return (
            <div key={plat._id || plat.platformName} className="platform-stat-card">
              <div className="platform-stat-card-header">
                <div className="platform-identity">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      backgroundColor: theme.bg,
                      color: theme.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '18px'
                    }}
                  >
                    {plat.platformName.slice(0, 1)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                      {plat.platformName}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{plat.username}</p>
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.color,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {plat.engagementRate}% Eng Rate
                </span>
              </div>

              {/* Metrics rows */}
              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={14} /> Followers / Subs
                </span>
                <span className="metric-value">{plat.followers?.toLocaleString()}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileSpreadsheet size={14} /> Total Posts
                </span>
                <span className="metric-value">{plat.totalPosts}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Heart size={14} /> Total Likes
                </span>
                <span className="metric-value">{plat.likes?.toLocaleString()}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageSquare size={14} /> Total Comments
                </span>
                <span className="metric-value">{plat.comments?.toLocaleString()}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Share2 size={14} /> Total Shares
                </span>
                <span className="metric-value">{plat.shares?.toLocaleString()}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Radio size={14} /> Reach
                </span>
                <span className="metric-value">{plat.reach?.toLocaleString()}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Eye size={14} /> Impressions
                </span>
                <span className="metric-value">{plat.impressions?.toLocaleString()}</span>
              </div>

              <div className="platform-metric-row">
                <span className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Percent size={14} /> Engagement Rate
                </span>
                <span className="metric-value" style={{ color: theme.color, fontWeight: 700 }}>
                  {plat.engagementRate}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Comparison Section */}
      <div className="charts-grid-2">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Comparative Multi-Channel Benchmark</h3>
              <p>Compare all platforms side-by-side across major KPI indicators</p>
            </div>
          </div>
          <ComparisonChart data={platforms} />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3>Platform Reach Distribution</h3>
              <p>Audience exposure volume per social channel</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {platforms.map((p) => {
              const maxReach = Math.max(...platforms.map((x) => x.reach), 1);
              const pct = Math.round((p.reach / maxReach) * 100);
              const theme = PLATFORM_THEMES[p.platformName] || { color: '#6366f1' };

              return (
                <div key={p.platformName} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600 }}>{p.platformName}</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.reach?.toLocaleString()}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: theme.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
