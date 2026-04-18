// // src/Components/Login.jsx
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [resetSuccess, setResetSuccess] = useState(false);
//   const [resetError, setResetError] = useState('');
//   const [isResetting, setIsResetting] = useState(false);
  
//   const navigate = useNavigate();
  
//   // Detailed user data inspection function
//   const inspectUserData = () => {
//     try {
//       // Get stored users from localStorage
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
//       console.log('=== DETAILED USER INSPECTION ===');
//       console.log('Total users found:', storedUsers.length);
      
//       // Show complete user data except actual passwords
//       storedUsers.forEach((user, index) => {
//         const sanitizedUser = {
//           ...user,
//           username: user.username,
//           email: user.email,
//           password: user.password ? '[PRESENT]' : '[MISSING]',
//           passwordLength: user.password ? user.password.length : 0
//         };
        
//         console.log(`User ${index + 1} details:`, sanitizedUser);
//       });
      
//       // Provide a cleaner version for alert
//       alert(`Found ${storedUsers.length} users in localStorage:\n\n${
//         storedUsers.map((user, i) => 
//           `${i+1}. Username: "${user.username}"\n   Email: "${user.email}"\n   Password length: ${user.password ? user.password.length : 0}`
//         ).join('\n\n')
//       }`);
      
//     } catch (error) {
//       console.error('Error inspecting user data:', error);
//       alert('Error reading user data: ' + error.message);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Form validation
//     if (!username.trim()) {
//       setError('Username or email is required');
//       return;
//     }
//     if (!password) {
//       setError('Password is required');
//       return;
//     }
    
//     setIsLoading(true);
//     setError('');
    
//     try {
//       // Get stored users directly from localStorage for the most up-to-date data
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
//       console.log('Attempting login with:', { username, password: password ? '****' : '' });
//       console.log('Available users:', storedUsers.length);
      
//       // Log every user's credentials for detailed debugging (only in development)
//       storedUsers.forEach((user, index) => {
//         console.log(`User ${index + 1} comparison:`, {
//           storedUsername: user.username,
//           enteredUsername: username,
//           usernameMatch: user.username.trim().toLowerCase() === username.trim().toLowerCase(),
//           storedEmail: user.email,
//           emailMatch: user.email.trim().toLowerCase() === username.trim().toLowerCase(),
//           // Don't log actual passwords, just if they match
//           passwordMatch: user.password === password,
//           passwordLengthMatch: user.password?.length === password.length
//         });
//       });
      
//       // More flexible matching - case insensitive username/email, but case sensitive password
//       const user = storedUsers.find(
//         u => (u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
//              u.email.trim().toLowerCase() === username.trim().toLowerCase()) && 
//              u.password === password
//       );
      
//       console.log('Found matching user:', user ? 'Yes' : 'No');
      
//       if (user) {
//         // Simulate API delay for a more realistic experience
//         await new Promise(resolve => setTimeout(resolve, 800));
        
//         // Handle successful login
//         onLogin({ username: user.username, email: user.email });
        
//         // Redirect to home page
//         navigate('/home');
//       } else {
//         // No user found, try direct debugging of the exact issue
//         const usernameOrEmailMatch = storedUsers.find(
//           u => u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
//                u.email.trim().toLowerCase() === username.trim().toLowerCase()
//         );
        
