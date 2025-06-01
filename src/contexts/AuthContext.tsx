import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

// Mock user database (replace with actual backend in production)
const MOCK_USERS: Record<string, { id: string; email: string; password: string; name?: string }> = {};

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userRecord = Object.values(MOCK_USERS).find(u => u.email === email);
      
      if (!userRecord) {
        throw new Error('User not found');
      }
      
      if (userRecord.password !== password) {
        throw new Error('Invalid password');
      }
      
      const { password: _, ...userWithoutPassword } = userRecord;
      setUser(userWithoutPassword);
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (Object.values(MOCK_USERS).some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      const id = uuidv4();
      const newUser = { id, email, password, name };
      MOCK_USERS[id] = newUser;
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;