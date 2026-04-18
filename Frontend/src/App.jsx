
// // src/App.jsx
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Signup from './Components/SignUp';
// import LoginPage from './Components/Login';
// import Home from './Components/Home';
// import AnxietyDetail from './Components/home/AnxietyDetail';
// import AnxietyAssistant from './Components/home/AnxietyAssistant'; 
// import AnxietyAssistantMobile from './Components/home/AnxietyAssistantMobile'; 
// import Recommendation from './Components/home/Recommendation'; 
// import RecommendationDetail from './Components/home/RecommendationDetail';
// import Settings from './Components/home/Settings';
// import InstructionPopup from './Components/InstructionPopup';
// import MoodTracker from './Components/home/MoodTracker';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer'; // FIXED: Updated import path from './Components/home/Footer'

// // Layout component that includes the Navbar and Footer
// const AppLayout = ({ loggedInUser, onLogout, children }) => {
//   const location = useLocation();
//   const showNavbarFooter = loggedInUser && 
//     !['/login', '/signup'].includes(location.pathname); // Only show navbar and footer when logged in

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-violet-100 to-blue-50 flex flex-col">
//       <div className="flex-grow pb-16">
//         {children}
//       </div>
//       {showNavbarFooter && <Navbar />}
//       {showNavbarFooter && <Footer />}
//     </div>
//   );
// };

// function App() {
//   const [showInstructions, setShowInstructions] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
  
//   // Check if user is logged in from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const isFirstLogin = localStorage.getItem('isFirstLogin');
    
//     if (storedUser) {
//       setLoggedInUser(JSON.parse(storedUser));
      
//       // Show instructions if it's the first login
//       if (isFirstLogin === 'true') {
//         setShowInstructions(true);
//         // Clear the first login flag
//         localStorage.setItem('isFirstLogin', 'false');
//       }
//     }
    
//     // Mark initialization as complete
//     setIsInitialized(true);
//   }, []);
  
//   const handleSignUp = (user) => {
//     setLoggedInUser(user);
//     localStorage.setItem('user', JSON.stringify(user));
//     localStorage.setItem('isFirstLogin', 'true');
//     setShowInstructions(true);
//   };
  
//   const handleLogin = (user) => {
//     setLoggedInUser(user);
//     localStorage.setItem('user', JSON.stringify(user));
//   };
  
//   const handleLogout = () => {
//     setLoggedInUser(null);
//     localStorage.removeItem('user');
//   };
  
//   const handleCloseInstructions = () => {
//     setShowInstructions(false);
//   };
  
//   // Show loading state while checking authentication
//   if (!isInitialized) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-violet-100 to-blue-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
//       </div>
//     );
//   }
  
//   return (
//     <BrowserRouter>
//       <AppLayout loggedInUser={loggedInUser} onLogout={handleLogout}>
//         {showInstructions && <InstructionPopup onClose={handleCloseInstructions} />}
        
//         <Routes>
//           {/* Default route redirects to login */}
//           <Route path="/" element={<Navigate to="/login" replace />} />
          
//           {/* Login is the first page users see */}
//           <Route 
//             path="/login" 
//             element={
//               loggedInUser ? 
//                 <Navigate to="/home" replace /> : 
//                 <LoginPage onLogin={handleLogin} />
//             } 
//           />
          
//           {/* Signup page */}
//           <Route 
//             path="/signup" 
//             element={
//               loggedInUser ? 
//                 <Navigate to="/home" replace /> : 
//                 <Signup onSignUp={handleSignUp} />
//             } 
//           />
          
//           {/* Protected Home route - only accessible after login */}
//           <Route 
//             path="/home" 
//             element={
//               loggedInUser ? 
//                 <Home user={loggedInUser} onLogout={handleLogout} /> : 
//                 <Navigate to="/login" replace state={{ from: '/home' }} />
//             } 
//           />
          
//           {/* MoodTracker route - accessible only when logged in */}
//           <Route 
//             path="/mood" 
//             element={
//               loggedInUser ? 
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                   <MoodTracker username={loggedInUser.username} />
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/mood' }} />
//             } 
//           />
          
//           {/* Protected Anxiety Detail route */}
//           <Route 
//             path="/anxiety/:id" 
//             element={
//               loggedInUser ? 
//                 <AnxietyDetail /> : 
//                 <Navigate to="/login" replace state={{ from: `/anxiety/:id` }} />
//             } 
//           />

