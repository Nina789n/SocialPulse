import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import PlatformAnalytics from './pages/PlatformAnalytics';
import Engagement from './pages/Engagement';
import AudienceGrowth from './pages/AudienceGrowth';
import Reports from './pages/Reports';

const titles = {
  overview: 'Overview Dashboard',
  platforms: 'Platform Analytics',
  engagement: 'Engagement Analytics',
  audience: 'Audience & Growth Trends',
  reports: 'Analytical Reports'
};

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'platforms':
        return <PlatformAnalytics />;
      case 'engagement':
        return <Engagement />;
      case 'audience':
        return <AudienceGrowth />;
      case 'reports':
        return <Reports />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main-content">
        <Header
          title={titles[activeTab] || 'Dashboard'}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
        <main className="page-wrapper">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}

export default App;
