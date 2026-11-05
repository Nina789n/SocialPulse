import React, { useState, useEffect } from 'react';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import ComparisonChart from '../charts/ComparisonChart';
import DonutChart from '../charts/DonutChart';
import {
  Printer,
  FileCheck,
  TrendingUp,
  HeartHandshake,
  Users,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Reports = () => {
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overview, setOverview] = useState(null);
  const [platformData, setPlatformData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchReportData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [ovData, platData] = await Promise.all([
          api.getOverview(days, platform),
          api.getPlatformsAnalytics(days)
        ]);
        if (isMounted) {
          setOverview(ovData);
          setPlatformData(platData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to generate analytical report');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReportData();
    return () => {
      isMounted = false;
    };
  }, [days, platform]);

  const handlePrint = () => {
    window.print();
  };

  if (loading && !overview) {
    return (
      <div className="state-center">
        <div className="spinner" />
        <p>Compiling analytical report...</p>
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

  const kpis = overview?.kpis || {};
  const platforms = platformData?.platforms || [];
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      {/* Report Controls (Hidden when printed) */}
      <div className="no-print">
        <FilterBar
          days={days}
          setDays={setDays}
          platform={platform}
          setPlatform={setPlatform}
          extraActions={
            <button type="button" className="btn-primary" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print Report</span>
            </button>
          }
        />
      </div>

      {/* Printable Report Header */}
      <div
        className="table-card"
        style={{
          padding: '1.75rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#6366f1'
                }}
              />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Executive Social Analytics Report
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              SocialPulse Performance Audit
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.2rem' }}>
              Comprehensive multi-channel synthesis covering historical metrics, engagement patterns, and growth indicators.
            </p>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
            <div style={{ color: '#0f172a', fontWeight: 600 }}>Period: Past {days} Days</div>
            <div style={{ color: '#64748b' }}>Platform: {platform === 'All' ? 'All Channels' : platform}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.25rem' }}>
              Generated: {currentDate}
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Performance Summary */}
      <div className="chart-card" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-card-header">
          <div className="chart-title-area">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileCheck size={18} color="#6366f1" />
              1. Executive Performance Summary
            </h3>
            <p>Macro indicators aggregated across selected channels</p>
          </div>
        </div>

        <div className="kpi-grid" style={{ marginBottom: 0 }}>
          <div className="kpi-card">
            <div className="kpi-title">Total Audience</div>
            <div className="kpi-value">{kpis.followers?.value?.toLocaleString()}</div>
            <div className="kpi-footer">
              <span style={{ color: '#059669', fontWeight: 600 }}>+{kpis.followers?.change}%</span>
              <span className="trend-caption">growth</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-title">Gross Interactions</div>
            <div className="kpi-value">{kpis.engagement?.value?.toLocaleString()}</div>
            <div className="kpi-footer">
              <span style={{ color: '#4f46e5', fontWeight: 600 }}>{kpis.engagement?.change}%</span>
              <span className="trend-caption">period delta</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-title">Average Engagement</div>
            <div className="kpi-value">{kpis.engagementRate?.value}%</div>
            <div className="kpi-footer">
              <span className="trend-caption">healthy industry baseline</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-title">Total Reach</div>
            <div className="kpi-value">{kpis.reach?.value?.toLocaleString()}</div>
            <div className="kpi-footer">
              <span className="trend-caption">unique accounts reached</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-title">Total Impressions</div>
            <div className="kpi-value">{kpis.impressions?.value?.toLocaleString()}</div>
            <div className="kpi-footer">
              <span className="trend-caption">total views generated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Engagement Analysis & Audience Growth Summary */}
      <div className="charts-grid-2">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HeartHandshake size={18} color="#db2777" />
                2. Engagement Analysis
              </h3>
              <p>Interaction share distribution by platform</p>
            </div>
          </div>
          <DonutChart
            data={overview?.engagementDistribution || []}
            valueKey="value"
            labelKey="platformName"
            centerTitle="Total"
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-title-area">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#10b981" />
                3. Audience Growth Summary
              </h3>
              <p>Community scale and market share by channel</p>
            </div>
          </div>
          <DonutChart
            data={platforms.map((p) => ({
              platformName: p.platformName,
              value: p.followers
            }))}
            valueKey="value"
            labelKey="platformName"
            centerTitle="Audience"
          />
        </div>
      </div>

      {/* Section 4: Cross-Platform Performance Breakdown Table */}
      <div className="table-card" style={{ marginBottom: '1.5rem' }}>
        <div className="table-card-header">
          <div className="chart-title-area">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#6366f1" />
              4. Platform Performance Breakdown
            </h3>
            <p>Detailed channel metrics comparison</p>
          </div>
        </div>

        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Handle / Username</th>
                <th>Followers</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Shares</th>
                <th>Reach</th>
                <th>Impressions</th>
                <th>Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr key={p.platformName}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{p.platformName}</td>
                  <td style={{ color: '#64748b' }}>{p.username}</td>
                  <td>{p.followers?.toLocaleString()}</td>
                  <td>{p.likes?.toLocaleString()}</td>
                  <td>{p.comments?.toLocaleString()}</td>
                  <td>{p.shares?.toLocaleString()}</td>
                  <td>{p.reach?.toLocaleString()}</td>
                  <td>{p.impressions?.toLocaleString()}</td>
                  <td style={{ fontWeight: 700, color: '#4f46e5' }}>{p.engagementRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 5: Platform Comparison Visual */}
      <div className="chart-card">
        <div className="chart-card-header">
          <div className="chart-title-area">
            <h3>5. Visual Platform Benchmark</h3>
            <p>Direct comparative metrics</p>
          </div>
        </div>
        <ComparisonChart data={platforms} />
      </div>
    </div>
  );
};

export default Reports;
