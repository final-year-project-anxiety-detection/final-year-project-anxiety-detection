// // // src/Components/SignUp.jsx
// // import { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // const SignUp = ({ onSignUp }) => {
// //   const navigate = useNavigate();
// //   const [username, setUsername] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [existingUsers, setExistingUsers] = useState([]);

// //   // Load existing users on component mount
// //   useEffect(() => {
// //     try {
// //       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
// //       setExistingUsers(storedUsers);
// //       console.log('Loaded existing users:', storedUsers);
// //     } catch (error) {
// //       console.error('Error loading existing users:', error);
// //     }
// //   }, []);

// //   // Password strength indicators
// //   const [passwordStrength, setPasswordStrength] = useState({
// //     length: false,
// //     uppercase: false,
// //     lowercase: false, 
// //     number: false,
// //     special: false
// //   });

// //   // Update password strength indicators when password changes
// //   const updatePasswordStrength = (password) => {
// //     setPasswordStrength({
// //       length: password.length >= 8,
// //       uppercase: /[A-Z]/.test(password),
// //       lowercase: /[a-z]/.test(password),
// //       number: /[0-9]/.test(password),
// //       special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
// //     });
// //   };

// //   const handlePasswordChange = (e) => {
// //     const newPassword = e.target.value;
// //     setPassword(newPassword);
// //     updatePasswordStrength(newPassword);
// //   };

// //   // Check for username or email duplicates as user types
// //   const checkForDuplicates = (field, value) => {
// //     if (!value.trim()) return false;
    
// //     if (field === 'username') {
// //       return existingUsers.some(user => user.username === value.trim());
// //     } else if (field === 'email') {
// //       return existingUsers.some(user => user.email === value.trim());
// //     }
// //     return false;
// //   };

// //   const handleUsernameChange = (e) => {
// //     const value = e.target.value;
// //     setUsername(value);
    
// //     if (checkForDuplicates('username', value)) {
// //       setErrors(prev => ({ ...prev, username: "Username already exists" }));
// //     } else {
// //       setErrors(prev => {
// //         const newErrors = { ...prev };
// //         delete newErrors.username;
// //         return newErrors;
// //       });
// //     }
// //   };

// //   const handleEmailChange = (e) => {
// //     const value = e.target.value;
// //     setEmail(value);
    
// //     if (checkForDuplicates('email', value)) {
// //       setErrors(prev => ({ ...prev, email: "Email already exists" }));
// //     } else {
// //       setErrors(prev => {
// //         const newErrors = { ...prev };
// //         delete newErrors.email;
// //         return newErrors;
// //       });
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
    
// //     if (!username.trim()) {
// //       newErrors.username = "Username is required";
// //     } else if (checkForDuplicates('username', username)) {
// //       newErrors.username = "Username already exists";
// //     }
    
// //     if (!email.trim()) {
// //       newErrors.email = "Email is required";
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       newErrors.email = "Email is invalid";
// //     } else if (checkForDuplicates('email', email)) {
// //       newErrors.email = "Email already exists";
// //     }
    
// //     if (!password) {
// //       newErrors.password = "Password is required";
// //     } else {
// //       if (!passwordStrength.length) {
// //         newErrors.password = "Password must be at least 8 characters";
// //       } else if (!passwordStrength.uppercase || !passwordStrength.lowercase || 
// //               !passwordStrength.number || !passwordStrength.special) {
// //         newErrors.password = "Password doesn't meet all requirements";
// //       }
// //     }
    
// //     if (password !== confirmPassword) {
// //       newErrors.confirmPassword = "Passwords do not match";
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) return;
    
// //     setIsLoading(true);
    
// //     try {
// //       // Simulate API call delay
// //       await new Promise(resolve => setTimeout(resolve, 1000));
      
// //       // Create new user - trimming values to avoid spaces
// //       const newUser = { 
// //         username: username.trim(), 
// //         email: email.trim(), 
// //         password: password // Keep password as-is to preserve case sensitivity
// //       };
      
// //       // Double-check again for duplicates
// //       if (checkForDuplicates('username', username) || checkForDuplicates('email', email)) {
// //         throw new Error('Username or email already exists');
// //       }
      
// //       // Store in localStorage for demo purposes
// //       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
// //       storedUsers.push(newUser);
// //       localStorage.setItem('users', JSON.stringify(storedUsers));
      
// //       console.log('User registered successfully:', newUser);
// //       console.log('All users after registration:', storedUsers);
      
// //       // Call onSignUp to set as logged in user
// //       onSignUp({ username: newUser.username, email: newUser.email });
      
// //       // Navigate to home page (handled by App.js route protection)
// //       navigate('/home');
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       setErrors({ submit: error.message || "An error occurred during sign up. Please try again." });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-100 to-blue-50 p-2 overflow-auto">
// //       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
// //         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h1>
        
// //         {errors.submit && (
// //           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
// //             <p>{errors.submit}</p>
// //           </div>
// //         )}
        
// //         <form onSubmit={handleSubmit} className="space-y-3">
// //           {/* Username field */}
// //           <div>
// //             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
// //               Username
// //             </label>
// //             <input
// //               id="username"
// //               name="username"
// //               type="text"
// //               value={username}
// //               onChange={handleUsernameChange}
// //               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
// //                 errors.username ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //               placeholder="Choose a username"
// //             />
// //             {errors.username && (
// //               <p className="mt-1 text-xs text-red-600">{errors.username}</p>
// //             )}
// //           </div>
          
// //           {/* Email field */}
// //           <div>
// //             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //               Email
// //             </label>
// //             <input
// //               id="email"
// //               name="email"
// //               type="email"
// //               value={email}
// //               onChange={handleEmailChange}
// //               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
// //                 errors.email ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //               placeholder="Enter your email"
// //             />
// //             {errors.email && (
// //               <p className="mt-1 text-xs text-red-600">{errors.email}</p>
// //             )}
// //           </div>
          
// //           {/* Password field */}
// //           <div>
// //             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 value={password}
// //                 onChange={handlePasswordChange}
// //                 className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
// //                   errors.password ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //                 placeholder="Create a password"
// //               />
// //               <div 
// //                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
// //                 onClick={() => setShowPassword(!showPassword)}
// //               >
// //                 {showPassword ? (
// //                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// //                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
// //                   </svg>
// //                 ) : (
// //                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                     <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
// //                     <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
// //                   </svg>
// //                 )}
// //               </div>
// //             </div>
// //             {errors.password && (
// //               <p className="mt-1 text-xs text-red-600">{errors.password}</p>
// //             )}
            
// //             {/* Password strength requirements - made more compact */}
// //             <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
// //               <div className={`text-xs flex items-center ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
// //                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //                   {passwordStrength.length ? (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   ) : (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
// //                   )}
// //                 </svg>
// //                 Min. 8 characters
// //               </div>
// //               <div className={`text-xs flex items-center ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
// //                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //                   {passwordStrength.uppercase ? (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   ) : (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
// //                   )}
// //                 </svg>
// //                 Uppercase letter
// //               </div>
// //               <div className={`text-xs flex items-center ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
// //                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //                   {passwordStrength.lowercase ? (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   ) : (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
// //                   )}
// //                 </svg>
// //                 Lowercase letter
// //               </div>
// //               <div className={`text-xs flex items-center ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
// //                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //                   {passwordStrength.number ? (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   ) : (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
// //                   )}
// //                 </svg>
// //                 Number
// //               </div>
// //               <div className={`text-xs flex items-center ${passwordStrength.special ? 'text-green-600' : 'text-gray-500'}`}>
// //                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.special ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //                   {passwordStrength.special ? (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   ) : (
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
// //                   )}
// //                 </svg>
// //                 Special character
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Confirm Password field */}
// //           <div>
// //             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
// //               Confirm Password
// //             </label>
// //             <div className="relative">
// //               <input
// //                 id="confirmPassword"
// //                 name="confirmPassword"
// //                 type={showPassword ? "text" : "password"}
// //                 value={confirmPassword}
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
// //                   errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //                 placeholder="Confirm your password"
// //               />
// //             </div>
// //             {errors.confirmPassword && (
// //               <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
// //             )}
// //           </div>
          
// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={isLoading}
// //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
// //           >
// //             {isLoading ? (
// //               <>
// //                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                 </svg>
// //                 Creating Account...
// //               </>
// //             ) : (
// //               'Sign Up'
// //             )}
// //           </button>
// //         </form>
        
// //         {/* Login link */}
// //         <div className="mt-4 text-center">
// //           <p className="text-sm text-gray-600">
// //             Already have an account?{' '}
// //             <Link to="/login" className="font-medium text-violet-600 hover:text-violet-500">
// //               Sign in
// //             </Link>
// //           </p>
// //         </div>
        
// //         {/* Debug section - moved to fit in the view */}
// //         <div className="mt-2 text-center">
// //           <button 
// //             onClick={() => {
// //               const users = JSON.parse(localStorage.getItem('users') || '[]');
// //               console.log('Current users in localStorage:', users);
// //               alert(`Current users: ${users.length > 0 ? users.map(u => u.username).join(', ') : 'None'}`);
// //             }}
// //             className="text-xs text-gray-500 hover:text-gray-700"
// //           >
// //             Debug: Check Registered Users
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;
// // update 
// // src/Components/SignUp.jsx - Updated with Backend Integration
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { authService } from '../services/authService';

// const SignUp = ({ onSignUp }) => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [existingUsers, setExistingUsers] = useState([]);
//   const [useBackend, setUseBackend] = useState(true); // Toggle between backend and localStorage

//   // Load existing users on component mount
//   useEffect(() => {
//     try {
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
//       setExistingUsers(storedUsers);
//       console.log('Loaded existing users:', storedUsers);
//     } catch (error) {
//       console.error('Error loading existing users:', error);
//     }
//   }, []);

//   // Password strength indicators
//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false, 
//     number: false,
//     special: false
//   });

//   // Update password strength indicators when password changes
//   const updatePasswordStrength = (password) => {
//     setPasswordStrength({
//       length: password.length >= 8,
//       uppercase: /[A-Z]/.test(password),
//       lowercase: /[a-z]/.test(password),
//       number: /[0-9]/.test(password),
//       special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
//     });
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     updatePasswordStrength(newPassword);
//   };

//   // Check for username or email duplicates as user types
//   const checkForDuplicates = (field, value) => {
//     if (!value.trim()) return false;
    
//     if (field === 'username') {
//       return existingUsers.some(user => user.username === value.trim());
//     } else if (field === 'email') {
//       return existingUsers.some(user => user.email === value.trim());
//     }
//     return false;
//   };

//   const handleUsernameChange = (e) => {
//     const value = e.target.value;
//     setUsername(value);
    
//     if (checkForDuplicates('username', value)) {
//       setErrors(prev => ({ ...prev, username: "Username already exists" }));
//     } else {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors.username;
//         return newErrors;
//       });
//     }
//   };

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
    