//         if (usernameOrEmailMatch) {
//           setError('Password is incorrect');
//           console.log('Username/email matched but password did not match');
//         } else {
//           setError('Username or email not found');
//           console.log('No matching username or email found');
//         }
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('An error occurred during login. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Function to clear all users (for testing purposes)
//   const clearAllUsers = () => {
//     if (window.confirm('⚠️ WARNING: This will delete ALL user accounts. Continue?')) {
//       localStorage.removeItem('users');
//       alert('All users have been removed from localStorage.');
//       console.log('All users cleared from localStorage');
//     }
//   };

//   // Function to handle forgot password request
//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
    
//     if (!resetEmail.trim()) {
//       setResetError('Please enter your email address');
//       return;
//     }
    
//     setIsResetting(true);
//     setResetError('');
    
//     try {
//       // Get stored users from localStorage
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
//       // Find user with matching email (case insensitive)
//       const user = storedUsers.find(
//         u => u.email.trim().toLowerCase() === resetEmail.trim().toLowerCase()
//       );
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (user) {
//         // In a real app, we would send an email with reset instructions
//         // For this demo, we'll generate a "temporary password" and update the user's record
//         const tempPassword = Math.random().toString(36).slice(2, 10);
        
//         // Update user's password in localStorage
//         const updatedUsers = storedUsers.map(u => {
//           if (u.email.trim().toLowerCase() === resetEmail.trim().toLowerCase()) {
//             return { ...u, password: tempPassword };
//           }
//           return u;
//         });
        
//         localStorage.setItem('users', JSON.stringify(updatedUsers));
        
//         console.log(`Password reset for ${user.email}. New temp password: ${tempPassword}`);
        
//         // Show success message with the temporary password
//         setResetSuccess(true);
        
//         // For demo purposes, show temp password in alert 
//         // (in a real app, this would be sent via email)
//         alert(`A temporary password has been generated: ${tempPassword}\n\nIn a real application, this would be sent securely to your email.`);
//       } else {
//         setResetError('No account found with that email address');
//       }
//     } catch (err) {
//       console.error('Password reset error:', err);
//       setResetError('An error occurred. Please try again.');
//     } finally {
//       setIsResetting(false);
//     }
//   };
  
//   // Toggle forgot password form
//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setResetEmail('');
//     setResetError('');
//     setResetSuccess(false);
//   };
  
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-100 to-blue-50 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         {!showForgotPassword ? (
//           // Login Form
//           <>
//             <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login to Your Account</h1>
            
//             {error && (
//               <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//                 <p>{error}</p>
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Username/Email field */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                   Username or Email
//                 </label>
//                 <div className="relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//                     placeholder="Enter your username or email"
//                   />
//                 </div>
//               </div>
              
//               {/* Password field */}
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <button 
//                     type="button"
//                     onClick={toggleForgotPassword}
//                     className="text-xs font-medium text-violet-600 hover:text-violet-500"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//                 <div className="relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//                     placeholder="Enter your password"
//                   />
//                   <div 
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                     onClick={() => setShowPassword(!showPassword)}
//                     title={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                         <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                       </svg>
//                     ) : (
//                       <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                         <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                       </svg>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Login button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>
            
//             {/* Signup link */}
//             <div className="mt-4 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <Link to="/signup" className="font-medium text-violet-600 hover:text-violet-500">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
            
//             {/* Debug tools */}
//             <div className="mt-4 flex justify-center space-x-4">
//               <button 
//                 onClick={inspectUserData}
//                 className="text-xs text-gray-500 hover:text-gray-700"
//               >
//                 Debug: Check localStorage
//               </button>
//               <button 
//                 onClick={clearAllUsers}
//                 className="text-xs text-red-500 hover:text-red-700"
//               >
//                 Debug: Reset All Users
//               </button>
//             </div>
//           </>
//         ) : (
//           // Forgot Password Form
//           <>
//             <div className="flex items-center mb-4">
//               <button 
//                 onClick={toggleForgotPassword} 
//                 className="text-gray-500 hover:text-gray-700 mr-2"
//               >
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//               </button>
//               <h1 className="text-2xl font-bold text-center text-gray-800">Reset Password</h1>
//             </div>
            
//             {resetSuccess ? (
//               <div className="text-center space-y-4">
//                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4 text-left" role="alert">
//                   <p>Password reset successful! Check your email for instructions.</p>
//                 </div>
//                 <button
//                   onClick={toggleForgotPassword}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
//                 >
//                   Return to Login
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Enter your email address and we'll send you instructions to reset your password.
//                 </p>
                
//                 {resetError && (
//                   <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//                     <p>{resetError}</p>
//                   </div>
//                 )}
                
//                 <form onSubmit={handleForgotPassword} className="space-y-4">
//                   <div>
//                     <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <div className="relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                           <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                           <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                         </svg>
//                       </div>
//                       <input
//                         id="resetEmail"
//                         name="resetEmail"
//                         type="email"
//                         value={resetEmail}
//                         onChange={(e) => setResetEmail(e.target.value)}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//                         placeholder="Enter your email"
//                       />
//                     </div>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     disabled={isResetting}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
//                   >
//                     {isResetting ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </>
//                     ) : (
//                       'Reset Password'
//                     )}
//                   </button>
                  
//                   <div className="mt-2 text-center">
//                     <button
//                       type="button"
//                       onClick={toggleForgotPassword}
//                       className="text-sm font-medium text-violet-600 hover:text-violet-500"
//                     >
//                       Back to Login
//                     </button>
//                   </div>
//                 </form>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
// update
// // src/Components/Login.jsx - Updated with Backend Integration
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { authService } from '../services/authService';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [resetSuccess, setResetSuccess] = useState(false);
//   const [resetError, setResetError] = useState('');
//   const [isResetting, setIsResetting] = useState(false);
//   const [useBackend, setUseBackend] = useState(true); // Toggle between backend and localStorage
  
//   const navigate = useNavigate();
  
//   // Detailed user data inspection function (for localStorage debugging)
//   const inspectUserData = () => {
//     try {
//       // Get stored users from localStorage
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
//       console.log('=== DETAILED USER INSPECTION ===');
//       console.log('Total users found:', storedUsers.length);
      
//       // Show complete user data except actual passwords
//       storedUsers.forEach((user, index) => {
//         const sanitizedUser = {
//           ...user,
//           username: user.username,
//           email: user.email,
//           password: user.password ? '[PRESENT]' : '[MISSING]',
//           passwordLength: user.password ? user.password.length : 0
//         };
        
//         console.log(`User ${index + 1} details:`, sanitizedUser);
//       });
      
//       // Provide a cleaner version for alert
//       alert(`Found ${storedUsers.length} users in localStorage:\n\n${
//         storedUsers.map((user, i) => 
//           `${i+1}. Username: "${user.username}"\n   Email: "${user.email}"\n   Password length: ${user.password ? user.password.length : 0}`
//         ).join('\n\n')
//       }`);
      
//     } catch (error) {
//       console.error('Error inspecting user data:', error);
//       alert('Error reading user data: ' + error.message);
//     }
//   };
  
//   // Backend login function
//   const handleBackendLogin = async () => {
//     try {
//       console.log('🚀 Attempting backend login...');
//       const result = await authService.login(username, password);
      
//       if (result.success) {
//         console.log('✅ Backend login successful:', result);
//         onLogin(result.user);
//         navigate('/home');
//         return true;
//       }
//     } catch (error) {
//       console.error('❌ Backend login failed:', error.message);
//       setError(error.message || 'Login failed. Please try again.');
//       return false;
//     }
//   };
  
//   // localStorage login function (fallback)
//   const handleLocalStorageLogin = async () => {
//     try {
//       console.log('🔄 Using localStorage fallback...');
//       // Get stored users directly from localStorage for the most up-to-date data
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
//       console.log('Attempting login with:', { username, password: password ? '****' : '' });
//       console.log('Available users:', storedUsers.length);
      
//       // Log every user's credentials for detailed debugging (only in development)
//       storedUsers.forEach((user, index) => {
//         console.log(`User ${index + 1} comparison:`, {
//           storedUsername: user.username,
//           enteredUsername: username,
//           usernameMatch: user.username.trim().toLowerCase() === username.trim().toLowerCase(),
//           storedEmail: user.email,
//           emailMatch: user.email.trim().toLowerCase() === username.trim().toLowerCase(),
//           // Don't log actual passwords, just if they match
//           passwordMatch: user.password === password,
//           passwordLengthMatch: user.password?.length === password.length
//         });
//       });
      
//       // More flexible matching - case insensitive username/email, but case sensitive password
//       const user = storedUsers.find(
//         u => (u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
//              u.email.trim().toLowerCase() === username.trim().toLowerCase()) && 
//              u.password === password
//       );
      
//       console.log('Found matching user:', user ? 'Yes' : 'No');
      
//       if (user) {
//         // Simulate API delay for a more realistic experience
//         await new Promise(resolve => setTimeout(resolve, 800));
        
//         // Handle successful login
//         onLogin({ username: user.username, email: user.email });
//         navigate('/home');
//         return true;
//       } else {
//         // No user found, try direct debugging of the exact issue
//         const usernameOrEmailMatch = storedUsers.find(
//           u => u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
//                u.email.trim().toLowerCase() === username.trim().toLowerCase()
//         );
        
//         if (usernameOrEmailMatch) {
//           setError('Password is incorrect');
//           console.log('Username/email matched but password did not match');
//         } else {
//           setError('Username or email not found');
//           console.log('No matching username or email found');
//         }
//         return false;
//       }
//     } catch (err) {
//       console.error('localStorage login error:', err);
//       setError('An error occurred during login. Please try again.');
//       return false;
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Form validation
//     if (!username.trim()) {
//       setError('Username or email is required');
//       return;
//     }
//     if (!password) {
//       setError('Password is required');
//       return;
//     }
    
//     setIsLoading(true);
//     setError('');
    
//     try {
//       let loginSuccess = false;
      
//       if (useBackend) {
//         // Try backend first
//         loginSuccess = await handleBackendLogin();
        
//         if (!loginSuccess) {
//           console.log('⚠️ Backend login failed, trying localStorage fallback...');
//           // If backend fails, try localStorage as fallback
//           loginSuccess = await handleLocalStorageLogin();
//         }
//       } else {
//         // Use localStorage directly
//         loginSuccess = await handleLocalStorageLogin();
//       }
      
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('An error occurred during login. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Function to clear all users (for testing purposes)
//   const clearAllUsers = () => {
//     if (window.confirm('⚠️ WARNING: This will delete ALL user accounts. Continue?')) {
//       localStorage.removeItem('users');
//       alert('All users have been removed from localStorage.');
//       console.log('All users cleared from localStorage');
//     }
//   };

//   // Function to handle forgot password request
//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
    
//     if (!resetEmail.trim()) {
//       setResetError('Please enter your email address');
//       return;
//     }
    
//     setIsResetting(true);
//     setResetError('');
    
//     try {
//       // Get stored users from localStorage
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
//       // Find user with matching email (case insensitive)
//       const user = storedUsers.find(
//         u => u.email.trim().toLowerCase() === resetEmail.trim().toLowerCase()
//       );
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (user) {
//         // In a real app, we would send an email with reset instructions
//         // For this demo, we'll generate a "temporary password" and update the user's record
//         const tempPassword = Math.random().toString(36).slice(2, 10);
        
//         // Update user's password in localStorage
//         const updatedUsers = storedUsers.map(u => {
//           if (u.email.trim().toLowerCase() === resetEmail.trim().toLowerCase()) {
//             return { ...u, password: tempPassword };
//           }
//           return u;
//         });
        
//         localStorage.setItem('users', JSON.stringify(updatedUsers));
        
//         console.log(`Password reset for ${user.email}. New temp password: ${tempPassword}`);
        
//         // Show success message with the temporary password
//         setResetSuccess(true);
        
//         // For demo purposes, show temp password in alert 
//         // (in a real app, this would be sent via email)
//         alert(`A temporary password has been generated: ${tempPassword}\n\nIn a real application, this would be sent securely to your email.`);
//       } else {
//         setResetError('No account found with that email address');
//       }
//     } catch (err) {
//       console.error('Password reset error:', err);
//       setResetError('An error occurred. Please try again.');
//     } finally {
//       setIsResetting(false);
//     }
//   };
  
//   // Toggle forgot password form
//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setResetEmail('');
//     setResetError('');
//     setResetSuccess(false);
//   };
  
//   // Test backend connection
//   const testBackendConnection = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/health');
//       const data = await response.json();
//       alert(`Backend Status: ${data.status}\nDatabase: ${data.database}\nTimestamp: ${data.timestamp}`);
//       console.log('Backend connection test:', data);
//     } catch (error) {
//       alert(`Backend connection failed: ${error.message}`);
//       console.error('Backend connection test failed:', error);
//     }
//   };
  
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-100 to-blue-50 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         {!showForgotPassword ? (
//           // Login Form
//           <>
//             <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login to Your Account</h1>
            
//             {/* Backend/localStorage Toggle */}
//             <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium text-blue-800">
//                   {useBackend ? '🔗 Backend Mode' : '💾 LocalStorage Mode'}
//                 </span>
//                 <button
//                   onClick={() => setUseBackend(!useBackend)}
//                   className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
//                 >
//                   Switch to {useBackend ? 'LocalStorage' : 'Backend'}
//                 </button>
//               </div>
//               <p className="text-xs text-blue-600 mt-1">
//                 {useBackend 
//                   ? 'Using backend API with localStorage fallback' 
//                   : 'Using localStorage only (offline mode)'
//                 }
//               </p>
//             </div>
            
//             {error && (
//               <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//                 <p>{error}</p>
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Username/Email field */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                   Username or Email
//                 </label>
//                 <div className="relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//                     placeholder="Enter your username or email"
//                   />
//                 </div>
//               </div>
              
//               {/* Password field */}
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <button 
//                     type="button"
//                     onClick={toggleForgotPassword}
//                     className="text-xs font-medium text-violet-600 hover:text-violet-500"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//                 <div className="relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//                     placeholder="Enter your password"
//                   />
//                   <div 
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                     onClick={() => setShowPassword(!showPassword)}
//                     title={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                         <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                       </svg>
//                     ) : (
//                       <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                         <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                       </svg>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Login button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>
            
//             {/* Signup link */}
//             <div className="mt-4 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <Link to="/signup" className="font-medium text-violet-600 hover:text-violet-500">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
            
//             {/* Debug tools */}
//             <div className="mt-4 space-y-2">
//               <div className="flex justify-center space-x-4">
//                 <button 
//                   onClick={inspectUserData}
//                   className="text-xs text-gray-500 hover:text-gray-700"
//                 >
//                   Debug: Check localStorage
//                 </button>
//                 <button 
//                   onClick={clearAllUsers}
//                   className="text-xs text-red-500 hover:text-red-700"
//                 >
//                   Debug: Reset All Users
//                 </button>
//               </div>
//               <div className="flex justify-center">
//                 <button 
//                   onClick={testBackendConnection}
//                   className="text-xs text-blue-500 hover:text-blue-700"
//                 >
//                   🔧 Test Backend Connection
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           // Forgot Password Form (unchanged)
//           <>
//             <div className="flex items-center mb-4">
//               <button 
//                 onClick={toggleForgotPassword} 
//                 className="text-gray-500 hover:text-gray-700 mr-2"
//               >
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//               </button>
//               <h1 className="text-2xl font-bold text-center text-gray-800">Reset Password</h1>
//             </div>
            
//             {resetSuccess ? (
//               <div className="text-center space-y-4">
//                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4 text-left" role="alert">
//                   <p>Password reset successful! Check your email for instructions.</p>
//                 </div>
//                 <button
//                   onClick={toggleForgotPassword}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
//                 >
//                   Return to Login
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Enter your email address and we'll send you instructions to reset your password.
//                 </p>
                
//                 {resetError && (
//                   <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//                     <p>{resetError}</p>
//                   </div>
//                 )}
                
//                 <form onSubmit={handleForgotPassword} className="space-y-4">
//                   <div>
//                     <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <div className="relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                           <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                           <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                         </svg>
//                       </div>
//                       <input
//                         id="resetEmail"
//                         name="resetEmail"
//                         type="email"
//                         value={resetEmail}
//                         onChange={(e) => setResetEmail(e.target.value)}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//                         placeholder="Enter your email"
//                       />
//                     </div>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     disabled={isResetting}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
//                   >
//                     {isResetting ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </>
//                     ) : (
//                       'Reset Password'
//                     )}
//                   </button>
                  
//                   <div className="mt-2 text-center">
//                     <button
//                       type="button"
//                       onClick={toggleForgotPassword}
//                       className="text-sm font-medium text-violet-600 hover:text-violet-500"
//                     >
//                       Back to Login
//                     </button>
//                   </div>
//                 </form>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/Components/Login.jsx - PROPERLY Updated with Your Backend Integration
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [useBackend, setUseBackend] = useState(true); // Toggle between backend and localStorage
  const [backendStatus, setBackendStatus] = useState(null);
  
  const navigate = useNavigate();
  
  // Test backend connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/health');
        const data = await response.json();
        setBackendStatus({
          success: true,
          status: data.status,
          database_status: data.database_status || data.database,
          centralized_database: data.centralized_database
        });
        console.log('✅ Backend connection successful:', data);
      } catch (error) {
        setBackendStatus({
          success: false,
          error: error.message
        });
        console.error('❌ Backend connection failed:', error);
      }
    };
    
    testConnection();
  }, []);
  
  // Detailed user data inspection function (for localStorage debugging)
  const inspectUserData = () => {
    try {
      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      console.log('=== DETAILED USER INSPECTION ===');
      console.log('Total users found:', storedUsers.length);
      
      // Show complete user data except actual passwords
      storedUsers.forEach((user, index) => {
        const sanitizedUser = {
          ...user,
          username: user.username,
          email: user.email,
          password: user.password ? '[PRESENT]' : '[MISSING]',
          passwordLength: user.password ? user.password.length : 0
        };
        
        console.log(`User ${index + 1} details:`, sanitizedUser);
      });
      
      // Provide a cleaner version for alert
      alert(`Found ${storedUsers.length} users in localStorage:\n\n${
        storedUsers.map((user, i) => 
          `${i+1}. Username: "${user.username}"\n   Email: "${user.email}"\n   Password length: ${user.password ? user.password.length : 0}`
        ).join('\n\n')
      }`);
      
    } catch (error) {
      console.error('Error inspecting user data:', error);
      alert('Error reading user data: ' + error.message);
    }
  };
  
  // Backend login function - UPDATED for your backend
  const handleBackendLogin = async () => {
    try {
      console.log('🚀 Attempting backend login...');
      
      // Call your backend /api/auth/login endpoint
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password
        })
      });
      
      const result = await response.json();
      console.log('✅ Backend login response:', result);
      
      if (result.success && result.access_token) {
        // Store token and user data as your backend expects
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        console.log('✅ Token stored:', result.access_token);
        console.log('✅ User stored:', result.user);
        
        // Call onLogin with user data
        onLogin(result.user);
        navigate('/home');
        return true;
      } else {
        console.log('⚠️ Backend login failed:', result.error || 'Invalid credentials');
        
        // If user doesn't exist in backend but might exist in localStorage, 
        // try to auto-register them from localStorage data
        if (result.error === 'Invalid credentials' || result.error === 'User not found') {
          const autoRegisterResult = await tryAutoRegisterFromLocalStorage();
          if (autoRegisterResult) {
            // Retry login after auto-registration
            return await handleBackendLogin();
          }
        }
        
        setError(result.error || 'Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('❌ Backend login failed:', error.message);
      setError('Backend connection failed. Using offline mode.');
      return false;
    }
  };
  
  // Auto-register user from localStorage if they exist there
  const tryAutoRegisterFromLocalStorage = async () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const localUser = storedUsers.find(
        u => (u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
             (u.email && u.email.trim().toLowerCase() === username.trim().toLowerCase())) && 
             u.password === password
      );
      
      if (localUser) {
        console.log('🔄 Auto-registering user from localStorage...');
        
        const signupResponse = await fetch('http://127.0.0.1:8000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: localUser.username,
            email: localUser.email,
            password: localUser.password
          })
        });
        
        const signupResult = await signupResponse.json();
        
        if (signupResult.success) {
          console.log('✅ Auto-registration successful');
          return true;
        } else {
          console.log('⚠️ Auto-registration failed:', signupResult.error);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Auto-registration error:', error);
      return false;
    }
  };
  
  // localStorage login function (fallback)
  const handleLocalStorageLogin = async () => {
    try {
      console.log('🔄 Using localStorage fallback...');
      // Get stored users directly from localStorage for the most up-to-date data
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      console.log('Attempting login with:', { username, password: password ? '****' : '' });
      console.log('Available users:', storedUsers.length);
      
      // Log every user's credentials for detailed debugging (only in development)
      storedUsers.forEach((user, index) => {
        console.log(`User ${index + 1} comparison:`, {
          storedUsername: user.username,
          enteredUsername: username,
          usernameMatch: user.username.trim().toLowerCase() === username.trim().toLowerCase(),
          storedEmail: user.email,
          emailMatch: user.email && user.email.trim().toLowerCase() === username.trim().toLowerCase(),
          // Don't log actual passwords, just if they match
          passwordMatch: user.password === password,
          passwordLengthMatch: user.password?.length === password.length
        });
      });
      
      // More flexible matching - case insensitive username/email, but case sensitive password
      const user = storedUsers.find(
        u => (u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
             (u.email && u.email.trim().toLowerCase() === username.trim().toLowerCase())) && 
             u.password === password
      );
      
      console.log('Found matching user:', user ? 'Yes' : 'No');
      
      if (user) {
        // Simulate API delay for a more realistic experience
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Handle successful login
        onLogin({ username: user.username, email: user.email });
        navigate('/home');
        return true;
      } else {
        // No user found, try direct debugging of the exact issue
        const usernameOrEmailMatch = storedUsers.find(
          u => u.username.trim().toLowerCase() === username.trim().toLowerCase() || 
               (u.email && u.email.trim().toLowerCase() === username.trim().toLowerCase())
        );
        
        if (usernameOrEmailMatch) {
          setError('Password is incorrect');
          console.log('Username/email matched but password did not match');
        } else {
          setError('Username or email not found');
          console.log('No matching username or email found');
        }
        return false;
      }
    } catch (err) {
      console.error('localStorage login error:', err);
      setError('An error occurred during login. Please try again.');
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!username.trim()) {
      setError('Username or email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      let loginSuccess = false;
      
      // Debug logging
      console.log('🔍 Login Debug Info:', {
        useBackend,
        backendStatus,
        backendStatusSuccess: backendStatus?.success,
        willTryBackend: useBackend && backendStatus?.success
      });
      
      if (useBackend && backendStatus?.success) {
        console.log('🎯 Conditions met: Trying backend first...');
        // Try backend first (only if backend is available)
        loginSuccess = await handleBackendLogin();
        
        if (!loginSuccess) {
          console.log('⚠️ Backend login failed, trying localStorage fallback...');
          // If backend fails, try localStorage as fallback
          loginSuccess = await handleLocalStorageLogin();
        }
      } else {
        // Use localStorage directly (backend unavailable or disabled)
        console.log('🔄 Skipping backend, reasons:', {
          useBackend,
          backendStatusSuccess: backendStatus?.success,
          backendUnavailable: !backendStatus?.success,
          backendDisabled: !useBackend
        });
        loginSuccess = await handleLocalStorageLogin();
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to clear all users (for testing purposes)
  const clearAllUsers = () => {
    if (window.confirm('⚠️ WARNING: This will delete ALL user accounts and auth data. Continue?')) {
      localStorage.removeItem('users');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      alert('All users and auth data have been cleared.');
      console.log('All users and auth data cleared');
    }
  };

  // Sync localStorage users to backend
  const syncLocalStorageUsersToBackend = async () => {
    try {
      console.log('🔄 Starting user synchronization...');
      
      // Get users from localStorage
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
      console.log(`📋 Found ${localUsers.length} users in localStorage:`, localUsers);
      
      if (localUsers.length === 0) {
        alert('⚠️ No users found in localStorage to sync');
        return;
      }
      
      let syncResults = [];
      
      for (const user of localUsers) {
        try {
          console.log(`🚀 Syncing user: ${user.username}`);
          
          // Attempt to register each user in the backend
          const response = await fetch('http://127.0.0.1:8000/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user.username,
              email: user.email,
              password: user.password
            })
          });
          
          const result = await response.json();
          
          if (response.status === 201 && result.success) {
            console.log(`✅ User ${user.username} synced successfully`);
            syncResults.push({ username: user.username, status: 'success' });
          } else if (response.status === 400 && result.error && result.error.includes('already exists')) {
            console.log(`ℹ️ User ${user.username} already exists in backend`);
            syncResults.push({ username: user.username, status: 'exists' });
          } else {
            console.error(`❌ Failed to sync user ${user.username}:`, result);
            syncResults.push({ username: user.username, status: 'failed' });
          }
          
          // Small delay to avoid overwhelming the backend
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (error) {
          console.error(`❌ Error syncing user ${user.username}:`, error);
          syncResults.push({ username: user.username, status: 'error' });
        }
      }
      
      // Show summary
      const successCount = syncResults.filter(r => r.status === 'success').length;
      const existsCount = syncResults.filter(r => r.status === 'exists').length;
      const failedCount = syncResults.filter(r => r.status === 'failed' || r.status === 'error').length;
      
      alert(`🔄 User Synchronization Complete!\n\n` +
            `✅ Successfully synced: ${successCount}\n` +
            `ℹ️ Already existed: ${existsCount}\n` +
            `❌ Failed: ${failedCount}\n\n` +
            `Check console for detailed results.`);
      
    } catch (error) {
      console.error('❌ Sync operation failed:', error);
      alert(`❌ Synchronization failed: ${error.message}`);
    }
  };

  // Function to handle forgot password request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      setResetError('Please enter your email address');
      return;
    }
    
    setIsResetting(true);
    setResetError('');
    
    try {
      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email (case insensitive)
      const user = storedUsers.find(
        u => u.email && u.email.trim().toLowerCase() === resetEmail.trim().toLowerCase()
      );
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (user) {
        // In a real app, we would send an email with reset instructions
        // For this demo, we'll generate a "temporary password" and update the user's record
        const tempPassword = Math.random().toString(36).slice(2, 10);
        
        // Update user's password in localStorage
        const updatedUsers = storedUsers.map(u => {
          if (u.email && u.email.trim().toLowerCase() === resetEmail.trim().toLowerCase()) {
            return { ...u, password: tempPassword };
          }
          return u;
        });
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        console.log(`Password reset for ${user.email}. New temp password: ${tempPassword}`);
        
        // Show success message with the temporary password
        setResetSuccess(true);
        
        // For demo purposes, show temp password in alert 
        // (in a real app, this would be sent via email)
        alert(`A temporary password has been generated: ${tempPassword}\n\nIn a real application, this would be sent securely to your email.`);
      } else {
        setResetError('No account found with that email address');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setResetError('An error occurred. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };
  
  // Toggle forgot password form
  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setResetEmail('');
    setResetError('');
    setResetSuccess(false);
  };
  
  // Test backend connection manually
  const testBackendConnection = async () => {
    try {
      console.log('🔧 Testing backend connection...');
      
      // Test your main API endpoint
      const mainResponse = await fetch('http://127.0.0.1:8000/');
      const mainData = await mainResponse.json();
      
      // Test your health endpoint
      const healthResponse = await fetch('http://127.0.0.1:8000/api/health');
      const healthData = await healthResponse.json();
      
      // Test your database status
      const dbResponse = await fetch('http://127.0.0.1:8000/api/db-status');
      const dbData = await dbResponse.json();
      
      setBackendStatus({
        success: true,
        status: healthData.status,
        database_status: healthData.database_status || healthData.database,
        centralized_database: healthData.centralized_database
      });
      
      alert(`✅ Backend Connected Successfully!\n\n` +
            `Main API: ${mainData.message}\n` +
            `Version: ${mainData.version}\n` +
            `Status: ${healthData.status}\n` +
            `Database: ${healthData.database_status || healthData.database}\n` +
            `Centralized DB: ${healthData.centralized_database ? 'Yes' : 'No'}\n` +
            `Connection: ${dbData.success ? 'Success' : 'Failed'}`);
      
      console.log('✅ Backend test results:', { mainData, healthData, dbData });
      
    } catch (error) {
      setBackendStatus({
        success: false,
        error: error.message
      });
      
      alert(`❌ Backend Connection Failed!\n\nError: ${error.message}\n\nMake sure your backend is running:\npython app.py`);
      console.error('❌ Backend connection test failed:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-100 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {!showForgotPassword ? (
          // Login Form
          <>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login to Your Account</h1>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username/Email field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username or Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>
              
              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={toggleForgotPassword}
                    className="text-xs font-medium text-violet-600 hover:text-violet-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter your password"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            {/* Signup link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-violet-600 hover:text-violet-500">
                  Sign up
                </Link>
              </p>
            </div>
            
          </>
        ) : (
          // Forgot Password Form
          <>
            <div className="flex items-center mb-4">
              <button 
                onClick={toggleForgotPassword} 
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-center text-gray-800">Reset Password</h1>
            </div>
            
            {resetSuccess ? (
              <div className="text-center space-y-4">
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4 text-left" role="alert">
                  <p>Password reset successful! Check your email for instructions.</p>
                </div>
                <button
                  onClick={toggleForgotPassword}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                
                {resetError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p>{resetError}</p>
                  </div>
                )}
                
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="resetEmail"
                        name="resetEmail"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
                  >
                    {isResetting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;