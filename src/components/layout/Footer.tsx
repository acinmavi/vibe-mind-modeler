import React from 'react';
import { BrainCog } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <BrainCog className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">MindModeler</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Helping you make better decisions through structured thinking models.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Blog</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Community</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} MindModeler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;