import React from 'react';
import Layout from '../components/Layout';
import Eligibility from '../features/loans/Eligibility';
import LoanOffers from '../features/loans/LoanOffers';
import ApplyLoan from '../features/loans/ApplyLoan';

const Loans = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">Education Financing</h1>
          <p className="text-[var(--text-secondary)] text-lg">Smart, AI-driven loan recommendations designed for international students.</p>
        </div>

        <Eligibility />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div>
             <LoanOffers />
          </div>
          <div>
             <ApplyLoan />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Loans;
