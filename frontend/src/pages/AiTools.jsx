import React from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../features/ai/ChatInterface';
import ROICalculator from '../features/ai/ROICalculator';
import TimelineGenerator from '../features/ai/TimelineGenerator';
import VisaSimulator from '../features/ai/VisaSimulator';
import HiddenCostsAnalyzer from '../features/ai/HiddenCostsAnalyzer';

const AiTools = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 space-y-8">
        
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">AI Career Suite</h1>
          <p className="text-[var(--text-secondary)] text-lg">A powerful bundle of intelligent tools to map, finance, and secure your future.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           {/* Primary Column - Financials & Timeline */}
           <div className="lg:col-span-8 space-y-8">
             {/* ROI Calculator needs wide horizontal space */}
             <div className="w-full">
                <ROICalculator />
             </div>
             
             {/* Secondary Tools can be split */}
             <div className="grid md:grid-cols-2 gap-8">
                <HiddenCostsAnalyzer />
                <VisaSimulator />
             </div>
             
             {/* Timeline takes bottom full width */}
             <div className="w-full">
                <TimelineGenerator />
             </div>
           </div>
           
           {/* Sidebar Column - Advisor Chat */}
           <div className="lg:col-span-4 h-full">
             <div className="sticky top-8 h-[calc(100vh-8rem)]">
               <ChatInterface />
             </div>
           </div>
        </div>

      </div>
    </Layout>
  );
};

export default AiTools;
