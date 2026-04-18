
// // src/Components/Home.jsx
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import MoodTracker from './home/MoodTracker';
// import Navbar from './Navbar';

// import { 
//   FaUserFriends, 
//   FaMicrophone, 
//   FaBullhorn, 
//   FaSpider, 
//   FaArrowLeft, 
//   FaBrain, 
//   FaUsers, 
//   FaRunning, 
//   FaExclamationTriangle,
//   FaHeartbeat, 
//   FaLeaf, 
//   FaLock, 
//   FaSun,
//   FaRobot, // Added for assistant section 
//   FaComments, // Added for assistant section
//   FaBookMedical,
//   FaTwitter,
//   FaLinkedinIn,
//   FaInstagram
// } from 'react-icons/fa';

// // Team member photos
// import TeamMember1 from '../assets/team/image4.jpeg';
// import TeamMember2 from '../assets/team/image2.jpeg';
// import TeamMember3 from '../assets/team/image3.jpeg';

// const Home = ({ user, onLogout }) => {
//   const navigate = useNavigate();
//   const [positions, setPositions] = useState([]);
//   const [selectedAnxietyId, setSelectedAnxietyId] = useState(null);
//   const [activeTab, setActiveTab] = useState('intro');
//   const [isGreetingAnimated, setIsGreetingAnimated] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
//   // Services data with updated light color scheme
//   const services = [
//     {
//       id: "detection",
//       title: "Instant Anxiety Detection",
//       description: "Quickly discover your anxiety level by sharing your feelings in Urdu. Our AI Assistant carefully analyzes your story and tells you whether you are feeling Normal, Mild, Moderate, Severe, or Panic-level anxiety — all in seconds.",
//       icon: FaBrain,
//       color: "#4C9EEB", // Soft Blue
//       gradientClass: "from-blue-300 to-blue-400"
//     },
//     {
//       id: "support",
//       title: "Emotional Support and Encouragement",
//       description: "You are not alone — we are here to listen with kindness. Our AI creates a safe, non-judgmental space where you can express yourself freely. We offer gentle encouragement to help you open your heart without fear.",
//       icon: FaHeartbeat,
//       color: "#FF8A80", // Calm Coral
//       gradientClass: "from-red-200 to-red-300"
//     },
//     {
//       id: "tips",
//       title: "Personalized Mental Health Tips",
//       description: "Simple tips for a calmer, stronger you. Based on your anxiety level, you'll receive easy and practical recommendations to relax your mind, manage emotions, and feel better every day.",
//       icon: FaLeaf,
//       color: "#A3D9A5", // Soft Green
//       gradientClass: "from-green-200 to-green-300"
//     },
//     {
//       id: "privacy",
//       title: "Complete Privacy and Confidentiality",
//       description: "Your story is yours alone — and it stays that way. We deeply respect your privacy. Your personal information and emotions are securely protected and never shared with anyone.",
//       icon: FaLock,
//       color: "#B6E2D3", // Light Mint/Green
//       gradientClass: "from-teal-200 to-teal-300"
//     },
//     {
//       id: "growth",
//       title: "Self-Awareness and Growth",
//       description: "Take your first step toward emotional wellness. By checking your emotions regularly, you can understand yourself better, build inner strength, and take positive steps for a healthier, happier life.",
//       icon: FaSun,
//       color: "#FFE6CC", // Warm Peach
//       gradientClass: "from-orange-200 to-orange-300"
//     }
//   ];
  
