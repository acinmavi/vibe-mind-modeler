import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCog, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BrainCog className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MindModeler</span>
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard\" className="text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <Link to="/models" className="text-gray-700 hover:text-indigo-600">
                  Models
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-indigo-600">
                    <User className="h-5 w-5" />
                    <span className="ml-1">{user.name || user.email.split('@')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-gray-700 hover:text-indigo-600"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;