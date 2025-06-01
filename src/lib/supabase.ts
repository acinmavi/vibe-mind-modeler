import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type Tables = {
  mental_models: {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    created_at: string;
  };
  model_steps: {
    id: string;
    model_id: string;
    title: string;
    description: string;
    input_type: 'text' | 'textarea' | 'multiple-choice' | 'scale';
    placeholder?: string;
    order: number;
    created_at: string;
  };
  user_models: {
    id: string;
    user_id: string;
    model_id: string;
    title: string;
    created_at: string;
    updated_at: string;
  };
  user_responses: {
    id: string;
    user_model_id: string;
    step_id: string;
    response: string;
    created_at: string;
    updated_at: string;
  };
};