//   // Updated anxiety types with more relevant icons - keeping original colors
//   const anxietyTypes = [
//     {
//       id: "general",
//       name: "General Worry",
//       color: "#d8b5ff", // Light purple
//       textClass: "text-white",
//       icon: FaBrain, // Brain icon for general worry/anxiety
//       backgroundImage: "url('https://images.unsplash.com/photo-1557682250-38b1f5243ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVycGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60')",
//       description: 'Persistent worry and tension that interferes with daily activities.',
//       intro: 'General Anxiety Disorder (GAD) is characterized by persistent and excessive worry about a variety of different things. People with GAD may anticipate disaster and may be overly concerned about money, health, family, work, or other issues.',
//       signs: [
//         'Persistent worrying or anxiety about a number of areas that are out of proportion to the impact of the events',
//         'Overthinking plans and solutions to all possible worst-case outcomes',
//         'Perceiving situations and events as threatening, even when they aren\'t',
//         'Difficulty handling uncertainty',
//         'Indecisiveness and fear of making the wrong decision',
//         'Inability to set aside or let go of a worry'
//       ]
//     },
//     {
//       id: "social",
//       name: "Social Anxiety",
//       color: "#7eecd2", // Mint green
//       textClass: "text-white",
//       icon: FaUsers, // Users/group icon for social anxiety
//       backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
//       description: 'Fear of social situations and interactions with other people.',
//       intro: 'Most people get anxious in some social situations, like before a job interview or when giving a speech. However, some people get overly anxious in social situations. They tend to worry about doing something embarrassing or that others will think badly of them. They also tend to avoid social situations or endure them with great distress. Social anxiety becomes problematic when it interferes with daily life.',
//       signs: [
//         'Worrying about embarrassing yourself in social situations',
//         'Fear of being judged negatively by others',
//         'Avoiding social gatherings or staying quiet in groups',
//         'Physical symptoms like blushing, sweating, or trembling in social settings',
//         'Difficulty making or keeping friends',
//         'Intense anxiety when meeting new people'
//       ]
//     },
//     {
//       id: "agoraphobia",
//       name: "Agoraphobia",
//       color: "#ffafcc", // Pink
//       textClass: "text-white",
//       icon: FaRunning, // Running icon representing escape/avoidance
//       backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlua3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
//       description: 'Fear of places or situations that might cause panic, helplessness, or embarrassment.',
//       intro: 'Agoraphobia is the fear of being in situations where escape might be difficult or help wouldn\'t be available if things go wrong. People with agoraphobia often avoid public places, open spaces, or situations that might trigger panic attacks.',
//       signs: [
//         'Fear of leaving home alone',
//         'Fear of crowds or waiting in line',
//         'Fear of enclosed spaces like movie theaters or elevators',
//         'Fear of open spaces like bridges or parking lots',
//         'Fear of using public transportation',
//         'These situations almost always cause anxiety or panic attacks'
//       ]
//     },
//     {
//       id: "phobia",
//       name: "Phobia",
//       color: "#ff8fab", // Darker pink
//       textClass: "text-white",
//       icon: FaExclamationTriangle, // Warning/exclamation icon for phobias
//       backgroundImage: "url('https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')",
//       description: 'Intense fear of a specific object or situation.',
//       intro: 'A phobia is an intense fear of specific objects or situations. Phobias are irrational fears that can interfere with daily activities and cause significant distress.',
//       signs: [
//         'Immediate intense fear when exposed to the object of fear',
//         'Avoidance behaviors to prevent encountering the feared object or situation',
//         'Physical symptoms like racing heart, trouble breathing, or dizziness',
//         'Recognition that the fear is excessive or unreasonable',
//         'Anxiety that builds as a feared situation approaches',
//         'Disruption to normal activities due to avoidance behaviors'
//       ]
//     }
//   ];
  
//   // Team members data with lighter colors
//   const teamMembers = [
//     {
//       name: "Dr. Ayesha Khan",
//       role: "Clinical Psychologist",
//       subtitle: "Presentations are communication",
//       photo: TeamMember1,
//       color: "#6DA3E4" // Lighter blue
//     },
//     {
//       name: "Dr. Imran Ahmed",
//       role: "Psychiatrist",
//       subtitle: "Presentations are communication",
//       photo: TeamMember2,
//       color: "#4DD0BA" // Lighter teal
//     },
//     {
//       name: "Sarah Malik",
//       role: "Mental Health Counselor",
//       subtitle: "Presentations are communication",
//       photo: TeamMember3,
//       color: "#E66F9F" // Lighter pink
//     }
//   ];

//   // Handle anxiety card click to navigate to detail page
//   const handleCardClick = (anxietyId) => {
//     // Use navigate to go to the anxiety detail page
//     navigate(`/anxiety/${anxietyId}`);
//   };
  
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.2
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 100
//       }
//     }
//   };

//   // Handle window resize
//   const handleResize = () => {
//     setWindowWidth(window.innerWidth);
//     setHorizontalPositions();
//   };

//   // Function to set horizontal positions
//   const setHorizontalPositions = () => {
//     // Calculate initial positions to spread cards horizontally
//     // This creates an array of x-position offsets to make the cards move horizontally
//     const totalWidth = window.innerWidth * 0.7; // Use 70% of the window width
//     const cardSpacing = totalWidth / (anxietyTypes.length + 1);
    
//     const newPositions = anxietyTypes.map((_, index) => {
//       const baseX = cardSpacing * (index + 1) - (totalWidth / 2); // Center the group
//       return {
//         x: baseX,
//         y: Math.random() * 16 - 8, // Small vertical variation (-8 to +8)
//         rotate: Math.random() * 6 - 3 // Slight rotation (-3 to +3 degrees)
//       };
//     });
    
//     setPositions(newPositions);
//   };
  
//   // Function to animate horizontal movement with slight variation
//   const animateHorizontalMovement = () => {
//     setPositions(prevPositions => 
//       prevPositions.map(pos => ({
//         x: pos.x, // Keep x position stable
//         y: pos.y + (Math.random() * 10 - 5), // Move slightly up and down
//         rotate: pos.rotate + (Math.random() * 4 - 2) // Slight rotation change
//       }))
//     );
//   };
  
//   // Navigate to the assistant page
//   const goToAssistant = () => {
//     navigate('/assistant');
//   };
  
