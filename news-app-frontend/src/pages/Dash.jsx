import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase'; // Firebase auth import
import { signOut } from 'firebase/auth'; // Firebase signOut import

const Dash = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Sign out using Firebase's signOut method
      await signOut(auth);
      navigate('/auth'); // Redirect to login page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
        <p className="mb-6">You are now authenticated!</p>
        <button 
          className="w-full bg-red-500 text-white p-2 rounded-lg"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dash;
