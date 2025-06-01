export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface ModelTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: ModelStep[];
  category: string;
}

export interface ModelStep {
  id: string;
  title: string;
  description: string;
  inputType: 'text' | 'textarea' | 'multiple-choice' | 'scale';
  inputOptions?: string[];
  placeholder?: string;
}

export interface UserModel {
  id: string;
  templateId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  responses: {
    stepId: string;
    response: string;
  }[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export interface ModelContextType {
  templates: ModelTemplate[];
  userModels: UserModel[];
  addUserModel: (model: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUserModel: (model: UserModel) => void;
  deleteUserModel: (id: string) => void;
  getUserModelsByTemplateId: (templateId: string) => UserModel[];
  getTemplateById: (id: string) => ModelTemplate | undefined;
}