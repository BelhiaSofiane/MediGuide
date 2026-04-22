import React, { useState } from 'react';

export default function LoginPage({ onSignIn, onSignUp, authError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);
    try {
      if (isSignUpMode) {
        await onSignUp({ email, password });
      } else {
        await onSignIn({ email, password });
      }
    } catch (error) {
      setLocalError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md slide-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-stethoscope text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">MediGuide</h1>
          <p className="text-gray-600 mt-2">Sign in to access your secure health history</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            {isSubmitting ? 'Please wait...' : isSignUpMode ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {(localError || authError) && (
          <p className="text-red-600 text-sm mt-4 text-center">{localError || authError}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              className="text-primary font-medium cursor-pointer"
              onClick={() => setIsSignUpMode((prev) => !prev)}
            >
              {isSignUpMode ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
