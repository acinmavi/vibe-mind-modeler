import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useModels } from '../../contexts/ModelContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ModelDetailPage: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { templates, getUserModelsByTemplateId } = useModels();
  const navigate = useNavigate();
  
  // Find the template
  const template = templates.find(t => t.id === modelId);
  
  // Get user models for this template
  const userModels = getUserModelsByTemplateId(modelId || '');
  
  // If template not found, redirect to model list
  if (!template) {
    navigate('/models');
    return null;
  }
  
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, React.FC<{ className?: string }>>)[
    template.icon.charAt(0).toUpperCase() + template.icon.slice(1)
  ] || LucideIcons.HelpCircle;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-600 py-6 px-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">{template.name}</h1>
                  <p className="text-indigo-200">{template.category}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">About this Model</h2>
                <p className="text-gray-600">{template.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">How it Works</h2>
                <div className="border-l-2 border-indigo-200 pl-4 space-y-6">
                  {template.steps.map((step, index) => (
                    <div key={step.id}>
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold mr-2">
                          {index + 1}
                        </span>
                        {step.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use</h2>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {template.name === "5 Whys Analysis" && (
                      <>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When troubleshooting technical problems</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>For understanding the root cause of business issues</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When addressing recurring personal challenges</span>
                        </li>
                      </>
                    )}
                    {template.name === "Decision Matrix" && (
                      <>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When comparing multiple options with different criteria</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>For major purchase decisions</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When making career or life choices</span>
                        </li>
                      </>
                    )}
                    {template.name === "SWOT Analysis" && (
                      <>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>For strategic planning in business</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When evaluating new projects or ventures</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>For personal development planning</span>
                        </li>
                      </>
                    )}
                    {template.name === "Eisenhower Matrix" && (
                      <>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When managing a busy schedule with many tasks</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>For improving productivity and time management</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When feeling overwhelmed by responsibilities</span>
                        </li>
                      </>
                    )}
                    {/* Default examples for other templates */}
                    {!["5 Whys Analysis", "Decision Matrix", "SWOT Analysis", "Eisenhower Matrix"].includes(template.name) && (
                      <>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When facing complex decisions</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>For improving your thinking process</span>
                        </li>
                        <li className="flex items-start">
                          <LucideIcons.CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <span>When you want a structured approach to problem-solving</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link
                  to={`/models/${template.id}/apply`}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-150 inline-flex items-center"
                >
                  <LucideIcons.Play className="h-5 w-5 mr-2" />
                  Start Using This Model
                </Link>
              </div>
              
              {userModels.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Your Previous Uses ({userModels.length})
                  </h2>
                  <ul className="space-y-3">
                    {userModels.map(model => (
                      <li key={model.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-medium text-gray-800">{model.title}</span>
                        <Link
                          to={`/models/${template.id}/view/${model.id}`}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          View
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelDetailPage;