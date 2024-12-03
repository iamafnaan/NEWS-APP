
import React from 'react';
import { authService } from '../../services/authService';

const OAuthButtons = () => {
  const handleGoogleSignIn = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <img 
          src="/google-icon.svg" 
          alt="Google logo" 
          className="w-5 h-5 mr-2" 
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default OAuthButtons;