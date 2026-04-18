// // src/Components/home/AnxietyAssistantMobile.jsx - Updated with Backend Integration
// import { useState, useEffect, useRef } from 'react';
// import { FaLock, FaInfoCircle, FaPaperPlane, FaTimes, FaCog } from 'react-icons/fa';
// import { aiService } from '../../services/aiService';

// const AnxietyAssistantMobile = ({ username }) => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isUrdu, setIsUrdu] = useState(true);
//   const [showPrivacyPopup, setShowPrivacyPopup] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [useBackend, setUseBackend] = useState(true);
//   const [error, setError] = useState('');
//   const messagesEndRef = useRef(null);

//   // Pre-defined responses in Urdu (fallback)
//   const responses = [
//     'آپ کی بات سمجھ آئی۔ میں آپ کی مدد کرنے کی کوشش کروں گا۔',
//     'آپ کیسا محسوس کر رہے ہیں؟ اپنے احساسات کے بارے میں مزید بتائیں۔',
//     'مجھے افسوس ہے کہ آپ اس مشکل سے گزر رہے ہیں۔ میں آپ کے ساتھ ہوں۔',
//     'آپ کو شاید کچھ آرام کی ضرورت ہے۔ کیا آپ نے آج کوئی آرام دہ سرگرمی کی ہے؟',
//   ];

//   // Check if text is in Urdu
//   const checkIfUrdu = (text) => {
//     const urduPattern = /[\u0600-\u06FF\u0750-\u077F]/;
//     return text.length === 0 || urduPattern.test(text);
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const text = e.target.value;
//     setInput(text);
//     setIsUrdu(checkIfUrdu(text));
//     if (error) setError('');
//   };

//   // Get a random response - ADDED MISSING FUNCTION
//   const getRandomResponse = () => {
//     const randomIndex = Math.floor(Math.random() * responses.length);
//     return responses[randomIndex];
//   };

//   // Backend AI response function - FIXED
//   const getBackendResponse = async (userInput) => {
//     try {
//       console.log('🚀 Mobile: Calling AI backend...');
//       const result = await aiService.chatWithAI(userInput);
//       console.log('📊 Raw backend result:', result); // Debug log
      
//       return {
//         text: result.response || 'آپ کی بات سمجھ آئی۔ میں آپ کی مدد کرنے کی کوشش کروں گا۔',
//         // FIXED: Use correct field names from backend
//         anxietyLevel: result.anxiety_level,        // ✅ Fixed: anxiety_level -> anxietyLevel
//         confidence: result.confidence,
//         modelAccuracy: result.model_accuracy,     // ✅ Fixed: model_accuracy -> modelAccuracy  
//         recommendations: result.recommendations || [],
//         analysisDetails: result.analysis_details, // ✅ Added analysis details
//         modelInfo: result.model_info,             // ✅ Added model info
//         isBackendResponse: true
//       };
//     } catch (error) {
//       console.error('❌ Mobile: Backend AI failed:', error);
//       throw error;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || !isUrdu) return;

//     // Add user message
//     const userMessage = {
//       id: Date.now(),
//       text: input,
//       sender: 'user',
//       timestamp: new Date()
//     };
    
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     const userInput = input;
//     setInput('');
//     setError('');
    
//     // Simulate AI "typing"
//     setIsTyping(true);
    
//     try {
//       let aiResponseData;
      
//       if (useBackend) {
//         // Try backend first
//         try {
//           aiResponseData = await getBackendResponse(userInput);
//           console.log('✅ Mobile: Backend response received:', aiResponseData);
//         } catch (backendError) {
//           console.log('⚠️ Mobile: Backend failed, using fallback response...');
//           // Fallback to pre-defined response
//           aiResponseData = {
//             text: getRandomResponse(),
//             isBackendResponse: false
//           };
//         }
//       } else {
//         // Use pre-defined responses directly
//         await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
//         aiResponseData = {
//           text: getRandomResponse(),
//           isBackendResponse: false
//         };
//       }
      
//       const aiResponse = {
//         id: Date.now() + 1,
//         text: aiResponseData.text,
//         sender: 'assistant',
//         timestamp: new Date(),
//         anxietyLevel: aiResponseData.anxietyLevel,
//         confidence: aiResponseData.confidence,
//         modelAccuracy: aiResponseData.modelAccuracy,
//         recommendations: aiResponseData.recommendations,
//         isBackendResponse: aiResponseData.isBackendResponse
//       };
      
//       setMessages(prevMessages => [...prevMessages, aiResponse]);
      
