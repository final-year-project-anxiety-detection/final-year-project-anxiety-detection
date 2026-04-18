// // src/components/home/MoodTracker.jsx
// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const MoodTracker = () => {
//   const [tempMood, setTempMood] = useState(3); // Default to middle mood
//   const [submitted, setSubmitted] = useState(false);
//   const [username, setUsername] = useState('');
//   const sliderRef = useRef(null);
//   const circleRef = useRef(null);
  
//   // Get current user data on component mount
//   useEffect(() => {
//     try {
//       // Get current user from localStorage
//       const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//       if (currentUser && currentUser.username) {
//         setUsername(currentUser.username);
//       } else {
//         // If no currentUser is found, try to get it from the most recently signed up or logged in user
//         const users = JSON.parse(localStorage.getItem('users') || '[]');
//         if (users.length > 0) {
//           // Just take the last user as a fallback
//           setUsername(users[users.length - 1].username || 'User');
//         } else {
//           setUsername('User'); // Default fallback name
//         }
//       }
//     } catch (error) {
//       console.error('Error loading user data:', error);
//       setUsername('User'); // Fallback name
//     }
//   }, []);
  
//   // Get mood text based on value
//   const getMoodText = (val) => {
//     switch(val) {
//       case 1: return 'Very Bad';
//       case 2: return 'Bad';
//       case 3: return 'OK';
//       case 4: return 'Good';
//       case 5: return 'Very Good';
//       default: return 'OK';
//     }
//   };
  
//   // Mood colors for the face
//   const getMoodColor = (val) => {
//     const colors = {
//       1: '#D897A0', // Pinkish for very bad
//       2: '#D8B2C8', // Light purple for bad
//       3: '#BAA3E8', // Purple for OK
//       4: '#90C7F0', // Light blue for good
//       5: '#85E0D5', // Teal for very good
//     };
//     return colors[val] || colors[3];
//   };
  
//   // Handle drag of the slider knob
//   const handleDrag = (event) => {
//     if (!circleRef.current) return;
    
//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
    
//     // Calculate angle from center to cursor
//     const dx = event.clientX - centerX;
//     const dy = event.clientY - centerY;
//     let angle = Math.atan2(dy, dx);
    
//     // Convert to degrees for easier calculation
//     let degrees = angle * (180 / Math.PI);
    
//     // We only want the right semicircle, so constrain between -90 and 90 degrees
//     degrees = Math.max(-90, Math.min(degrees, 90));
    
//     // Map -90 to 90 degrees to mood values 1-5
//     // -90 = 1, 0 = 3, 90 = 5
//     const newMood = Math.round((degrees + 90) / 45 * 2) + 1;
    
//     setTempMood(newMood);
//   };
  
//   const handleSubmit = () => {
//     setSubmitted(true);
//     // Save mood to localStorage for this user
//     try {
//       const moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
//       moodEntries.push({
//         username: username,
//         mood: tempMood,
//         timestamp: new Date().toISOString()
//       });
//       localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
//     } catch (error) {
//       console.error('Error saving mood:', error);
//     }
    
//     setTimeout(() => {
//       setSubmitted(false);
//     }, 3000);
//   };
  
//   // Get knob position based on mood
//   const getKnobPosition = (mood) => {
//     // Map mood 1-5 to angle -90 to 90 degrees
//     const degrees = (mood - 1) / 4 * 180 - 90;
//     const radians = degrees * (Math.PI / 180);
    
//     const radius = 110; // Half of our 220px circle
    
//     // Calculate coordinates
//     const x = Math.cos(radians) * radius;
//     const y = Math.sin(radians) * radius;
    
//     return { x, y };
//   };
  
//   // Get knob coordinates for the current mood
//   const knobPosition = getKnobPosition(tempMood);
  
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//       <div className="text-center mb-6">
//         <h2 className="text-2xl font-semibold text-blue-500">
//           How are you today,<br/>
//           {username}?
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Use the slider to describe how you're feeling.
//         </p>
//       </div>
      
//       <div className="relative flex justify-center mb-8 py-4">
//         {/* Big background mood text */}
//         <div 
//           className="absolute text-9xl font-bold text-center opacity-10"
//           style={{ 
//             color: getMoodColor(tempMood),
//             zIndex: 0,
//             top: '10px'
//           }}
//         >
//           {getMoodText(tempMood)}
//         </div>
        
//         {/* Slider circle with face */}
//         <div className="relative" style={{ width: '220px', height: '220px' }}>
//           {/* Circle track */}
//           <div 
//             ref={circleRef}
//             className="absolute w-full h-full rounded-full"
//             style={{ border: '1px solid #E5E7EB' }}
//           >
//             {/* Only show right semicircle */}
//             <svg width="220" height="220" viewBox="0 0 220 220">
//               <path
//                 d="M 110 0 A 110 110 0 0 1 110 220"
//                 fill="none"
//                 stroke="#E5E7EB"
//                 strokeWidth="1"
//               />
//             </svg>
//           </div>
          
//           {/* Face */}
//           <div 
//             className="absolute top-1/2 left-1/2 w-3/4 h-3/4 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
//             style={{ 
//               background: `linear-gradient(135deg, ${getMoodColor(tempMood)}DD, ${getMoodColor(tempMood)})`,
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }}
//           >
//             {/* Eyes */}
//             <div className="relative w-full h-full">
//               <div className="absolute" style={{ top: '38%', left: '32%', width: '15px', height: '3px', backgroundColor: 'white', borderRadius: '4px' }}></div>
//               <div className="absolute" style={{ top: '38%', right: '32%', width: '15px', height: '3px', backgroundColor: 'white', borderRadius: '4px' }}></div>
              
//               {/* Mouth - changes based on mood */}
//               {tempMood <= 2 ? (
//                 <div className="absolute" style={{ 
//                   bottom: '38%', 
//                   left: '35%', 
//                   width: '30%', 
//                   height: '3px',
//                   backgroundColor: 'white',
//                   borderRadius: '4px',
//                   transform: 'rotate(-5deg)'
//                 }}></div>
//               ) : tempMood === 3 ? (
//                 <div className="absolute" style={{ 
//                   bottom: '38%', 
//                   left: '35%', 
//                   width: '30%', 
//                   height: '3px',
//                   backgroundColor: 'white',
//                   borderRadius: '4px'
//                 }}></div>
//               ) : (
//                 <div className="absolute" style={{ 
//                   bottom: '38%', 
//                   left: '35%', 
//                   width: '30%', 
//                   height: '3px',
//                   backgroundColor: 'white',
//                   borderRadius: '4px',
//                   transform: 'rotate(5deg)'
//                 }}></div>
//               )}
//             </div>
//           </div>
          
//           {/* Draggable knob */}
//           <motion.div
//             className="absolute w-7 h-7 bg-blue-500 rounded-full shadow-md cursor-pointer z-10"
//             style={{ 
//               top: `calc(50% + ${knobPosition.y}px)`, 
//               left: `calc(50% + ${knobPosition.x}px)`,
//               transform: 'translate(-50%, -50%)',
//             }}
//             drag
//             dragConstraints={circleRef}
//             dragElastic={0}
//             onDrag={handleDrag}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           />
//         </div>
//       </div>
      
//       {/* "I'm feeling ok. Submit →" section - Modified for centered button in a contained box */}
//       <div className="flex justify-center mb-4">
//         <div className="bg-gray-50 rounded-lg py-3 px-6 inline-flex flex-col items-center shadow-sm" style={{ maxWidth: '280px' }}>
//           <p className="text-blue-500 mb-2">
//             I'm feeling {getMoodText(tempMood).toLowerCase()}.
//           </p>
//           <motion.button
//             onClick={handleSubmit}
//             className="flex items-center justify-center text-blue-500 font-medium px-4 py-2 rounded-full transition-all"
//             whileHover={{ 
//               scale: 1.05, 
//               backgroundColor: 'rgba(219, 234, 254, 0.5)', 
//               boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
//             }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <span>{submitted ? 'Submitted!' : 'Submit'}</span>
//             {!submitted && (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             )}
//           </motion.button>
//         </div>
//       </div>
      
//       {/* View Check-In Summary link */}
//       <div className="text-center">
//         <a href="#" className="text-blue-500 text-sm">
//           View Check-In Summary
//         </a>
//       </div>
//     </div>
//   );
// };

// export default MoodTracker;
// src/components/home/MoodTracker.jsx - Updated with Username Fix & Backend Integration
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { moodService } from '../../services/moodService';

const MoodTracker = () => {
  const [tempMood, setTempMood] = useState(3); // Default to middle mood
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const sliderRef = useRef(null);
  const circleRef = useRef(null);
  
  // Get current user data on component mount with enhanced detection
  useEffect(() => {
    console.log('🔍 MoodTracker: Loading user data...');
    
    try {
      let realUsername = 'User';
      
      // 1. Try to get from localStorage 'user' (most recent login)
      const currentUser = localStorage.getItem('user');
      if (currentUser && currentUser !== 'null' && currentUser !== 'undefined') {
        const userData = JSON.parse(currentUser);
        console.log('🔍 Found stored user:', userData);
        
        if (userData.username && userData.username !== 'aaaaa' && userData.username !== 'User') {
          realUsername = userData.username;
          console.log('✅ Using stored username:', realUsername);
        } else if (userData.username === 'aaaaa') {
          console.log('⚠️ Detected placeholder username "aaaaa", looking for real user...');
          
          // 2. Try to find real user from users list
          const allUsers = localStorage.getItem('users');
          if (allUsers) {
            const usersList = JSON.parse(allUsers);
            const realUser = usersList.find(u => 
              u.username !== 'aaaaa' && 
              u.username !== 'ai' && 
              u.username !== 'User' &&
              u.username.length > 2
            );
            
            if (realUser) {
              realUsername = realUser.username;
              console.log('✅ Found real user from list:', realUsername);
              
              // Update stored user with real username
              const correctedUser = { ...userData, username: realUsername, email: realUser.email };
              localStorage.setItem('user', JSON.stringify(correctedUser));
              console.log('✅ Updated stored user with real username');
            }
          }
        }
      } else {
        // 3. Fallback - try currentUser or users list
        const legacyCurrentUser = localStorage.getItem('currentUser');
        if (legacyCurrentUser) {
          const userData = JSON.parse(legacyCurrentUser);
          if (userData && userData.username) {
            realUsername = userData.username;
            console.log('✅ Using legacy currentUser:', realUsername);
          }
        } else {
          // 4. Final fallback - get from users list
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          if (users.length > 0) {
            const lastUser = users[users.length - 1];
            if (lastUser.username && lastUser.username !== 'aaaaa' && lastUser.username !== 'ai') {
              realUsername = lastUser.username;
              console.log('✅ Using last user from list:', realUsername);
            }
          }
        }
      }
      
      setUsername(realUsername);
      console.log('🎯 Final username set to:', realUsername);
      
    } catch (error) {
      console.error('❌ Error loading user data:', error);
      setUsername('User');
    }
  }, []);
  
  // Get mood text based on value
  const getMoodText = (val) => {
    switch(val) {
      case 1: return 'Very Bad';
      case 2: return 'Bad';
      case 3: return 'OK';
      case 4: return 'Good';
      case 5: return 'Very Good';
      default: return 'OK';
    }
  };
  
  // Mood colors for the face
  const getMoodColor = (val) => {
    const colors = {
      1: '#D897A0', // Pinkish for very bad
      2: '#D8B2C8', // Light purple for bad
      3: '#BAA3E8', // Purple for OK
      4: '#90C7F0', // Light blue for good
      5: '#85E0D5', // Teal for very good
    };
    return colors[val] || colors[3];
  };
  
  // Handle drag of the slider knob
  const handleDrag = (event) => {
    if (!circleRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle from center to cursor
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    let angle = Math.atan2(dy, dx);
    
    // Convert to degrees for easier calculation
    let degrees = angle * (180 / Math.PI);
    
    // We only want the right semicircle, so constrain between -90 and 90 degrees
    degrees = Math.max(-90, Math.min(degrees, 90));
    
    // Map -90 to 90 degrees to mood values 1-5
    // -90 = 1, 0 = 3, 90 = 5
    const newMood = Math.round((degrees + 90) / 45 * 2) + 1;
    
    setTempMood(newMood);
  };
  
  // Enhanced submit function with backend integration
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('🎭 Submitting mood for user:', username);
      console.log('🎭 Mood level:', tempMood, '- Label:', getMoodText(tempMood));

      // Get auth token
      const token = localStorage.getItem('access_token');
      console.log('🔑 Auth token present:', !!token);

      if (token) {
        // Try backend submission first
        try {
          const moodData = {
            mood_level: tempMood,
            mood_label: getMoodText(tempMood),
            mood_emoji: tempMood === 1 ? '😢' : tempMood === 2 ? '😞' : tempMood === 3 ? '😐' : tempMood === 4 ? '😊' : '😄',
            notes: `User ${username} submitted mood: ${getMoodText(tempMood)}`
          };

          console.log('📤 Sending mood data to backend:', moodData);

          const response = await fetch('http://127.0.0.1:8000/api/health', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(moodData)
          });

          console.log('📡 Backend response status:', response.status);
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ Backend mood submission successful:', result);
          } else {
            // Get the error details from backend
            const errorData = await response.json();
            console.log('❌ Backend error details:', errorData);
            console.log('⚠️ Backend submission failed with status:', response.status);
            console.log('⚠️ Error message:', errorData.error || errorData.message || 'Unknown error');
            
            // Try different payload format if the current one fails
            if (response.status === 400) {
              console.log('🔄 Trying alternative payload format...');
              
              const alternativePayload = {
                mood: tempMood,
                mood_type: getMoodText(tempMood).toLowerCase().replace(' ', '_'),
                notes: `User ${username} mood: ${getMoodText(tempMood)}`
              };
              
              console.log('📤 Trying alternative payload:', alternativePayload);
              
              const retryResponse = await fetch('http://127.0.0.1:8000/api/mood/submit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(alternativePayload)
              });
              
              if (retryResponse.ok) {
                const retryResult = await retryResponse.json();
                console.log('✅ Alternative payload successful:', retryResult);
              } else {
                const retryError = await retryResponse.json();
                console.log('❌ Alternative payload also failed:', retryError);
              }
            }
          }
        } catch (backendError) {
          console.log('⚠️ Backend connection failed:', backendError);
        }
      }

      // Always save to localStorage as well (backup or primary)
      const moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
      const moodEntry = {
        username: username,
        mood: tempMood,
        moodText: getMoodText(tempMood),
        timestamp: new Date().toISOString(),
        submittedToBackend: !!token
      };
      
      moodEntries.push(moodEntry);
      localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
      console.log('✅ Mood saved to localStorage:', moodEntry);

      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('❌ Mood submission failed:', error);
      setError('Failed to save mood. Please try again.');
      
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get knob position based on mood
  const getKnobPosition = (mood) => {
    // Map mood 1-5 to angle -90 to 90 degrees
    const degrees = (mood - 1) / 4 * 180 - 90;
    const radians = degrees * (Math.PI / 180);
    
    const radius = 110; // Half of our 220px circle
    
    // Calculate coordinates
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    
    return { x, y };
  };
  
  // Get knob coordinates for the current mood
  const knobPosition = getKnobPosition(tempMood);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-500">
          How are you today,<br/>
          {username}?
        </h2>
        <p className="text-gray-500 mt-2">
          Use the slider to describe how you're feeling.
        </p>
      </div>
      
      <div className="relative flex justify-center mb-8 py-4">
        {/* Big background mood text */}
        <div 
          className="absolute text-9xl font-bold text-center opacity-10"
          style={{ 
            color: getMoodColor(tempMood),
            zIndex: 0,
            top: '10px'
          }}
        >
          {getMoodText(tempMood)}
        </div>
        
        {/* Slider circle with face */}
        <div className="relative" style={{ width: '220px', height: '220px' }}>
          {/* Circle track */}
          <div 
            ref={circleRef}
            className="absolute w-full h-full rounded-full"
            style={{ border: '1px solid #E5E7EB' }}
          >
            {/* Only show right semicircle */}
            <svg width="220" height="220" viewBox="0 0 220 220">
              <path
                d="M 110 0 A 110 110 0 0 1 110 220"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </svg>
          </div>
          
          {/* Face */}
          <div 
            className="absolute top-1/2 left-1/2 w-3/4 h-3/4 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              background: `linear-gradient(135deg, ${getMoodColor(tempMood)}DD, ${getMoodColor(tempMood)})`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Eyes */}
            <div className="relative w-full h-full">
              <div className="absolute" style={{ top: '38%', left: '32%', width: '15px', height: '3px', backgroundColor: 'white', borderRadius: '4px' }}></div>
              <div className="absolute" style={{ top: '38%', right: '32%', width: '15px', height: '3px', backgroundColor: 'white', borderRadius: '4px' }}></div>
              
              {/* Mouth - changes based on mood */}
              {tempMood <= 2 ? (
                <div className="absolute" style={{ 
                  bottom: '38%', 
                  left: '35%', 
                  width: '30%', 
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  transform: 'rotate(-5deg)'
                }}></div>
              ) : tempMood === 3 ? (
                <div className="absolute" style={{ 
                  bottom: '38%', 
                  left: '35%', 
                  width: '30%', 
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '4px'
                }}></div>
              ) : (
                <div className="absolute" style={{ 
                  bottom: '38%', 
                  left: '35%', 
                  width: '30%', 
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  transform: 'rotate(5deg)'
                }}></div>
              )}
            </div>
          </div>
          
          {/* Draggable knob */}
          <motion.div
            className="absolute w-7 h-7 bg-blue-500 rounded-full shadow-md cursor-pointer z-10"
            style={{ 
              top: `calc(50% + ${knobPosition.y}px)`, 
              left: `calc(50% + ${knobPosition.x}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            drag
            dragConstraints={circleRef}
            dragElastic={0}
            onDrag={handleDrag}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-center">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* "I'm feeling ok. Submit →" section - Modified for centered button in a contained box */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-50 rounded-lg py-3 px-6 inline-flex flex-col items-center shadow-sm" style={{ maxWidth: '280px' }}>
          <p className="text-blue-500 mb-2">
            I'm feeling {getMoodText(tempMood).toLowerCase()}.
          </p>
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex items-center justify-center font-medium px-4 py-2 rounded-full transition-all ${
              isSubmitting 
                ? 'text-gray-400 cursor-not-allowed' 
                : submitted
                  ? 'text-green-600'
                  : 'text-blue-500'
            }`}
            whileHover={!isSubmitting ? { 
              scale: 1.05, 
              backgroundColor: 'rgba(219, 234, 254, 0.5)', 
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
            } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            <span>
              {isSubmitting ? 'Submitting...' : submitted ? 'Submitted!' : 'Submit'}
            </span>
            {!submitted && !isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
            {isSubmitting && (
              <svg className="animate-spin h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {submitted && (
              <svg className="h-4 w-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* View Check-In Summary link */}
      <div className="text-center">
        <a href="#" className="text-blue-500 text-sm">
          View Check-In Summary
        </a>
      </div>
      
    </div>
  );
};

export default MoodTracker;