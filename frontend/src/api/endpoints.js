export const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://eduflow-ai-sm29.onrender.com/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
  },
  USER: {
    PROFILE: `/user/profile`,
    UPDATE_PROFILE: `/user/profile`,
  },
  AI: {
    CHAT: `/ai/chat`,
    TIMELINE: `/ai/timeline`,
    ROI: `/ai/roi`,
    RECOMMENDATION: `/ai/recommendation`,
    VISA_VETTING: `/ai/visa-vetting`,
    HIDDEN_COSTS: `/ai/hidden-costs`,
    UNIVERSITY_MATCH: `/ai/university-predictor`,
  },
  LOANS: {
    ELIGIBILITY: `/loan/eligibility`,
    APPLY: `/loan/apply`,
    OFFERS: `/loan/offers`,
    RECOMMENDATIONS: `/loan/recommendations`,
  }
};
