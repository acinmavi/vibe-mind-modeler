import React, { useMemo } from 'react';
import { PieChart, BarChart2, BrainCircuit } from 'lucide-react';
import { UserModel, ModelTemplate } from '../../types';

interface ModelStatsProps {
  userModels: UserModel[];
  templates: ModelTemplate[];
}

const ModelStats: React.FC<ModelStatsProps> = ({ userModels, templates }) => {
  // Calculate statistics
  const stats = useMemo(() => {
    // Total models created
    const totalModels = userModels.length;
    
    // Models created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentModels = userModels.filter(
      model => new Date(model.createdAt) >= thirtyDaysAgo
    ).length;
    
    // Models by template type
    const modelsByTemplate: Record<string, number> = {};
    userModels.forEach(model => {
      const templateId = model.templateId;
      if (modelsByTemplate[templateId]) {
        modelsByTemplate[templateId]++;
      } else {
        modelsByTemplate[templateId] = 1;
      }
    });
    
    // Models by category
    const modelsByCategory: Record<string, number> = {};
    userModels.forEach(model => {
      const template = templates.find(t => t.id === model.templateId);
      if (template) {
        const category = template.category;
        if (modelsByCategory[category]) {
          modelsByCategory[category]++;
        } else {
          modelsByCategory[category] = 1;
        }
      }
    });
    
    // Most used template
    let mostUsedTemplateId = '';
    let mostUsedCount = 0;
    Object.entries(modelsByTemplate).forEach(([id, count]) => {
      if (count > mostUsedCount) {
        mostUsedTemplateId = id;
        mostUsedCount = count;
      }
    });
    
    const mostUsedTemplate = templates.find(t => t.id === mostUsedTemplateId);
    
    return {
      totalModels,
      recentModels,
      modelsByTemplate,
      modelsByCategory,
      mostUsedTemplate: mostUsedTemplate?.name || 'None'
    };
  }, [userModels, templates]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Mind Modeling Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <BrainCircuit className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-indigo-900 text-sm font-medium">Total Models</p>
            <p className="text-2xl font-bold text-indigo-700">{stats.totalModels}</p>
          </div>
        </div>
        
        <div className="bg-cyan-50 p-4 rounded-lg flex items-center">
          <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
            <BarChart2 className="h-6 w-6 text-cyan-600" />
          </div>
          <div>
            <p className="text-cyan-900 text-sm font-medium">Recent (30 days)</p>
            <p className="text-2xl font-bold text-cyan-700">{stats.recentModels}</p>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg flex items-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
            <PieChart className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-amber-900 text-sm font-medium">Most Used Model</p>
            <p className="text-lg font-bold text-amber-700 truncate">{stats.mostUsedTemplate}</p>
          </div>
        </div>
      </div>
      
      {stats.totalModels > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Models by Category</h3>
          
          <div className="space-y-3">
            {Object.entries(stats.modelsByCategory).map(([category, count]) => (
              <div key={category} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {count} ({Math.round((count / stats.totalModels) * 100)}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${(count / stats.totalModels) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelStats;