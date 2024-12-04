
// import React, { useState } from 'react';
// import AuthLayout from '../components/Auth/OAuthLayout';
// import LoginForm from '../components/Auth/LoginForm';
// import SignupForm from '../components/Auth/SignUpForm';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-md">
//         <AuthLayout>
//           {isLogin ? (
//             <LoginForm switchToSignup={() => setIsLogin(false)} />
//           ) : (
//             <SignupForm switchToLogin={() => setIsLogin(true)} />
//           )}
//         </AuthLayout>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;