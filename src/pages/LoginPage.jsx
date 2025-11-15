// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportButton from '../components/ReportButton';
import { authService } from '../services/authService';

const LoginPage = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    const result = await authService.signInWithGoogle();
    
    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Header subtitle="Jaypee Institute of Information Technology" />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <Zap className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-8">Sign in to find your perfect elective exchange</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>New users:</strong> Create your profile after signing in<br />
              <strong>Existing users:</strong> Go directly to browse matches
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
      <ReportButton />
    </div>
  );
};

export default LoginPage;