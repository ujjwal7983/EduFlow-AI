import React, { useState } from 'react';
import Layout from '../components/Layout';
import Eligibility from '../features/loans/Eligibility';
import LoanOffers from '../features/loans/LoanOffers';
import LoanChecklist from '../features/loans/LoanChecklist';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

const Loans = () => {
  const [loanRequirements, setLoanRequirements] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAssessmentComplete = async (requirements) => {
    setLoanRequirements(requirements);
    setLoading(true);
    
    try {
      const response = await api.post(ENDPOINTS.LOANS.RECOMMENDATIONS, {
        amount: requirements.amount,
        cosignerIncome: requirements.cosignerIncome,
        tenure: requirements.tenure
      });

      if (response && response.data?.success) {
        setRecommendations({
          summary: response.data.summary,
          offers: response.data.offers
        });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch recommendations", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">Education Financing</h1>
          <p className="text-[var(--text-secondary)] text-lg">Smart, AI-driven loan recommendations designed for international students.</p>
        </div>

        <Eligibility onAssessmentComplete={handleAssessmentComplete} />

        {loanRequirements ? (
          <div className="grid lg:grid-cols-2 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
               <LoanOffers 
                 requirements={loanRequirements} 
                 recommendations={recommendations} 
                 loading={loading}
                 error={error}
               />
            </div>
            <div>
               <LoanChecklist />
            </div>
          </div>
        ) : (
          <div className="mt-8 p-12 glass-card-vibrant border-2 border-dashed border-[var(--border-color)] text-center opacity-75">
             <div className="text-[var(--text-muted)] text-lg font-medium">Please complete your eligibility assessment above to unlock personalized offers.</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Loans;