//     } catch (error) {
//       console.error('❌ Mobile: AI response error:', error);
//       setError('معذرت، کوئی خرابی ہوئی ہے۔ براہ کرم دوبارہ کوشش کریں۔');
      
//       const errorResponse = {
//         id: Date.now() + 1,
//         text: 'معذرت، کوئی تکنیکی خرابی ہوئی ہے۔ براہ کرم دوبارہ کوشش کریں۔',
//         sender: 'assistant',
//         timestamp: new Date(),
//         isError: true
//       };
      
//       setMessages(prevMessages => [...prevMessages, errorResponse]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Add initial greeting when component mounts
//   useEffect(() => {
//     setTimeout(() => {
//       const initialGreeting = {
//         id: Date.now(),
//         text: `السلام علیکم ${username}، آپ محفوظ ہیں۔ آزادانہ طور پر اپنے احساسات کا اظہار کریں۔`,
//         sender: 'assistant',
//         timestamp: new Date()
//       };
//       setMessages([initialGreeting]);
//     }, 1000);
//   }, [username]);

//   return (
//     <div className="flex flex-col h-full bg-gray-50">
//       {/* Privacy Popup */}
//       {showPrivacyPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-4 mx-4 max-w-xs">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-md font-semibold text-gray-800 flex items-center">
//                 <FaLock className="text-blue-500 mr-2" /> Privacy Notice
//               </h3>
//               <button 
//                 onClick={() => setShowPrivacyPopup(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//             <p className="text-sm text-gray-600 mb-3">
//               Your information is private and secure.
//             </p>
//             <button
//               onClick={() => setShowPrivacyPopup(false)}
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
//             >
//               I understand
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">AI Assistant</h2>
//           <div className="flex items-center space-x-1">
//             {/* Backend/Fallback Toggle */}
//             <button
//               onClick={() => setUseBackend(!useBackend)}
//               className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-2 py-1 rounded flex items-center"
//               title={useBackend ? 'Switch to offline mode' : 'Switch to AI backend'}
//             >
//               <FaCog className="mr-1" />
//               {useBackend ? '🧠' : '💾'}
//             </button>
//             <button 
//               onClick={() => setShowPrivacyPopup(true)}
//               className="text-white hover:text-blue-100 flex items-center text-xs"
//             >
//               <FaInfoCircle className="mr-1" /> Privacy
//             </button>
//           </div>
//         </div>
//         {/* Backend Status Indicator */}
//         <div className="mt-1 text-xs opacity-75">
//           {useBackend ? '🔗 AI Backend Active' : '💾 Offline Mode'}
//         </div>
//       </div>
      
//       {/* Intro Message */}
//       <div className="p-3 bg-blue-50 border-b border-blue-100">
//         <p className="text-gray-700 text-sm">
//           Hi <span className="font-semibold">{username}</span>, I'm your AI assistant. You're safe here. Share your feelings freely.
//         </p>
//         <p className="text-gray-500 text-xs mt-1">
//           Please type in Urdu only | براہ کرم صرف اردو میں لکھیں
//         </p>
//       </div>
      
//       {/* Error Display */}
//       {error && (
//         <div className="px-3 py-2 bg-red-50 border-b border-red-200">
//           <p className="text-xs text-red-600">❌ {error}</p>
//         </div>
//       )}
      
//       {/* Messages Container */}
//       <div className="flex-1 p-3 overflow-y-auto">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 mt-6">
//             <p className="text-sm">آپ کیسے محسوس کر رہے ہیں؟</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {messages.map(message => (
//               <div 
//                 key={message.id} 
//                 className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div 
//                   className={`max-w-xs rounded-lg p-2 text-sm ${
//                     message.sender === 'user' 
//                       ? 'bg-blue-500 text-white rounded-br-none' 
//                       : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
//                   }`}
//                   dir="rtl"
//                 >
//                   <p>{message.text}</p>
                  
//                   {/* Show analysis results for AI messages from backend */}
//                   {message.sender === 'assistant' && message.anxietyLevel && (
//                     <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
//                       <div className="text-xs space-y-1">
//                         <div><strong>Anxiety:</strong> <span className={`${message.anxietyLevel === 'high' ? 'text-red-600' : message.anxietyLevel === 'moderate' ? 'text-yellow-600' : 'text-green-600'}`}>{message.anxietyLevel}</span></div>
//                         <div><strong>Confidence:</strong> {message.confidence}%</div>
//                         {message.recommendations && message.recommendations.length > 0 && (
//                           <div className="mt-1">
//                             <strong>Tips:</strong>
//                             <div className="text-xs mt-1">
//                               {message.recommendations.slice(0, 1).map((rec, idx) => (
//                                 <div key={idx}>• {rec}</div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Show backend/fallback indicator */}
//                   {message.sender === 'assistant' && (
//                     <div className="mt-1 text-xs opacity-60">
//                       {message.isBackendResponse ? '🧠 AI' : '💾 Local'} • 
//                       {message.timestamp && message.timestamp.toLocaleTimeString()}
//                     </div>
//                   )}
                  
