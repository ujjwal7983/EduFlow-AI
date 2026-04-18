export const API_BASE_URL = 'http://localhost:5000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
  },
  AI: {
    CHAT: `${API_BASE_URL}/ai/chat`,
    TIMELINE: `${API_BASE_URL}/ai/timeline`,
    ROI: `${API_BASE_URL}/ai/roi`,
    RECOMMENDATION: `${API_BASE_URL}/ai/recommendation`,
  },
  LOANS: {
    ELIGIBILITY: `${API_BASE_URL}/loan/eligibility`,
    APPLY: `${API_BASE_URL}/loan/apply`,
    OFFERS: `${API_BASE_URL}/loan/offers`,
  },
  USER: {
    PROFILE: '/user/profile',
  }
};