//   // Set up initial positions and movement intervals
//   useEffect(() => {
//     // Set horizontal positions
//     setHorizontalPositions();
    
//     // Handle window resize
//     window.addEventListener('resize', handleResize);
    
//     // Set movement interval (just for the slight vertical bounce)
//     const movementInterval = setInterval(() => {
//       animateHorizontalMovement();
//     }, 4000); // Move every 4 seconds
    
//     return () => {
//       clearInterval(movementInterval);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-violet-50 to-blue-50 pb-20">
//       {/* Header with Logout - Responsive */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap sm:flex-nowrap justify-between items-center">
//           <div className="flex items-center">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
//               AM
//             </div>
//             <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-semibold text-gray-800">Anxiety Manager</h1>
//           </div>
//           <button
//             onClick={onLogout}
//             className="text-gray-600 hover:text-gray-900 flex items-center text-xs sm:text-sm font-medium mt-2 sm:mt-0"
//           >
//             <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//             </svg>
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         {/* Mood Tracker (keeping original component) */}
//         <motion.section 
//           className="mb-8 sm:mb-12"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants}>
//             <MoodTracker username={user.username} />
//           </motion.div>
//         </motion.section>
        
//         {/* AI Assistant Quick Access Section - Enhanced for Mobile */}
//         <motion.section 
//           className="mb-8 sm:mb-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl shadow-lg overflow-hidden"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           whileHover={{ y: -5, transition: { duration: 0.2 } }}
//           onClick={goToAssistant}
//         >
//           <div className="p-4 sm:p-6 text-white flex items-center cursor-pointer">
//             <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-full mr-3 sm:mr-5 flex-shrink-0">
//               <FaRobot className="text-2xl sm:text-3xl" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-lg sm:text-xl font-bold mb-0 sm:mb-1 truncate">Talk to Your Anxiety Assistant</h3>
//               <p className="opacity-90 text-sm sm:text-base">Share your feelings in Urdu and receive personalized support</p>
//             </div>
//             <div className="text-2xl sm:text-3xl ml-2 sm:ml-0 flex-shrink-0">
//               <FaComments />
//             </div>
//           </div>
//           <div className="bg-indigo-600 p-2 sm:p-3 text-center text-white text-xs sm:text-sm font-medium">
//             Tap to start a conversation in Urdu
//           </div>
//         </motion.section>
        
//         {/* Anxiety Cards Section - Enhanced Responsive Design */}
//         <section className="mb-12 sm:mb-20">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-blue-500">My Anxiety</h2>
//               <p className="text-gray-500 mt-1 text-sm sm:text-base">What are you experiencing?</p>
//             </div>
//             <a href="#" className="text-blue-500 text-base sm:text-lg mt-2 md:mt-0">Learn More</a>
//           </div>
          
//           {/* Container for horizontally arranged cards - Only on larger screens */}
//           <div className="relative h-64 sm:h-72 mx-auto overflow-visible hidden md:block">
//             {anxietyTypes.map((anxiety, index) => (
//               <motion.div 
//                 key={`desktop-${anxiety.id}`}
//                 className="absolute cursor-pointer"
//                 style={{
//                   left: '50%',
//                   top: '50%',
//                 }}
//                 animate={{
//                   x: positions[index]?.x || 0,
//                   y: positions[index]?.y || 0,
//                   rotate: positions[index]?.rotate || 0,
//                   transition: { duration: 2, ease: "easeInOut" }
//                 }}
//                 whileHover={{ 
//                   scale: 1.1,
//                   zIndex: 50,
//                   y: -10,
//                   transition: { duration: 0.3 }
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleCardClick(anxiety.id)}
//               >
//                 <div 
//                   className="w-32 h-32 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center relative overflow-hidden transform -translate-x-1/2 -translate-y-1/2"
//                 >
//                   {/* Background image layer */}
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center" 
//                     style={{ backgroundImage: anxiety.backgroundImage }}
//                   ></div>
                  
//                   {/* Colored overlay */}
//                   <div 
//                     className="absolute inset-0 opacity-70" 
//                     style={{ backgroundColor: anxiety.color }}
//                   ></div>
                  
//                   {/* Content layer */}
//                   <div className="relative z-10 flex flex-col items-center">
//                     <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl text-white">
//                       <anxiety.icon />
//                     </div>
//                     <p className={`${anxiety.textClass} font-semibold text-center text-base sm:text-lg`}>{anxiety.name}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
          
//           {/* Mobile and tablet responsive grid layout for anxiety cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:hidden">
//             {anxietyTypes.map((anxiety) => (
//               <motion.div
//                 key={`mobile-${anxiety.id}`}
//                 className="cursor-pointer"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleCardClick(anxiety.id)}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div 
//                   className="h-24 sm:h-32 rounded-xl flex items-center justify-center relative overflow-hidden"
//                 >
//                   {/* Background image layer */}
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center" 
//                     style={{ backgroundImage: anxiety.backgroundImage }}
//                   ></div>
                  
