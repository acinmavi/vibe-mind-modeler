import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import { useModels } from '../../contexts/ModelContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ModelViewPage: React.FC = () => {
  const { modelId, userModelId } = useParams<{ modelId: string; userModelId: string }>();
  const { templates, userModels, deleteUserModel } = useModels();
  const navigate = useNavigate();
  
  // Find the template and user model
  const template = templates.find(t => t.id === modelId);
  const userModel = userModels.find(m => m.id === userModelId);
  
  // If template or user model not found, redirect to dashboard
  if (!template || !userModel) {
    navigate('/dashboard');
    return null;
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this model? This action cannot be undone.')) {
      deleteUserModel(userModel.id);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              to="/dashboard" 
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-600 py-6 px-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">{userModel.title}</h1>
                  <p className="text-indigo-200">
                    {template.name} • Created on {formatDate(userModel.createdAt)}
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={handleDelete}
                    className="flex items-center px-3 py-2 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition-colors duration-150"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                  
                  <Link
                    to={`/models/${template.id}/apply`}
                    className="flex items-center px-3 py-2 bg-white rounded-md text-indigo-600 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Create New
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {template.steps.map((step, index) => {
                const response = userModel.responses.find(r => r.stepId === step.id);
                
                return (
                  <div key={step.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{step.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          {response?.response ? (
                            <p className="text-gray-800 whitespace-pre-line">{response.response}</p>
                          ) : (
                            <p className="text-gray-400 italic">No response provided</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelViewPage;