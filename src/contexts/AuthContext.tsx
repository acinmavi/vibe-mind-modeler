import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, AuthContextType } from '../types';

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock storage implementation (replace with actual backend in production)
const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('mindModelerUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

const storeUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('mindModelerUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('mindModelerUser');
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update storage when user changes
  useEffect(() => {
    storeUser(user);
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Supabase sign in
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        throw new Error(error?.message || 'Login failed');
      }
      setUser({ id: data.user.id, email: data.user.email! });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setLoading(true);
    setError(null);
    try {
      // Supabase sign up
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error || !data.user) {
        throw new Error(error?.message || 'Signup failed');
      }
      setUser({ id: data.user.id, email: data.user.email!, name });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;