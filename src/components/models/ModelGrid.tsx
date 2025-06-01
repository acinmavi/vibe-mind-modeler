import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ModelTemplate } from '../../types';
import ModelCard from './ModelCard';

interface ModelGridProps {
  templates: ModelTemplate[];
}

const ModelGrid: React.FC<ModelGridProps> = ({ templates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Get unique categories
  const categories = ['All', ...new Set(templates.map(template => template.category))];
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
                            template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search models..."
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-48">
          <select
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.filter(cat => cat !== 'All').map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No models found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <ModelCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelGrid;