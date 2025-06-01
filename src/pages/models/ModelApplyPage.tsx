import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModels } from '../../contexts/ModelContext';
import ModelApplyForm from '../../components/models/ModelApplyForm';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ModelApplyPage: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { templates } = useModels();
  const navigate = useNavigate();
  
  // Find the template
  const template = templates.find(t => t.id === modelId);
  
  // If template not found, redirect to model list
  if (!template) {
    navigate('/models');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">{template.name}</h1>
            <p className="mt-1 text-gray-600">
              Apply this model to your situation
            </p>
          </div>
          
          <ModelApplyForm template={template} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelApplyPage;