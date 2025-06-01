import React from 'react';
import { BrainCog } from 'lucide-react';
import SignupForm from '../../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BrainCog className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          MindModeler
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start your journey to better thinking
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;