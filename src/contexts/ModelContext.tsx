import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ModelTemplate, UserModel, ModelContextType } from '../types';
import { modelTemplates } from '../data/templates';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();

  // Update storage when user models change
  useEffect(() => {
    storeUserModels(userModels);
  }, [userModels]);

  const addUserModel = async (model: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date().toISOString();
    const newModel: UserModel = {
      ...model,
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp
    };
    setUserModels(prev => [...prev, newModel]);

    // Save to Supabase if user is logged in
    if (user) {
      // Insert into user_models
      const { data: userModelData, error: userModelError } = await supabase
        .from('user_models')
        .insert([
          {
            user_id: user.id,
            model_id: model.templateId,
            title: model.title,
            // Remove created_at and updated_at, let DB default handle
          }
        ])
        .select();
      if (userModelError) {
        console.error('Supabase user_models error:', userModelError);
        throw new Error(userModelError.message || 'Failed to save model to Supabase');
      }
      const userModelId = userModelData?.[0]?.id;
      if (userModelId) {
        // Insert responses
        const responsesToInsert = model.responses.map(r => ({
          user_model_id: userModelId,
          step_id: r.stepId,
          response: r.response
          // Remove created_at and updated_at, let DB default handle
        }));
        const { error: responsesError } = await supabase
          .from('user_responses')
          .insert(responsesToInsert);
        if (responsesError) {
          console.error('Supabase user_responses error:', responsesError);
          throw new Error(responsesError.message || 'Failed to save responses to Supabase');
        }
      }
    }
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