//           {/* Added AnxietyAssistant route with responsive component selection */}
//           <Route 
//             path="/assistant" 
//             element={
//               loggedInUser ? 
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                   {/* Responsive Component: Use either desktop or mobile version based on screen size */}
//                   <div className="block md:hidden">
//                     {/* Mobile version */}
//                     <AnxietyAssistantMobile username={loggedInUser.username} />
//                   </div>
//                   <div className="hidden md:block">
//                     {/* Desktop version */}
//                     <AnxietyAssistant username={loggedInUser.username} />
//                   </div>
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/assistant' }} />
//             } 
//           />

//           {/* Recommendations route */}
//           <Route 
//             path="/recommendations" 
//             element={
//               loggedInUser ? 
//                 <Recommendation /> : 
//                 <Navigate to="/login" replace state={{ from: '/recommendations' }} />
//             } 
//           />
          
//           {/* Recommendation Detail route */}
//           <Route 
//             path="/recommendations/:id" 
//             element={
//               loggedInUser ? 
//                 <RecommendationDetail /> : 
//                 <Navigate to="/login" replace state={{ from: '/recommendations/:id' }} />
//             } 
//           />

//           {/* Settings route - replacing Goals route */}
//           <Route 
//             path="/settings" 
//             element={
//               loggedInUser ? 
//                 <Settings onLogout={handleLogout} /> : 
//                 <Navigate to="/login" replace state={{ from: '/settings' }} />
//             } 
//           />

//           {/* Add routes for pages referenced in the Footer */}
//           <Route 
//             path="/privacy" 
//             element={
//               loggedInUser ? 
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                   <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
//                   <p>Privacy policy content goes here.</p>
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/privacy' }} />
//             } 
//           />

//           <Route 
//             path="/terms" 
//             element={
//               loggedInUser ? 
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                   <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
//                   <p>Terms of service content goes here.</p>
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/terms' }} />
//             } 
//           />

//           <Route 
//             path="/accessibility" 
//             element={
//               loggedInUser ? 
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                   <h1 className="text-2xl font-bold mb-4">Accessibility</h1>
//                   <p>Accessibility information goes here.</p>
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/accessibility' }} />
//             } 
//           />

//           <Route 
//             path="/resources" 
//             element={
//               loggedInUser ? 
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                   <h1 className="text-2xl font-bold mb-4">Resources</h1>
//                   <p>Resources content goes here.</p>
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/resources' }} />
//             } 
//           />

//           <Route 
//             path="/share" 
//             element={
//               loggedInUser ? 
//                 <div className="p-4">
//                   <h1 className="text-2xl font-bold">Share</h1>
//                   <p>Share page content goes here.</p>
//                 </div> : 
//                 <Navigate to="/login" replace state={{ from: '/share' }} />
//             } 
//           />
          
//           {/* Catch all other routes and redirect to login */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </AppLayout>
//     </BrowserRouter>
//   );
// }

// export default App;
// update 
// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './Components/SignUp';
import LoginPage from './Components/Login';
import Home from './Components/Home';
import AnxietyDetail from './Components/home/AnxietyDetail';
import AnxietyAssistant from './Components/home/AnxietyAssistant'; 
import AnxietyAssistantMobile from './Components/home/AnxietyAssistantMobile'; 
import Recommendation from './Components/home/Recommendation'; 
import RecommendationDetail from './Components/home/RecommendationDetail';
import Settings from './Components/home/Settings';
import InstructionPopup from './Components/InstructionPopup';
import MoodTracker from './Components/home/MoodTracker';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import axios from 'axios';

