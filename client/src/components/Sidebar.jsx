import React from 'react';
import {
  LayoutDashboard,
  Layers,
  HeartHandshake,
  TrendingUp,
  FileText,
  Activity,
  X
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'platforms', label: 'Platform Analytics', icon: Layers },
  { id: 'engagement', label: 'Engagement', icon: HeartHandshake },
  { id: 'audience', label: 'Audience Growth', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: FileText }
];

const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) => {
  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-icon-box">
            <Activity size={22} strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="brand-title">SocialPulse</div>
            <div className="brand-subtitle">Analytics Dashboard</div>
          </div>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="simulated-badge">
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#6366f1' }} />
            <span>Simulated Sample Data</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
