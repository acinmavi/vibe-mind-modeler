import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ModelTemplate } from '../../types';

interface ModelCardProps {
  template: ModelTemplate;
}

const ModelCard: React.FC<ModelCardProps> = ({ template }) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, React.FC<{ className?: string }>>)[
    template.icon.charAt(0).toUpperCase() + template.icon.slice(1)
  ] || LucideIcons.HelpCircle;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <IconComponent className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
            <p className="text-sm text-indigo-600">{template.category}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {template.description}
        </p>
        
        <div className="text-xs text-gray-500 mb-4">
          {template.steps.length} steps
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/models/${template.id}/details`}
            className="text-sm text-gray-700 hover:text-indigo-600 flex items-center"
          >
            View Details
            <LucideIcons.ChevronRight className="h-4 w-4 ml-1" />
          </Link>
          
          <Link 
            to={`/models/${template.id}/apply`}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-150"
          >
            Use This Model
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;