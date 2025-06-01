import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ModelProvider } from './contexts/ModelContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ModelListPage from './pages/models/ModelListPage';
import ModelDetailPage from './pages/models/ModelDetailPage';
import ModelApplyPage from './pages/models/ModelApplyPage';
import ModelViewPage from './pages/models/ModelViewPage';

// Components
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ModelProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/models" element={<ModelListPage />} />
              <Route path="/models/:modelId/details" element={<ModelDetailPage />} />
              <Route path="/models/:modelId/apply" element={<ModelApplyPage />} />
              <Route path="/models/:modelId/view/:userModelId" element={<ModelViewPage />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </Router>
      </ModelProvider>
    </AuthProvider>
  );
}

export default App;