//     if (checkForDuplicates('email', value)) {
//       setErrors(prev => ({ ...prev, email: "Email already exists" }));
//     } else {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors.email;
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!username.trim()) {
//       newErrors.username = "Username is required";
//     } else if (checkForDuplicates('username', username)) {
//       newErrors.username = "Username already exists";
//     }
    
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     } else if (checkForDuplicates('email', email)) {
//       newErrors.email = "Email already exists";
//     }
    
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else {
//       if (!passwordStrength.length) {
//         newErrors.password = "Password must be at least 8 characters";
//       } else if (!passwordStrength.uppercase || !passwordStrength.lowercase || 
//               !passwordStrength.number || !passwordStrength.special) {
//         newErrors.password = "Password doesn't meet all requirements";
//       }
//     }
    
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Backend signup function
//   const handleBackendSignup = async () => {
//     try {
//       console.log('🚀 Attempting backend signup...');
//       const result = await authService.signup(username.trim(), password);
      
//       if (result.success) {
//         console.log('✅ Backend signup successful:', result);
//         onSignUp(result.user);
//         navigate('/home');
//         return true;
//       }
//     } catch (error) {
//       console.error('❌ Backend signup failed:', error.message);
//       setErrors({ submit: error.message || 'Signup failed. Please try again.' });
//       return false;
//     }
//   };

//   // localStorage signup function (fallback)
//   const handleLocalStorageSignup = async () => {
//     try {
//       console.log('🔄 Using localStorage fallback...');
      
//       // Create new user - trimming values to avoid spaces
//       const newUser = { 
//         username: username.trim(), 
//         email: email.trim(), 
//         password: password // Keep password as-is to preserve case sensitivity
//       };
      
//       // Double-check again for duplicates
//       if (checkForDuplicates('username', username) || checkForDuplicates('email', email)) {
//         throw new Error('Username or email already exists');
//       }
      
//       // Store in localStorage for demo purposes
//       const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
//       storedUsers.push(newUser);
//       localStorage.setItem('users', JSON.stringify(storedUsers));
      
//       console.log('User registered successfully:', newUser);
//       console.log('All users after registration:', storedUsers);
      
//       // Call onSignUp to set as logged in user
//       onSignUp({ username: newUser.username, email: newUser.email });
      
//       // Navigate to home page
//       navigate('/home');
//       return true;
      
//     } catch (error) {
//       console.error('localStorage signup error:', error);
//       setErrors({ submit: error.message || "An error occurred during sign up. Please try again." });
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       let signupSuccess = false;
      
//       if (useBackend) {
//         // Try backend first
//         signupSuccess = await handleBackendSignup();
        
//         if (!signupSuccess) {
//           console.log('⚠️ Backend signup failed, trying localStorage fallback...');
//           // If backend fails, try localStorage as fallback
//           signupSuccess = await handleLocalStorageSignup();
//         }
//       } else {
//         // Use localStorage directly
//         signupSuccess = await handleLocalStorageSignup();
//       }
      
//     } catch (error) {
//       console.error('Signup error:', error);
//       setErrors({ submit: error.message || "An error occurred during sign up. Please try again." });
//     } finally {
//       setIsLoading(false);
//     }
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
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-100 to-blue-50 p-2 overflow-auto">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h1>
        
//         {/* Backend/localStorage Toggle */}
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-blue-800">
//               {useBackend ? '🔗 Backend Mode' : '💾 LocalStorage Mode'}
//             </span>
//             <button
//               onClick={() => setUseBackend(!useBackend)}
//               className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
//             >
//               Switch to {useBackend ? 'LocalStorage' : 'Backend'}
//             </button>
//           </div>
//           <p className="text-xs text-blue-600 mt-1">
//             {useBackend 
//               ? 'Using backend API with localStorage fallback' 
//               : 'Using localStorage only (offline mode)'
//             }
//           </p>
//         </div>
        
//         {errors.submit && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
//             <p>{errors.submit}</p>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-3">
//           {/* Username field */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               value={username}
//               onChange={handleUsernameChange}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
//                 errors.username ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Choose a username"
//             />
//             {errors.username && (
//               <p className="mt-1 text-xs text-red-600">{errors.username}</p>
//             )}
//           </div>
          
//           {/* Email field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="mt-1 text-xs text-red-600">{errors.email}</p>
//             )}
//           </div>
          
//           {/* Password field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
//                   errors.password ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Create a password"
//               />
//               <div 
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                   </svg>
//                 ) : (
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                     <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                   </svg>
//                 )}
//               </div>
//             </div>
//             {errors.password && (
//               <p className="mt-1 text-xs text-red-600">{errors.password}</p>
//             )}
            
//             {/* Password strength requirements - made more compact */}
//             <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
//               <div className={`text-xs flex items-center ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
//                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   {passwordStrength.length ? (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   ) : (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//                   )}
//                 </svg>
//                 Min. 8 characters
//               </div>
//               <div className={`text-xs flex items-center ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
//                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   {passwordStrength.uppercase ? (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   ) : (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//                   )}
//                 </svg>
//                 Uppercase letter
//               </div>
//               <div className={`text-xs flex items-center ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
//                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   {passwordStrength.lowercase ? (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   ) : (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//                   )}
//                 </svg>
//                 Lowercase letter
//               </div>
//               <div className={`text-xs flex items-center ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
//                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   {passwordStrength.number ? (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   ) : (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//                   )}
//                 </svg>
//                 Number
//               </div>
//               <div className={`text-xs flex items-center ${passwordStrength.special ? 'text-green-600' : 'text-gray-500'}`}>
//                 <svg className={`w-3 h-3 mr-1 ${passwordStrength.special ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   {passwordStrength.special ? (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   ) : (
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//                   )}
//                 </svg>
//                 Special character
//               </div>
//             </div>
//           </div>
          
//           {/* Confirm Password field */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
//                   errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Confirm your password"
//               />
//             </div>
//             {errors.confirmPassword && (
//               <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
//             )}
//           </div>
          
//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
//           >
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Creating Account...
//               </>
//             ) : (
//               'Sign Up'
//             )}
//           </button>
//         </form>
        
//         {/* Login link */}
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-violet-600 hover:text-violet-500">
//               Sign in
//             </Link>
//           </p>
//         </div>
        
//         {/* Debug section */}
//         <div className="mt-2 space-y-2">
//           <div className="text-center">
//             <button 
//               onClick={() => {
//                 const users = JSON.parse(localStorage.getItem('users') || '[]');
//                 console.log('Current users in localStorage:', users);
//                 alert(`Current users: ${users.length > 0 ? users.map(u => u.username).join(', ') : 'None'}`);
//               }}
//               className="text-xs text-gray-500 hover:text-gray-700"
//             >
//               Debug: Check Registered Users
//             </button>
//           </div>
//           <div className="text-center">
//             <button 
//               onClick={testBackendConnection}
//               className="text-xs text-blue-500 hover:text-blue-700"
//             >
//               🔧 Test Backend Connection
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// src/Components/SignUp.jsx - UPDATED with Enhanced Backend Integration
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const SignUp = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);
  const [useBackend, setUseBackend] = useState(true); // Toggle between backend and localStorage
  const [backendStatus, setBackendStatus] = useState(null);

  // Test backend connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      const result = await authService.testBackendConnection();
      setBackendStatus(result);
    };
    
    testConnection();
  }, []);

  // Load existing users on component mount
  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setExistingUsers(storedUsers);
      console.log('Loaded existing users:', storedUsers);
    } catch (error) {
      console.error('Error loading existing users:', error);
    }
  }, []);

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false, 
    number: false,
    special: false
  });

  // Update password strength indicators when password changes
  const updatePasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    updatePasswordStrength(newPassword);
  };

  // Check for username or email duplicates as user types
  const checkForDuplicates = (field, value) => {
    if (!value.trim()) return false;
    
    if (field === 'username') {
      return existingUsers.some(user => user.username === value.trim());
    } else if (field === 'email') {
      return existingUsers.some(user => user.email === value.trim());
    }
    return false;
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    if (checkForDuplicates('username', value)) {
      setErrors(prev => ({ ...prev, username: "Username already exists" }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.username;
        return newErrors;
      });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (checkForDuplicates('email', value)) {
      setErrors(prev => ({ ...prev, email: "Email already exists" }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (checkForDuplicates('username', username)) {
      newErrors.username = "Username already exists";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    } else if (checkForDuplicates('email', email)) {
      newErrors.email = "Email already exists";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (!passwordStrength.length) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!passwordStrength.uppercase || !passwordStrength.lowercase || 
              !passwordStrength.number || !passwordStrength.special) {
        newErrors.password = "Password doesn't meet all requirements";
      }
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Backend signup function - ENHANCED
  const handleBackendSignup = async () => {
    try {
      console.log('🚀 Attempting backend signup...');
      const result = await authService.signup(username.trim(), password);
      
      if (result.success) {
        console.log('✅ Backend signup successful:', result);
        onSignUp(result.user);
        navigate('/home');
        return true;
      } else {
        setErrors({ submit: result.error || 'Signup failed. Please try again.' });
        return false;
      }
    } catch (error) {
      console.error('❌ Backend signup failed:', error.message);
      setErrors({ submit: error.message || 'Signup failed. Please try again.' });
      return false;
    }
  };

  // localStorage signup function (fallback)
  const handleLocalStorageSignup = async () => {
    try {
      console.log('🔄 Using localStorage fallback...');
      
      // Create new user - trimming values to avoid spaces
      const newUser = { 
        username: username.trim(), 
        email: email.trim(), 
        password: password // Keep password as-is to preserve case sensitivity
      };
      
      // Double-check again for duplicates
      if (checkForDuplicates('username', username) || checkForDuplicates('email', email)) {
        throw new Error('Username or email already exists');
      }
      
      // Store in localStorage for demo purposes
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      console.log('User registered successfully:', newUser);
      console.log('All users after registration:', storedUsers);
      
      // Call onSignUp to set as logged in user
      onSignUp({ username: newUser.username, email: newUser.email });
      
      // Navigate to home page
      navigate('/home');
      return true;
      
    } catch (error) {
      console.error('localStorage signup error:', error);
      setErrors({ submit: error.message || "An error occurred during sign up. Please try again." });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let signupSuccess = false;
      
      if (useBackend && backendStatus?.success) {
        // Try backend first (only if backend is available)
        signupSuccess = await handleBackendSignup();
        
        if (!signupSuccess) {
          console.log('⚠️ Backend signup failed, trying localStorage fallback...');
          // If backend fails, try localStorage as fallback
          signupSuccess = await handleLocalStorageSignup();
        }
      } else {
        // Use localStorage directly (backend unavailable or disabled)
        if (!backendStatus?.success) {
          console.log('⚠️ Backend unavailable, using localStorage only...');
        }
        signupSuccess = await handleLocalStorageSignup();
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: error.message || "An error occurred during sign up. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Test backend connection manually
  const testBackendConnection = async () => {
    try {
      const result = await authService.testBackendConnection();
      setBackendStatus(result);
      
      if (result.success) {
        alert(`✅ Backend Connected!\n\nStatus: ${result.status}\nDatabase: ${result.database_status}\nTimestamp: ${new Date().toLocaleString()}`);
      } else {
        alert(`❌ Backend Connection Failed!\n\nError: ${result.error}\n\nMake sure your backend is running on http://127.0.0.1:8000`);
      }
    } catch (error) {
      alert(`❌ Connection test failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-100 to-blue-50 p-2 overflow-auto">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h1>
        
{errors.submit && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
            <p>{errors.submit}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">{errors.username}</p>
            )}
          </div>
          
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>
          
          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
            
            {/* Password strength requirements - made more compact */}
            <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
              <div className={`text-xs flex items-center ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
                <svg className={`w-3 h-3 mr-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {passwordStrength.length ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  )}
                </svg>
                Min. 8 characters
              </div>
              <div className={`text-xs flex items-center ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                <svg className={`w-3 h-3 mr-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {passwordStrength.uppercase ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  )}
                </svg>
                Uppercase letter
              </div>
              <div className={`text-xs flex items-center ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                <svg className={`w-3 h-3 mr-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {passwordStrength.lowercase ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  )}
                </svg>
                Lowercase letter
              </div>
              <div className={`text-xs flex items-center ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
                <svg className={`w-3 h-3 mr-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {passwordStrength.number ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  )}
                </svg>
                Number
              </div>
              <div className={`text-xs flex items-center ${passwordStrength.special ? 'text-green-600' : 'text-gray-500'}`}>
                <svg className={`w-3 h-3 mr-1 ${passwordStrength.special ? 'text-green-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {passwordStrength.special ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  )}
                </svg>
                Special character
              </div>
            </div>
          </div>
          
          {/* Confirm Password field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        {/* Login link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-violet-600 hover:text-violet-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {/* Debug section */}
        <div className="mt-2 space-y-2">
          <div className="text-center">
            <button 
              onClick={() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                console.log('Current users in localStorage:', users);
                alert(`Current users: ${users.length > 0 ? users.map(u => u.username).join(', ') : 'None'}`);
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Debug: Check Registered Users
            </button>
          </div>
          <div className="text-center">
            <button 
              onClick={() => authService.debugAuth()}
              className="text-xs text-purple-500 hover:text-purple-700"
            >
              🔍 Debug Auth State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;