//                   {message.sender === 'user' && message.timestamp && (
//                     <p className="text-xs opacity-75 mt-1">
//                       {message.timestamp.toLocaleTimeString()}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {/* AI Typing Indicator */}
//             {isTyping && (
//               <div className="flex justify-start">
//                 <div className="bg-white border border-gray-200 rounded-lg p-2 rounded-bl-none">
//                   <div className="flex space-x-1">
//                     <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
//                     <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>
      
//       {/* Input Area */}
//       <form onSubmit={handleSubmit} className="p-2 bg-white border-t border-gray-200">
//         {!isUrdu && input.length > 0 && (
//           <div className="mb-1 text-red-500 text-xs flex items-center">
//             <FaInfoCircle className="mr-1" /> Please enter your text in Urdu.
//           </div>
//         )}
        
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             value={input}
//             onChange={handleInputChange}
//             placeholder="اپنے خیالات بیان کریں..."
//             className={`flex-1 border ${!isUrdu && input.length > 0 ? 'border-red-300' : 'border-gray-300'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             dir="rtl"
//             disabled={isTyping}
//           />
//           <button
//             type="submit"
//             disabled={!isUrdu || !input.trim() || isTyping}
//             className={`bg-blue-500 text-white p-2 rounded-full ${
//               !isUrdu || !input.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//             }`}
//           >
//             {isTyping ? (
//               <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
//             ) : (
//               <FaPaperPlane className="text-sm" />
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AnxietyAssistantMobile;

// //valid

// src/Components/home/AnxietyAssistantMobile.jsx - FIXED Backend Integration
import { useState, useEffect, useRef } from 'react';
import { FaLock, FaInfoCircle, FaPaperPlane, FaTimes, FaCog } from 'react-icons/fa';
import { aiService } from '../../services/aiService';

