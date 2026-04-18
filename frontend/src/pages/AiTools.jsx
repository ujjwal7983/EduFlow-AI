import React from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../features/ai/ChatInterface';
import ROICalculator from '../features/ai/ROICalculator';
import TimelineGenerator from '../features/ai/TimelineGenerator';

const AiTools = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 space-y-8">
        
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">AI Career Suite</h1>
          <p className="text-[var(--text-secondary)] text-lg">A suite of intelligent tools powered by Gemini to help map your future.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-8">
             <ROICalculator />
             <TimelineGenerator />
           </div>
           
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