// Layout component that includes the Navbar and Footer
const AppLayout = ({ loggedInUser, onLogout, children }) => {
  const location = useLocation();

  const showNavbarFooter = loggedInUser &&
    !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-blue-50 flex flex-col">
      <div className="flex-grow pb-16">
        {children}
     </div>
      {showNavbarFooter && <Navbar />}
      {showNavbarFooter && <Footer />}
    </div>
  );
};

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isFirstLogin = localStorage.getItem('isFirstLogin');
    
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      
      // Show instructions if it's the first login
      if (isFirstLogin === 'true') {
        setShowInstructions(true);
        // Clear the first login flag
        localStorage.setItem('isFirstLogin', 'false');
      }
    }
    
    // Mark initialization as complete
    setIsInitialized(true);
  }, []);
  
  const handleSignUp = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isFirstLogin', 'true');
    setShowInstructions(true);
  };
  
  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('user');
  };
  
  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };
  
  // Show loading state while checking authentication
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-100 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <AppLayout loggedInUser={loggedInUser} onLogout={handleLogout}>
        {showInstructions && <InstructionPopup onClose={handleCloseInstructions} />}
        
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Login is the first page users see */}
          <Route 
            path="/login" 
            element={
              loggedInUser ? 
                <Navigate to="/home" replace /> : 
                <LoginPage onLogin={handleLogin} />
            } 
          />
          
          {/* Signup page */}
          <Route 
            path="/signup" 
            element={
              loggedInUser ? 
                <Navigate to="/home" replace /> : 
                <Signup onSignUp={handleSignUp} />
            } 
          />
          
          {/* Protected Home route - only accessible after login */}
          <Route 
            path="/home" 
            element={
              loggedInUser ? 
                <Home user={loggedInUser} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace state={{ from: '/home' }} />
            } 
          />
          
          {/* MoodTracker route - accessible only when logged in */}
          <Route 
            path="/mood" 
            element={
              loggedInUser ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                  <MoodTracker username={loggedInUser.username} />
                </div> : 
                <Navigate to="/login" replace state={{ from: '/mood' }} />
            } 
          />
          
          {/* Protected Anxiety Detail route */}
          <Route 
            path="/anxiety/:id" 
            element={
              loggedInUser ? 
                <AnxietyDetail /> : 
                <Navigate to="/login" replace state={{ from: `/anxiety/:id` }} />
            } 
          />

          {/* Added AnxietyAssistant route with responsive component selection */}
          <Route 
            path="/assistant" 
            element={
              loggedInUser ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                  {/* Responsive Component: Use either desktop or mobile version based on screen size */}
                  <div className="block md:hidden">
                    {/* Mobile version */}
                    <AnxietyAssistantMobile username={loggedInUser.username} />
                  </div>
                  <div className="hidden md:block">
                    {/* Desktop version */}
                    <AnxietyAssistant username={loggedInUser.username} />
                  </div>
                </div> : 
                <Navigate to="/login" replace state={{ from: '/assistant' }} />
            } 
          />

          {/* Recommendations route */}
          <Route 
            path="/recommendations" 
            element={
              loggedInUser ? 
                <Recommendation /> : 
                <Navigate to="/login" replace state={{ from: '/recommendations' }} />
            } 
          />
          
          {/* Recommendation Detail route */}
          <Route 
            path="/recommendations/:id" 
            element={
              loggedInUser ? 
                <RecommendationDetail /> : 
                <Navigate to="/login" replace state={{ from: '/recommendations/:id' }} />
            } 
          />

          {/* Settings route - replacing Goals route */}
          <Route 
            path="/settings" 
            element={
              loggedInUser ? 
                <Settings onLogout={handleLogout} /> : 
                <Navigate to="/login" replace state={{ from: '/settings' }} />
            } 
          />

          {/* Add routes for pages referenced in the Footer */}
          <Route 
            path="/privacy" 
            element={
              loggedInUser ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                  <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                  <p>Privacy policy content goes here.</p>
                </div> : 
                <Navigate to="/login" replace state={{ from: '/privacy' }} />
            } 
          />

          <Route 
            path="/terms" 
            element={
              loggedInUser ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                  <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
                  <p>Terms of service content goes here.</p>
                </div> : 
                <Navigate to="/login" replace state={{ from: '/terms' }} />
            } 
          />

          <Route 
            path="/accessibility" 
            element={
              loggedInUser ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                  <h1 className="text-2xl font-bold mb-4">Accessibility</h1>
                  <p>Accessibility information goes here.</p>
                </div> : 
                <Navigate to="/login" replace state={{ from: '/accessibility' }} />
            } 
          />

          <Route 
            path="/resources" 
            element={
              loggedInUser ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                  <h1 className="text-2xl font-bold mb-4">Resources</h1>
                  <p>Resources content goes here.</p>
                </div> : 
                <Navigate to="/login" replace state={{ from: '/resources' }} />
            } 
          />

          <Route 
            path="/share" 
            element={
              loggedInUser ? 
                <div className="p-4">
                  <h1 className="text-2xl font-bold">Share</h1>
                  <p>Share page content goes here.</p>
                </div> : 
                <Navigate to="/login" replace state={{ from: '/share' }} />
            } 
          />
          
          {/* Catch all other routes and redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