const AnxietyAssistantMobile = ({ username }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isUrdu, setIsUrdu] = useState(true);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [useBackend, setUseBackend] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Pre-defined responses in Urdu (fallback)
  const responses = [
    'آپ کی بات سمجھ آئی۔ میں آپ کی مدد کرنے کی کوشش کروں گا۔',
    'آپ کیسا محسوس کر رہے ہیں؟ اپنے احساسات کے بارے میں مزید بتائیں۔',
    'مجھے افسوس ہے کہ آپ اس مشکل سے گزر رہے ہیں۔ میں آپ کے ساتھ ہوں۔',
    'آپ کو شاید کچھ آرام کی ضرورت ہے۔ کیا آپ نے آج کوئی آرام دہ سرگرمی کی ہے؟',
  ];

  // Check if text is in Urdu
  const checkIfUrdu = (text) => {
    const urduPattern = /[\u0600-\u06FF\u0750-\u077F]/;
    return text.length === 0 || urduPattern.test(text);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    setIsUrdu(checkIfUrdu(text));
    if (error) setError('');
  };

  // Get a random response
  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  // Backend AI response function - FIXED to match your backend response structure
  const getBackendResponse = async (userInput) => {
    try {
      console.log('🚀 Mobile: Calling AI backend...');
      const result = await aiService.chatWithAI(userInput);
      console.log('📊 Raw backend result:', result);
      
      return {
        text: result.response || 'آپ کی بات سمجھ آئی۔ میں آپ کی مدد کرنے کی کوشش کروں گا۔',
        // FIXED: Use correct field names from backend response  
        anxietyLevel: result.anxiety_level,
        confidence: result.confidence,
        modelAccuracy: result.model_accuracy,
        recommendations: result.recommendations || [],
        analysisDetails: result.analysis_details,
        modelInfo: result.model_info,
        isBackendResponse: true
      };
    } catch (error) {
      console.error('❌ Mobile: Backend AI failed:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isUrdu) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const userInput = input;
    setInput('');
    setError('');
    
    // Simulate AI "typing"
    setIsTyping(true);
    
    try {
      let aiResponseData;
      
      if (useBackend) {
        // Try backend first
        try {
          aiResponseData = await getBackendResponse(userInput);
          console.log('✅ Mobile: Backend response received:', aiResponseData);
        } catch (backendError) {
          console.log('⚠️ Mobile: Backend failed, using fallback response...');
          // Fallback to pre-defined response
          aiResponseData = {
            text: getRandomResponse(),
            isBackendResponse: false
          };
        }
      } else {
        // Use pre-defined responses directly
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        aiResponseData = {
          text: getRandomResponse(),
          isBackendResponse: false
        };
      }
      
      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseData.text,
        sender: 'assistant',
        timestamp: new Date(),
        anxietyLevel: aiResponseData.anxietyLevel,
        confidence: aiResponseData.confidence,
        modelAccuracy: aiResponseData.modelAccuracy,
        recommendations: aiResponseData.recommendations,
        isBackendResponse: aiResponseData.isBackendResponse
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
    } catch (error) {
      console.error('❌ Mobile: AI response error:', error);
      setError('معذرت، کوئی خرابی ہوئی ہے۔ براہ کرم دوبارہ کوشش کریں۔');
      
      const errorResponse = {
        id: Date.now() + 1,
        text: 'معذرت، کوئی تکنیکی خرابی ہوئی ہے۔ براہ کرم دوبارہ کوشش کریں۔',
        sender: 'assistant',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add initial greeting when component mounts
  useEffect(() => {
    setTimeout(() => {
      const initialGreeting = {
        id: Date.now(),
        text: `السلام علیکم ${username}، آپ محفوظ ہیں۔ آزادانہ طور پر اپنے احساسات کا اظہار کریں۔`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([initialGreeting]);
    }, 1000);
  }, [username]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Privacy Popup */}
      {showPrivacyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 mx-4 max-w-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                <FaLock className="text-blue-500 mr-2" /> Privacy Notice
              </h3>
              <button 
                onClick={() => setShowPrivacyPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Your information is private and secure.
            </p>
            <button
              onClick={() => setShowPrivacyPopup(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              I understand
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowPrivacyPopup(true)}
              className="text-white hover:text-blue-100 flex items-center text-xs"
            >
              <FaInfoCircle className="mr-1" /> Privacy
            </button>
          </div>
        </div>
      </div>
      
      {/* Intro Message */}
      <div className="p-3 bg-blue-50 border-b border-blue-100">
        <p className="text-gray-700 text-sm">
          Hi <span className="font-semibold">{username}</span>, I'm your AI assistant. You're safe here. Share your feelings freely.
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Please type in Urdu only | براہ کرم صرف اردو میں لکھیں
        </p>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="px-3 py-2 bg-red-50 border-b border-red-200">
          <p className="text-xs text-red-600">❌ {error}</p>
        </div>
      )}
      
      {/* Messages Container */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            <p className="text-sm">آپ کیسے محسوس کر رہے ہیں؟</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs rounded-lg p-2 text-sm ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
                  }`}
                  dir="rtl"
                >
                  <p>{message.text}</p>
                  
                  {/* Show analysis results for AI messages from backend - FIXED */}
                  {message.sender === 'assistant' && message.anxietyLevel && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-xs space-y-1">
                        <div>
                          <strong>Anxiety:</strong> 
                          <span className={`ml-1 ${
                            message.anxietyLevel === 'high' || message.anxietyLevel === 'severe' 
                              ? 'text-red-600' 
                              : message.anxietyLevel === 'moderate' 
                                ? 'text-yellow-600' 
                                : 'text-green-600'
                          }`}>
                            {message.anxietyLevel}
                          </span>
                        </div>
                        <div><strong>Confidence:</strong> {message.confidence}%</div>
                        {message.recommendations && message.recommendations.length > 0 && (
                          <div className="mt-1">
                            <strong>Tips:</strong>
                            <div className="text-xs mt-1">
                              {message.recommendations.slice(0, 1).map((rec, idx) => (
                                <div key={idx}>• {rec}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Timestamp */}
                  {message.sender === 'assistant' && message.timestamp && (
                    <div className="mt-1 text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  )}

                  {message.sender === 'user' && message.timestamp && (
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-2 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-2 bg-white border-t border-gray-200">
        {!isUrdu && input.length > 0 && (
          <div className="mb-1 text-red-500 text-xs flex items-center">
            <FaInfoCircle className="mr-1" /> Please enter your text in Urdu.
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="اپنے خیالات بیان کریں..."
            className={`flex-1 border ${!isUrdu && input.length > 0 ? 'border-red-300' : 'border-gray-300'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            dir="rtl"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!isUrdu || !input.trim() || isTyping}
            className={`bg-blue-500 text-white p-2 rounded-full ${
              !isUrdu || !input.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isTyping ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
            ) : (
              <FaPaperPlane className="text-sm" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnxietyAssistantMobile;