//                   {/* Colored overlay */}
//                   <div 
//                     className="absolute inset-0 opacity-70" 
//                     style={{ backgroundColor: anxiety.color }}
//                   ></div>
                  
//                   {/* Content layer */}
//                   <div className="relative z-10 flex flex-col items-center p-3 sm:p-4">
//                     <div className="mb-1 sm:mb-2 text-xl sm:text-3xl text-white">
//                       <anxiety.icon />
//                     </div>
//                     <p className={`${anxiety.textClass} font-semibold text-center text-sm sm:text-lg`}>{anxiety.name}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
        
//         {/* UPDATED Our Services Section - hover only for card flip */}
//         <motion.section 
//           className="mb-12 sm:mb-16"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.5 }}
//         >
//           <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">Our Services</h2>
//           <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base px-2">
//             Specially designed support for South Asian users who speak Urdu with 100% privacy
//           </p>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={service.id}
//                 className="h-56 sm:h-64 cursor-pointer perspective-1000"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
//                 onMouseEnter={() => setHoveredCard(service.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div 
//                   className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${hoveredCard === service.id ? 'rotate-y-180' : ''}`}
//                 >
//                   {/* Front of card */}
//                   <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md overflow-hidden">
//                     <div 
//                       className={`h-full flex flex-col items-center justify-center bg-gradient-to-br ${service.gradientClass} p-4 sm:p-6 text-center`}
//                       style={{ backgroundColor: service.color }}
//                     >
//                       <service.icon className="text-4xl sm:text-5xl text-gray-700 mb-3 sm:mb-4" />
//                       <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-2">{service.title}</h3>
//                       <p className="text-gray-600 text-xs sm:text-sm opacity-80">Hover to learn more</p>
//                     </div>
//                   </div>
                  
//                   {/* Back of card */}
//                   <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md overflow-hidden rotate-y-180">
//                     <div className="h-full p-4 sm:p-6 flex flex-col justify-between">
//                       <div>
//                         <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">{service.title}</h3>
//                         <p className="text-gray-600 text-xs sm:text-sm">{service.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
          
//           <div className="mt-8 sm:mt-10 bg-white rounded-xl overflow-hidden shadow-md p-4 sm:p-6">
//             <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">✨ Why Choose Us?</h3>
//             <ul className="space-y-2">
//               <li className="flex items-start">
//                 <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span className="text-gray-700 text-sm sm:text-base">Specially designed for South Asian users who speak Urdu</span>
//               </li>
//               <li className="flex items-start">
//                 <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span className="text-gray-700 text-sm sm:text-base">Friendly AI Assistant — no fear, no shame, only support</span>
//               </li>
//               <li className="flex items-start">
//                 <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span className="text-gray-700 text-sm sm:text-base">Instant emotional insights — no long forms or waiting</span>
//               </li>
//               <li className="flex items-start">
//                 <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span className="text-gray-700 text-sm sm:text-base">100% private, confidential, and easy to use</span>
//               </li>
//               <li className="flex items-start">
//                 <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span className="text-gray-700 text-sm sm:text-base">A safe space to begin your mental health journey</span>
//               </li>
//             </ul>
//           </div>
//         </motion.section>
        
//         {/* COMPLETELY REDESIGNED Team Section - Fully Responsive */}
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">Our Team</h2>
// <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto text-sm sm:text-base px-2">
//   Our team of dedicated mental health professionals is committed to providing compassionate support and guidance for your anxiety management journey. With expertise in psychology and cultural sensitivity, we're here to help you thrive.
// </p>

// <section className="py-8 sm:py-12 bg-gray-100 mb-0"> {/* Changed to mb-0 to explicitly remove bottom margin */}
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8 w-full">
//       {teamMembers.map((member, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 + (index * 0.2), duration: 0.5 }}
//           whileHover={{ y: -5, transition: { duration: 0.2 } }}
//           className="relative flex flex-col items-center pt-10 sm:pt-14"
//         >
//           {/* Photo positioned above the card with more space */}
//           <div className="absolute -top-6 sm:-top-10 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gray-100 p-1.5 sm:p-2 z-10">
//             <img 
//               src={member.photo} 
//               alt={member.name} 
//               className="w-full h-full rounded-full object-cover" 
//             />
//           </div>
          
//           {/* Card background */}
//           <div 
//             className="w-full rounded-lg shadow-md overflow-hidden flex flex-col items-center pt-10 sm:pt-12 pb-6 sm:pb-8" 
//             style={{ backgroundColor: member.color }}
//           >
//             {/* Content inside card */}
//             <div className="w-full text-center px-4 sm:px-6 text-white mt-2 sm:mt-4">
//               <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-1 sm:mb-2">{member.name}</h3>
//               <p className="text-white text-opacity-90 text-xs sm:text-sm">
//                 {member.subtitle}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>

