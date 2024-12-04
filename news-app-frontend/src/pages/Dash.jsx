import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supaBaseClient';


const Dash = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
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
          variant="destructive" 
          className="w-full"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dash;