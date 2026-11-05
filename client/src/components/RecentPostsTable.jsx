import React from 'react';
import { Heart, MessageSquare, Share2, Award } from 'lucide-react';

const getPlatformClass = (name = '') => {
  const lower = name.toLowerCase();
  if (lower.includes('insta')) return 'instagram';
  if (lower.includes('face')) return 'facebook';
  if (lower.includes('you')) return 'youtube';
  return 'x';
};

const RecentPostsTable = ({ posts = [], title = 'Recent Post Analytics' }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="table-card">
        <div className="table-card-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{title}</h3>
        </div>
        <div className="state-center">No posts found for this filter criteria</div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-card-header">
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{title}</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Latest content performance metrics and engagement indicators
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Platform</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Shares</th>
              <th>Engagement Rate</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const platformName = post.platformId?.platformName || 'Social';
              const pClass = getPlatformClass(platformName);
              const formattedDate = new Date(post.postDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              });

              return (
                <tr key={post._id || post.postTitle}>
                  <td style={{ maxWidth: '300px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={post.postTitle}>
                      {post.postTitle}
                    </div>
                  </td>
                  <td>
                    <span className={`platform-badge ${pClass}`}>
                      {platformName}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Heart size={14} color="#e1306c" />
                      <span>{post.likes?.toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MessageSquare size={14} color="#6366f1" />
                      <span>{post.comments?.toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Share2 size={14} color="#10b981" />
                      <span>{post.shares?.toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#4f46e5' }}>
                      <Award size={14} />
                      <span>{post.engagementRate}%</span>
                    </div>
                  </td>
                  <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPostsTable;
