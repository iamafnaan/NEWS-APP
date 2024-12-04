
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../utils/supaBaseClient';

// const OAuthCallback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleOAuthCallback = async () => {
//       try {
//         // Handle the OAuth callback from Supabase
//         const { error } = await supabase.auth.getSessionFromUrl();
        
//         if (error) {
//           console.error('Error handling OAuth callback:', error);
//           navigate('/auth');
//           return;
//         }

//         // Successful authentication, redirect to dashboard
//         navigate('/dashboard');
//       } catch (err) {
//         console.error('Unexpected error during OAuth callback:', err);
//         navigate('/auth');
//       }
//     };

//     handleOAuthCallback();
//   }, [navigate]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <div className="spinner-border" role="status">
//           <span className="sr-only">Processing login...</span>
//         </div>
//         <p className="mt-3 text-gray-600">Authenticating, please wait...</p>
//       </div>
//     </div>
//   );
// };

// export default OAuthCallback;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supaBaseClient';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSessionFromUrl();
        
        if (error) {
          console.error('Error handling OAuth callback:', error);
          navigate('/auth');
          return;
        }

        // Successful authentication, redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('Unexpected error during OAuth callback:', err);
        navigate('/auth');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Processing login...</span>
        </div>
        <p className="mt-3 text-gray-600">Authenticating, please wait...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;