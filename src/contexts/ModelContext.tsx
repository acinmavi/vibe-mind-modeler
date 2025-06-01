import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ModelTemplate, UserModel, ModelContextType } from '../types';
import { modelTemplates } from '../data/templates';

// Create context
const ModelContext = createContext<ModelContextType | undefined>(undefined);

// Custom hook for using model context
export const useModels = () => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModels must be used within a ModelProvider');
  }
  return context;
};

// Local storage helpers
const getStoredUserModels = (): UserModel[] => {
  const storedModels = localStorage.getItem('mindModelerUserModels');
  return storedModels ? JSON.parse(storedModels) : [];
};

const storeUserModels = (models: UserModel[]) => {
  localStorage.setItem('mindModelerUserModels', JSON.stringify(models));
};

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // We're using the templates directly from the imported data
  const [templates] = useState<ModelTemplate[]>(modelTemplates);
  
  // User models are stored/retrieved from localStorage
  const [userModels, setUserModels] = useState<UserModel[]>(() => getStoredUserModels());

  // Update storage when user models change
  useEffect(() => {
    storeUserModels(userModels);
  }, [userModels]);

  const addUserModel = (model: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date().toISOString();
    const newModel: UserModel = {
      ...model,
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    setUserModels(prev => [...prev, newModel]);
  };

  const updateUserModel = (updatedModel: UserModel) => {
    const timestamp = new Date().toISOString();
    setUserModels(prev => 
      prev.map(model => 
        model.id === updatedModel.id 
          ? { ...updatedModel, updatedAt: timestamp }
          : model
      )
    );
  };

  const deleteUserModel = (id: string) => {
    setUserModels(prev => prev.filter(model => model.id !== id));
  };

  const getUserModelsByTemplateId = (templateId: string) => {
    return userModels.filter(model => model.templateId === templateId);
  };

  const getTemplateById = (id: string) => {
    return templates.find(template => template.id === id);
  };

  return (
    <ModelContext.Provider 
      value={{ 
        templates, 
        userModels, 
        addUserModel, 
        updateUserModel, 
        deleteUserModel,
        getUserModelsByTemplateId,
        getTemplateById
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContext;