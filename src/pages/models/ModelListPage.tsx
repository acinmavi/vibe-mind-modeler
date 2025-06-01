import React from 'react';
import { useModels } from '../../contexts/ModelContext';
import ModelGrid from '../../components/models/ModelGrid';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ModelListPage: React.FC = () => {
  const { templates } = useModels();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Mental Model Templates</h1>
            <p className="mt-1 text-gray-600">
              Choose a thinking model to apply to your situation
            </p>
          </div>
          
          <ModelGrid templates={templates} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelListPage;