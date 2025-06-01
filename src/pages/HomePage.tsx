import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCog, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-indigo-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-10 lg:mb-0">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                  Make Better Decisions with Mental Models
                </h1>
                <p className="mt-4 text-xl text-indigo-100">
                  MindModeler helps you apply powerful thinking frameworks to your real-life situations.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row">
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-150"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-150"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                      <Link
                        to="/login"
                        className="mt-3 sm:mt-0 sm:ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 transition-colors duration-150"
                      >
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-600 opacity-20 rounded-lg"></div>
                  <img
                    className="relative rounded-lg shadow-xl"
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Person thinking with a lightbulb moment"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                How MindModeler Works
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Apply powerful thinking frameworks to make better decisions and solve complex problems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Choose a Model</h3>
                <p className="text-gray-600">
                  Select from our library of 10 powerful mental models for different situations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Apply to Your Situation</h3>
                <p className="text-gray-600">
                  Follow the guided process to apply the model to your specific problem or decision.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gain Insights</h3>
                <p className="text-gray-600">
                  Save your results and review your thinking process to gain new perspectives.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Models section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Featured Mental Models
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform includes these powerful thinking frameworks and more.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">5 Whys Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Identify the root cause of a problem by asking "why" five times.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Perfect for troubleshooting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Prevents addressing symptoms</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Decision Matrix</h3>
                <p className="text-gray-600 mb-4">
                  Evaluate options based on weighted criteria to make better decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Compare multiple options objectively</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Reduces decision bias</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Second-Order Thinking</h3>
                <p className="text-gray-600 mb-4">
                  Consider the consequences of the consequences to avoid unintended outcomes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Think beyond immediate impacts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Reveals hidden opportunities & risks</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link
                to={user ? "/models" : "/signup"}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-150"
              >
                Explore All Models
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonial section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Better Thinking, Better Results
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  MindModeler helps you approach problems and decisions with greater clarity and structure.
                </p>
                
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <p className="text-gray-700 italic">
                    "Using the mental models in this app has completely changed how I approach complex decisions. I'm more confident in my choices and can clearly explain my reasoning."
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="inline-block h-10 w-10 rounded-full bg-indigo-100 overflow-hidden">
                        <BrainCog className="h-10 w-10 text-indigo-400" />
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Sarah K.</p>
                      <p className="text-sm text-gray-500">Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 lg:mt-0 grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Structured Thinking</h3>
                  <p className="text-gray-600">
                    Replace gut reactions with proven frameworks that help you analyze situations more thoroughly.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Toolkit</h3>
                  <p className="text-gray-600">
                    Develop your personal collection of applied models that you can refer back to and learn from.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Continuous Improvement</h3>
                  <p className="text-gray-600">
                    Review your past thinking processes to refine your approach and develop better mental habits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-indigo-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Start Modeling Your Thinking Today
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Join thousands of users who have transformed how they approach problems and decisions.
            </p>
            <div className="mt-8">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-150"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-150"
                >
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;