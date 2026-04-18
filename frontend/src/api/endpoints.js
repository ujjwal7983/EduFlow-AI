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
    VISA_VETTING: `${API_BASE_URL}/ai/visa-vetting`,
    HIDDEN_COSTS: `${API_BASE_URL}/ai/hidden-costs`,
    UNIVERSITY_MATCH: `${API_BASE_URL}/ai/university-predictor`,
  },
  LOANS: {
    ELIGIBILITY: `${API_BASE_URL}/loan/eligibility`,
    APPLY: `${API_BASE_URL}/loan/apply`,
    OFFERS: `${API_BASE_URL}/loan/offers`,
    RECOMMENDATIONS: `${API_BASE_URL}/loan/recommendations`,
  }
};
