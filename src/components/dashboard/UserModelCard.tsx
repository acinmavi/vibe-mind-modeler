import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { UserModel, ModelTemplate } from '../../types';

interface UserModelCardProps {
  userModel: UserModel;
  template: ModelTemplate;
  onDelete: (id: string) => void;
}

const UserModelCard: React.FC<UserModelCardProps> = ({ userModel, template, onDelete }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, React.FC<{ className?: string }>>)[
    template.icon.charAt(0).toUpperCase() + template.icon.slice(1)
  ] || LucideIcons.HelpCircle;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <IconComponent className="h-4 w-4 text-indigo-600" />
            </div>
            <span className="ml-2 text-xs text-indigo-600">{template.name}</span>
          </div>
          <span className="text-xs text-gray-500">{formatDate(userModel.createdAt)}</span>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">{userModel.title}</h3>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 line-clamp-2">
            {userModel.responses[0]?.response || 'No description available'}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/models/${template.id}/view/${userModel.id}`}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View Details
          </Link>
          
          <button 
            onClick={() => onDelete(userModel.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModelCard;