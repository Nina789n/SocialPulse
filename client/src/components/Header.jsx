import React from 'react';
import { Menu, ShieldCheck } from 'lucide-react';

const Header = ({ title, onToggleMobile }) => {
  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobile}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="system-status">
          <span className="status-dot" />
          <span style={{ fontWeight: 500 }}>Live Mongoose DB</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
