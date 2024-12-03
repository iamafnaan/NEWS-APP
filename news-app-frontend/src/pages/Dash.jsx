
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to NewsApp Dashboard</h1>
        <p className="mb-6">You are now authenticated!</p>
        <button 
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dash;