// {/* Adjust the main closing tag to have 0 bottom padding if needed */}
// </main>
      
//       {/* Navigation Bar */}
//       <Navbar />
//     </div>
//   );
// };

// export default Home;
// src/Components/Home.jsx - Updated with User Data Fix
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MoodTracker from './home/MoodTracker';
import Navbar from './Navbar';

import { 
  FaUserFriends, 
  FaMicrophone, 
  FaBullhorn, 
  FaSpider, 
  FaArrowLeft, 
  FaBrain, 
  FaUsers, 
  FaRunning, 
  FaExclamationTriangle,
  FaHeartbeat, 
  FaLeaf, 
  FaLock, 
  FaSun,
  FaRobot, // Added for assistant section 
  FaComments, // Added for assistant section
  FaBookMedical,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa';

// Team member photos
import TeamMember1 from '../assets/team/image4.jpeg';
import TeamMember2 from '../assets/team/image2.jpeg';
import TeamMember3 from '../assets/team/image3.jpeg';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [selectedAnxietyId, setSelectedAnxietyId] = useState(null);
  const [activeTab, setActiveTab] = useState('intro');
  const [isGreetingAnimated, setIsGreetingAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [actualUser, setActualUser] = useState(user);
  
  // Get the actual logged-in user data with enhanced debugging and correction
  useEffect(() => {
    console.log('🔍 Home component - checking user data...');
    console.log('🔍 Passed user prop:', user);
    
    try {
      // Check localStorage first
      const storedUser = localStorage.getItem('user');
      console.log('🔍 Raw stored user string:', storedUser);
      
      if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        const userData = JSON.parse(storedUser);
        console.log('🔍 Parsed stored user data:', userData);
        
        // Check if username is "aaaaa" or similar placeholder
        if (userData && userData.username) {
          // If username is "aaaaa" or similar, try to get the real username
          if (userData.username === 'aaaaa' || userData.username.toLowerCase().includes('aaaa')) {
            console.log('⚠️ Detected placeholder username, checking for real user...');
            
            // Try to get the real username from recent localStorage users
            const allUsers = localStorage.getItem('users');
            if (allUsers) {
              const usersList = JSON.parse(allUsers);
              console.log('🔍 All users in localStorage:', usersList);
              
              // Find the most recent real user (not aaaaa)
              const realUser = usersList.find(u => 
                u.username !== 'aaaaa' && 
                u.username !== 'ai' && 
                u.username.length > 2 &&
                !u.username.toLowerCase().includes('aaaa')
              );
              
              if (realUser) {
                console.log('✅ Found real user:', realUser.username);
                const correctedUser = { ...userData, username: realUser.username, email: realUser.email };
                setActualUser(correctedUser);
                // Update localStorage with correct user
                localStorage.setItem('user', JSON.stringify(correctedUser));
                return;
              }
            }
            
            // If no real user found, try to extract from email
            if (userData.email && userData.email !== 'aaaaa@gmail.com') {
              const emailUsername = userData.email.split('@')[0];
              if (emailUsername && emailUsername !== 'aaaaa') {
                console.log('✅ Using email-based username:', emailUsername);
                const correctedUser = { ...userData, username: emailUsername };
                setActualUser(correctedUser);
                localStorage.setItem('user', JSON.stringify(correctedUser));
                return;
              }
            }
          }
          
          // Use the username as is if it's valid
          if (userData.username.trim() !== '' && userData.username !== 'User') {
            console.log('✅ Using stored user:', userData.username);
            setActualUser(userData);
            return;
          }
        }
      }
      
      // Fallback to prop user
      if (user && user.username && user.username.trim() !== '') {
        console.log('✅ Using prop user:', user.username);
        setActualUser(user);
        return;
      }
      
      // Final fallback
      console.log('❌ No valid user data found, using fallback');
      setActualUser({ username: 'User', email: '', id: null });
      
    } catch (error) {
      console.error('❌ Error getting user data:', error);
      setActualUser(user || { username: 'User', email: '', id: null });
    }
  }, [user]);
  
  // Services data with updated light color scheme
  const services = [
    {
      id: "detection",
      title: "Instant Anxiety Detection",
      description: "Quickly discover your anxiety level by sharing your feelings in Urdu. Our AI Assistant carefully analyzes your story and tells you whether you are feeling Normal, Mild, Moderate, Severe, or Panic-level anxiety — all in seconds.",
      icon: FaBrain,
      color: "#4C9EEB", // Soft Blue
      gradientClass: "from-blue-300 to-blue-400"
    },
    {
      id: "support",
      title: "Emotional Support and Encouragement",
      description: "You are not alone — we are here to listen with kindness. Our AI creates a safe, non-judgmental space where you can express yourself freely. We offer gentle encouragement to help you open your heart without fear.",
      icon: FaHeartbeat,
      color: "#FF8A80", // Calm Coral
      gradientClass: "from-red-200 to-red-300"
    },
    {
      id: "tips",
      title: "Personalized Mental Health Tips",
      description: "Simple tips for a calmer, stronger you. Based on your anxiety level, you'll receive easy and practical recommendations to relax your mind, manage emotions, and feel better every day.",
      icon: FaLeaf,
      color: "#A3D9A5", // Soft Green
      gradientClass: "from-green-200 to-green-300"
    },
    {
      id: "privacy",
      title: "Complete Privacy and Confidentiality",
      description: "Your story is yours alone — and it stays that way. We deeply respect your privacy. Your personal information and emotions are securely protected and never shared with anyone.",
      icon: FaLock,
      color: "#B6E2D3", // Light Mint/Green
      gradientClass: "from-teal-200 to-teal-300"
    },
    {
      id: "growth",
      title: "Self-Awareness and Growth",
      description: "Take your first step toward emotional wellness. By checking your emotions regularly, you can understand yourself better, build inner strength, and take positive steps for a healthier, happier life.",
      icon: FaSun,
      color: "#FFE6CC", // Warm Peach
      gradientClass: "from-orange-200 to-orange-300"
    }
  ];
  
  // Updated anxiety types with more relevant icons - keeping original colors
  const anxietyTypes = [
    {
      id: "general",
      name: "General Worry",
      color: "#d8b5ff", // Light purple
      textClass: "text-white",
      icon: FaBrain, // Brain icon for general worry/anxiety
      backgroundImage: "url('https://images.unsplash.com/photo-1557682250-38b1f5243ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVycGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60')",
      description: 'Persistent worry and tension that interferes with daily activities.',
      intro: 'General Anxiety Disorder (GAD) is characterized by persistent and excessive worry about a variety of different things. People with GAD may anticipate disaster and may be overly concerned about money, health, family, work, or other issues.',
      signs: [
        'Persistent worrying or anxiety about a number of areas that are out of proportion to the impact of the events',
        'Overthinking plans and solutions to all possible worst-case outcomes',
        'Perceiving situations and events as threatening, even when they aren\'t',
        'Difficulty handling uncertainty',
        'Indecisiveness and fear of making the wrong decision',
        'Inability to set aside or let go of a worry'
      ]
    },
    {
      id: "social",
      name: "Social Anxiety",
      color: "#7eecd2", // Mint green
      textClass: "text-white",
      icon: FaUsers, // Users/group icon for social anxiety
      backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
      description: 'Fear of social situations and interactions with other people.',
      intro: 'Most people get anxious in some social situations, like before a job interview or when giving a speech. However, some people get overly anxious in social situations. They tend to worry about doing something embarrassing or that others will think badly of them. They also tend to avoid social situations or endure them with great distress. Social anxiety becomes problematic when it interferes with daily life.',
      signs: [
        'Worrying about embarrassing yourself in social situations',
        'Fear of being judged negatively by others',
        'Avoiding social gatherings or staying quiet in groups',
        'Physical symptoms like blushing, sweating, or trembling in social settings',
        'Difficulty making or keeping friends',
        'Intense anxiety when meeting new people'
      ]
    },
    {
      id: "agoraphobia",
      name: "Agoraphobia",
      color: "#ffafcc", // Pink
      textClass: "text-white",
      icon: FaRunning, // Running icon representing escape/avoidance
      backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlua3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
      description: 'Fear of places or situations that might cause panic, helplessness, or embarrassment.',
      intro: 'Agoraphobia is the fear of being in situations where escape might be difficult or help wouldn\'t be available if things go wrong. People with agoraphobia often avoid public places, open spaces, or situations that might trigger panic attacks.',
      signs: [
        'Fear of leaving home alone',
        'Fear of crowds or waiting in line',
        'Fear of enclosed spaces like movie theaters or elevators',
        'Fear of open spaces like bridges or parking lots',
        'Fear of using public transportation',
        'These situations almost always cause anxiety or panic attacks'
      ]
    },
    {
      id: "phobia",
      name: "Phobia",
      color: "#ff8fab", // Darker pink
      textClass: "text-white",
      icon: FaExclamationTriangle, // Warning/exclamation icon for phobias
      backgroundImage: "url('https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')",
      description: 'Intense fear of a specific object or situation.',
      intro: 'A phobia is an intense fear of specific objects or situations. Phobias are irrational fears that can interfere with daily activities and cause significant distress.',
      signs: [
        'Immediate intense fear when exposed to the object of fear',
        'Avoidance behaviors to prevent encountering the feared object or situation',
        'Physical symptoms like racing heart, trouble breathing, or dizziness',
        'Recognition that the fear is excessive or unreasonable',
        'Anxiety that builds as a feared situation approaches',
        'Disruption to normal activities due to avoidance behaviors'
      ]
    }
  ];
  
  // Team members data with lighter colors
  const teamMembers = [
    {
      name: "Dr. Ayesha Khan",
      role: "Clinical Psychologist",
      subtitle: "Presentations are communication",
      photo: TeamMember1,
      color: "#6DA3E4" // Lighter blue
    },
    {
      name: "Dr. Imran Ahmed",
      role: "Psychiatrist",
      subtitle: "Presentations are communication",
      photo: TeamMember2,
      color: "#4DD0BA" // Lighter teal
    },
    {
      name: "Sarah Malik",
      role: "Mental Health Counselor",
      subtitle: "Presentations are communication",
      photo: TeamMember3,
      color: "#E66F9F" // Lighter pink
    }
  ];

  // Handle anxiety card click to navigate to detail page
  const handleCardClick = (anxietyId) => {
    // Use navigate to go to the anxiety detail page
    navigate(`/anxiety/${anxietyId}`);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100
      }
    }
  };

  // Handle window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setHorizontalPositions();
  };

  // Function to set horizontal positions
  const setHorizontalPositions = () => {
    // Calculate initial positions to spread cards horizontally
    // This creates an array of x-position offsets to make the cards move horizontally
    const totalWidth = window.innerWidth * 0.7; // Use 70% of the window width
    const cardSpacing = totalWidth / (anxietyTypes.length + 1);
    
    const newPositions = anxietyTypes.map((_, index) => {
      const baseX = cardSpacing * (index + 1) - (totalWidth / 2); // Center the group
      return {
        x: baseX,
        y: Math.random() * 16 - 8, // Small vertical variation (-8 to +8)
        rotate: Math.random() * 6 - 3 // Slight rotation (-3 to +3 degrees)
      };
    });
    
    setPositions(newPositions);
  };
  
  // Function to animate horizontal movement with slight variation
  const animateHorizontalMovement = () => {
    setPositions(prevPositions => 
      prevPositions.map(pos => ({
        x: pos.x, // Keep x position stable
        y: pos.y + (Math.random() * 10 - 5), // Move slightly up and down
        rotate: pos.rotate + (Math.random() * 4 - 2) // Slight rotation change
      }))
    );
  };
  
  // Navigate to the assistant page
  const goToAssistant = () => {
    navigate('/assistant');
  };
  
  // Set up initial positions and movement intervals
  useEffect(() => {
    // Set horizontal positions
    setHorizontalPositions();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Set movement interval (just for the slight vertical bounce)
    const movementInterval = setInterval(() => {
      animateHorizontalMovement();
    }, 4000); // Move every 4 seconds
    
    return () => {
      clearInterval(movementInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-blue-50 pb-20">
      {/* Header with Logout - Enhanced user display */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap sm:flex-nowrap justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
              {actualUser?.username && actualUser.username !== 'User' && actualUser.username !== 'Guest' 
                ? actualUser.username.charAt(0).toUpperCase() 
                : '?'}
            </div>
            <div className="ml-2 sm:ml-3">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Anxiety Manager</h1>
              <p className="text-xs text-gray-600">
                Welcome, {actualUser?.username && actualUser.username !== 'User' && actualUser.username !== 'Guest' 
                  ? actualUser.username 
                  : 'Loading...'}
              </p>
            </div>
          </div>
          
          {/* Debug info for troubleshooting */}
          <div className="text-xs text-gray-400 mr-4 hidden sm:block">
            Debug: {actualUser?.username || 'No username'}
          </div>
          
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-900 flex items-center text-xs sm:text-sm font-medium mt-2 sm:mt-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mood Tracker with enhanced username handling */}
        <motion.section 
          className="mb-8 sm:mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <MoodTracker 
              username={actualUser?.username && actualUser.username !== 'User' && actualUser.username !== 'Guest' 
                ? actualUser.username 
                : 'User'} 
            />
          </motion.div>
        </motion.section>
        
        {/* AI Assistant Quick Access Section - Enhanced for Mobile */}
        <motion.section 
          className="mb-8 sm:mb-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={goToAssistant}
        >
          <div className="p-4 sm:p-6 text-white flex items-center cursor-pointer">
            <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-full mr-3 sm:mr-5 flex-shrink-0">
              <FaRobot className="text-2xl sm:text-3xl" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold mb-0 sm:mb-1 truncate">Talk to Your Anxiety Assistant</h3>
              <p className="opacity-90 text-sm sm:text-base">Share your feelings in Urdu and receive personalized support</p>
            </div>
            <div className="text-2xl sm:text-3xl ml-2 sm:ml-0 flex-shrink-0">
              <FaComments />
            </div>
          </div>
          <div className="bg-indigo-600 p-2 sm:p-3 text-center text-white text-xs sm:text-sm font-medium">
            Tap to start a conversation in Urdu
          </div>
        </motion.section>
        
        {/* Anxiety Cards Section - Enhanced Responsive Design */}
        <section className="mb-12 sm:mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-500">My Anxiety</h2>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">What are you experiencing?</p>
            </div>
            <a href="#" className="text-blue-500 text-base sm:text-lg mt-2 md:mt-0">Learn More</a>
          </div>
          
          {/* Container for horizontally arranged cards - Only on larger screens */}
          <div className="relative h-64 sm:h-72 mx-auto overflow-visible hidden md:block">
            {anxietyTypes.map((anxiety, index) => (
              <motion.div 
                key={`desktop-${anxiety.id}`}
                className="absolute cursor-pointer"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: positions[index]?.x || 0,
                  y: positions[index]?.y || 0,
                  rotate: positions[index]?.rotate || 0,
                  transition: { duration: 2, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.1,
                  zIndex: 50,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(anxiety.id)}
              >
                <div 
                  className="w-32 h-32 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center relative overflow-hidden transform -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Background image layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: anxiety.backgroundImage }}
                  ></div>
                  
                  {/* Colored overlay */}
                  <div 
                    className="absolute inset-0 opacity-70" 
                    style={{ backgroundColor: anxiety.color }}
                  ></div>
                  
                  {/* Content layer */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl text-white">
                      <anxiety.icon />
                    </div>
                    <p className={`${anxiety.textClass} font-semibold text-center text-base sm:text-lg`}>{anxiety.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile and tablet responsive grid layout for anxiety cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:hidden">
            {anxietyTypes.map((anxiety) => (
              <motion.div
                key={`mobile-${anxiety.id}`}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(anxiety.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="h-24 sm:h-32 rounded-xl flex items-center justify-center relative overflow-hidden"
                >
                  {/* Background image layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: anxiety.backgroundImage }}
                  ></div>
                  
                  {/* Colored overlay */}
                  <div 
                    className="absolute inset-0 opacity-70" 
                    style={{ backgroundColor: anxiety.color }}
                  ></div>
                  
                  {/* Content layer */}
                  <div className="relative z-10 flex flex-col items-center p-3 sm:p-4">
                    <div className="mb-1 sm:mb-2 text-xl sm:text-3xl text-white">
                      <anxiety.icon />
                    </div>
                    <p className={`${anxiety.textClass} font-semibold text-center text-sm sm:text-lg`}>{anxiety.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* UPDATED Our Services Section - hover only for card flip */}
        <motion.section 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">Our Services</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base px-2">
            Specially designed support for South Asian users who speak Urdu with 100% privacy
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="h-56 sm:h-64 cursor-pointer perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${hoveredCard === service.id ? 'rotate-y-180' : ''}`}
                >
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md overflow-hidden">
                    <div 
                      className={`h-full flex flex-col items-center justify-center bg-gradient-to-br ${service.gradientClass} p-4 sm:p-6 text-center`}
                      style={{ backgroundColor: service.color }}
                    >
                      <service.icon className="text-4xl sm:text-5xl text-gray-700 mb-3 sm:mb-4" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm opacity-80">Hover to learn more</p>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md overflow-hidden rotate-y-180">
                    <div className="h-full p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">{service.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-10 bg-white rounded-xl overflow-hidden shadow-md p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">✨ Why Choose Us?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Specially designed for South Asian users who speak Urdu</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Friendly AI Assistant — no fear, no shame, only support</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Instant emotional insights — no long forms or waiting</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">100% private, confidential, and easy to use</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">A safe space to begin your mental health journey</span>
              </li>
            </ul>
          </div>
        </motion.section>
        
        {/* COMPLETELY REDESIGNED Team Section - Fully Responsive */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">Our Team</h2>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto text-sm sm:text-base px-2">
          Our team of dedicated mental health professionals is committed to providing compassionate support and guidance for your anxiety management journey. With expertise in psychology and cultural sensitivity, we're here to help you thrive.
        </p>

        <section className="py-8 sm:py-12 bg-gray-100 mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8 w-full">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.2), duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative flex flex-col items-center pt-10 sm:pt-14"
                >
                  {/* Photo positioned above the card with more space */}
                  <div className="absolute -top-6 sm:-top-10 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gray-100 p-1.5 sm:p-2 z-10">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                  
                  {/* Card background */}
                  <div 
                    className="w-full rounded-lg shadow-md overflow-hidden flex flex-col items-center pt-10 sm:pt-12 pb-6 sm:pb-8" 
                    style={{ backgroundColor: member.color }}
                  >
                    {/* Content inside card */}
                    <div className="w-full text-center px-4 sm:px-6 text-white mt-2 sm:mt-4">
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-1 sm:mb-2">{member.name}</h3>
                      <p className="text-white text-opacity-90 text-xs sm:text-sm">
                        {member.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Navigation Bar */}
      <Navbar />
    </div>
  );
};

export default Home;