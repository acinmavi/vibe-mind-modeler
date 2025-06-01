import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save, Check } from 'lucide-react';
import { ModelTemplate, UserModel } from '../../types';
import { useModels } from '../../contexts/ModelContext';

interface ModelApplyFormProps {
  template: ModelTemplate;
}

const ModelApplyForm: React.FC<ModelApplyFormProps> = ({ template }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [responses, setResponses] = useState<{ stepId: string; response: string }[]>(
    template.steps.map(step => ({ stepId: step.id, response: '' }))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const { addUserModel } = useModels();
  const navigate = useNavigate();

  const handleNext = () => {
    // Validate current step
    if (currentStep === 0 && !title.trim()) {
      setError('Please enter a title for your model');
      return;
    }
    
    if (currentStep > 0) {
      const currentResponse = responses[currentStep - 1];
      if (!currentResponse.response.trim()) {
        setError('Please complete this step before continuing');
        return;
      }
    }
    
    setError('');
    
    if (currentStep < template.steps.length + 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleResponseChange = (value: string) => {
    setError('');
    if (currentStep === 0) {
      setTitle(value);
    } else {
      const newResponses = [...responses];
      newResponses[currentStep - 1] = {
        ...newResponses[currentStep - 1],
        response: value
      };
      setResponses(newResponses);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');

    try {
      // Create a new user model
      const userModel: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'> = {
        templateId: template.id,
        title,
        responses
      };
      await addUserModel(userModel);
      // Navigate to the user models page
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Title input is shown at step 0, then template steps
  let displayStep = null;
  if (currentStep === 0) {
    displayStep = null;
  } else if (currentStep > 0 && currentStep <= template.steps.length) {
    displayStep = template.steps[currentStep - 1];
  }
  const isLastInputStep = currentStep === template.steps.length;
  const isReviewStep = currentStep === template.steps.length + 1;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(currentStep / (template.steps.length + 1)) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Step {Math.min(currentStep + 1, template.steps.length + 1)} of {template.steps.length + 1}
        </div>
      </div>

      {/* Step content */}
      <div className="mb-8">
        {currentStep === 0 ? (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Name Your Model</h2>
            <p className="text-gray-600 mb-4">
              Give your {template.name} a descriptive title that helps you identify it later.
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder="e.g., Career Decision Analysis"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ) : isReviewStep ? (
          <div>
            <div className="flex items-center mb-4">
              <Check className="h-8 w-8 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900 ml-2">Review & Save</h2>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-lg mb-2">{title}</h3>
              
              {template.steps.map((step, index) => {
                const response = responses[index];
                return (
                  <div key={step.id} className="mb-4">
                    <p className="font-medium text-gray-900">{step.title}:</p>
                    <p className="text-gray-700 border-l-2 border-indigo-200 pl-3 mt-1">
                      {response?.response || 'No response'}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <p className="text-gray-600 mb-4">
              Review your responses above. When you're ready, click "Save Model" to save this to your dashboard.
            </p>
          </div>
        ) : displayStep && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{displayStep.title}</h2>
            <p className="text-gray-600 mb-4">{displayStep.description}</p>
            
            {displayStep.inputType === 'textarea' && (
              <textarea
                value={responses[currentStep - 1].response}
                onChange={(e) => handleResponseChange(e.target.value)}
                placeholder={displayStep.placeholder}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
            
            {displayStep.inputType === 'text' && (
              <input
                type="text"
                value={responses[currentStep - 1].response}
                onChange={(e) => handleResponseChange(e.target.value)}
                placeholder={displayStep.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        
        {isReviewStep ? (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? 'Saving...' : 'Save Model'}
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ModelApplyForm;