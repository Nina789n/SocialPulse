const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Generic fetch wrapper with query params and error handling
 */
const request = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message || `Request failed with status ${response.status}`);
  }

  return json.data;
};

export const api = {
  // Module 1: Overview
  getOverview: (days = 30, platform = 'All') =>
    request('/analytics/overview', { days, platform }),

  // Module 2: Platform Analytics
  getPlatformsAnalytics: (days = 30) =>
    request('/analytics/platforms', { days }),

  // Module 3: Engagement Analytics
  getEngagementAnalytics: (days = 30, platform = 'All') =>
    request('/analytics/engagement', { days, platform }),

  // Module 4: Audience Growth
  getAudienceGrowth: (days = 30, platform = 'All') =>
    request('/analytics/audience', { days, platform }),

  // Posts listing
  getPosts: (params = {}) =>
    request('/posts', params),

  // Platforms listing
  getPlatforms: () =>
    request('/platforms')
};

export default api;
