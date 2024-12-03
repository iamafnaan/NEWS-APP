
import React from 'react';
import Logo from '../Logo/Logo';
import OAuthButtons from './OauthButton';

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">NewsApp</h1>
          <p className="text-gray-600 mt-2">Stay Informed, Stay Ahead</p>
        </div>
        
        <OAuthButtons />
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;