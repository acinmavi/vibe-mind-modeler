import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useModels } from '../../contexts/ModelContext';
import UserModelCard from '../../components/dashboard/UserModelCard';
import ModelStats from '../../components/dashboard/ModelStats';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const DashboardPage: React.FC = () => {
  const { userModels, templates, deleteUserModel } = useModels();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Filter user models based on search
  const filteredModels = userModels.filter(model =>
    model.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort by most recent first
  const sortedModels = [...filteredModels].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };
  
  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteUserModel(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };
  
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="mt-1 text-gray-600">
              Track your mental models and insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Your Models</h2>
                  
                  <div className="mt-4 sm:mt-0 flex space-x-4">
                    <input
                      type="text"
                      placeholder="Search models..."
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <Link 
                      to="/models"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New Model
                    </Link>
                  </div>
                </div>
                
                {sortedModels.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-4">You haven't created any models yet.</p>
                    <Link 
                      to="/models"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Create Your First Model
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedModels.map(model => {
                      const template = templates.find(t => t.id === model.templateId);
                      return template ? (
                        <UserModelCard
                          key={model.id}
                          userModel={model}
                          template={template}
                          onDelete={handleDeleteClick}
                        />
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-8">
              <ModelStats 
                userModels={userModels} 
                templates={templates}
              />
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Tips</h2>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="text-indigo-600 font-medium mr-2">•</span>
                    <span className="text-gray-600">Use the 5 Whys model to find root causes of problems</span>
                  </li>
                  <li className="flex">
                    <span className="text-indigo-600 font-medium mr-2">•</span>
                    <span className="text-gray-600">Decision Matrices help when comparing multiple options</span>
                  </li>
                  <li className="flex">
                    <span className="text-indigo-600 font-medium mr-2">•</span>
                    <span className="text-gray-600">SWOT Analysis works well for strategic planning</span>
                  </li>
                  <li className="flex">
                    <span className="text-indigo-600 font-medium mr-2">•</span>
                    <span className="text-gray-600">Second-Order Thinking helps avoid unintended consequences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this model? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;