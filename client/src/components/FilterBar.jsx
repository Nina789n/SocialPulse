import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const platformsList = ['All', 'Instagram', 'Facebook', 'YouTube', 'X'];

const FilterBar = ({
  days = 30,
  setDays,
  platform = 'All',
  setPlatform,
  hidePlatform = false,
  extraActions = null
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">
          <Calendar size={15} />
          <span>Date Range:</span>
        </span>
        <div className="pill-group">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              type="button"
              className={`pill-btn ${days === d ? 'active' : ''}`}
              onClick={() => setDays(d)}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        {!hidePlatform && (
          <>
            <span className="filter-label">
              <Filter size={15} />
              <span>Platform:</span>
            </span>
            <select
              className="select-control"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              aria-label="Select social media platform"
            >
              {platformsList.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Platforms' : p}
                </option>
              ))}
            </select>
          </>
        )}

        {extraActions}
      </div>
    </div>
  );
};

export default FilterBar;
