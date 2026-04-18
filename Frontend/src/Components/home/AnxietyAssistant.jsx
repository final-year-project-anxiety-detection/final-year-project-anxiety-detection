


// src/Components/home/AnxietyAssistant.jsx - Enhanced with Graph Visualization
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaInfoCircle, FaPaperPlane, FaTimesCircle, FaCog, FaChartBar, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { aiService } from '../../services/aiService';

const AnxietyAssistant = ({ username }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isUrdu, setIsUrdu] = useState(true);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [useBackend, setUseBackend] = useState(true);
  const [error, setError] = useState('');
  const [showGraphs, setShowGraphs] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Pre-defined responses in Urdu (fallback)
  const responses = [
    'آپ کی بات سمجھ آئی۔ میں آپ کی مدد کرنے کی کوشش کروں گا۔',
    'آپ کیسا محسوس کر رہے ہیں؟ اپنے احساسات کے بارے میں مزید بتائیں۔',
    'مجھے افسوس ہے کہ آپ اس مشکل سے گزر رہے ہیں۔ میں آپ کے ساتھ ہوں۔',
    'آپ کو شاید کچھ آرام کی ضرورت ہے۔ کیا آپ نے آج کوئی آرام دہ سرگرمی کی ہے؟',
    'آپ کی صورتحال آسان نہیں ہے، لیکن یاد رکھیں کہ آپ اکیلے نہیں ہیں۔',
    'گہری سانس لینے کی کوشش کریں، اس سے آپ کو آرام مل سکتا ہے۔',
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

  // Get a random response from pre-defined list
  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  // Convert anxiety level to numeric value for charting
  const getAnxietyLevelNumeric = (level) => {
    const levels = {
      'normal': 1,
      'mild': 2,
      'moderate': 3,
      'severe': 4,
      'panic': 5
    };
    return levels[level?.toLowerCase()] || 0;
  };

  // Get color based on anxiety level
  const getAnxietyColor = (level) => {
    const colors = {
      'normal': '#10B981',    // green
      'mild': '#3B82F6',      // blue
      'moderate': '#F59E0B',  // yellow/orange
      'severe': '#EF4444',    // red
      'panic': '#7C2D12'      // dark red/brown
    };
    return colors[level?.toLowerCase()] || '#6B7280';
  };

  // Get display label for anxiety levels
  const getAnxietyLabel = (level) => {
    const labels = {
      'normal': 'Normal',
      'mild': 'Mild Anxiety',
      'moderate': 'Moderate Anxiety', 
      'severe': 'Severe Anxiety',
      'panic': 'Panic Level'
    };
    return labels[level?.toLowerCase()] || level;
  };

  // Backend AI response function
  const getBackendResponse = async (userInput) => {
    try {
      console.log('🚀 Calling AI backend...');
      const result = await aiService.chatWithAI(userInput);
      console.log('📊 Backend result:', result);
      
      return {
        text: result.response || 'آپ کی بات سمجھ آئی۔ میں آپ کی مدد کرنے کی کوشش کروں گا۔',
        analysis: {
          anxiety_level: result.anxiety_level,
          confidence: result.confidence,
          model_accuracy: result.model_accuracy,
          recommendations: result.recommendations,
          analysis_details: result.analysis_details,
          model_info: result.model_info
        },
        isBackendResponse: true
      };
    } catch (error) {
      console.error('❌ Backend AI failed:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isUrdu) return;

    console.log('🔥 Form submitted with input:', input);

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
          console.log('✅ Backend response received:', aiResponseData);
          
          // Add to analysis history for graphing
          if (aiResponseData.analysis) {
            const newAnalysisPoint = {
              timestamp: new Date().toLocaleTimeString(),
              anxietyLevel: getAnxietyLevelNumeric(aiResponseData.analysis.anxiety_level),
              anxietyLevelText: aiResponseData.analysis.anxiety_level,
              confidence: aiResponseData.analysis.confidence,
              modelAccuracy: aiResponseData.analysis.model_accuracy,
              message: userInput.substring(0, 20) + '...'
            };
            setAnalysisHistory(prev => [...prev.slice(-9), newAnalysisPoint]); // Keep last 10 points
          }
        } catch (backendError) {
          console.error('Backend failed:', backendError.message);
          aiResponseData = {
            text: getRandomResponse(),
            analysis: null,
            isBackendResponse: false
          };
        }
      } else {
        // Use pre-defined responses directly
        await new Promise(resolve => setTimeout(resolve, 1500));
        aiResponseData = {
          text: getRandomResponse(),
          analysis: null,
          isBackendResponse: false
        };
      }
      
      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseData.text,
        sender: 'assistant',
        timestamp: new Date(),
        analysis: aiResponseData.analysis,
        isBackendResponse: aiResponseData.isBackendResponse
      };
      
      console.log('💬 Adding AI message:', aiResponse);
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
    } catch (error) {
      console.error('❌ AI response error:', error);
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

  // Add initial greeting from assistant when component mounts
  useEffect(() => {
    setTimeout(() => {
      const initialGreeting = {
        id: Date.now(),
        text: `السلام علیکم ${username}، میں آپ کا خیال رکھنے اور آپ کی مدد کرنے کے لیے یہاں موجود ہوں۔ آپ اپنے احساسات کو اردو میں شیئر کر سکتے ہیں۔`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([initialGreeting]);
    }, 1000);
  }, [username]);


  // Prepare pie chart data for anxiety distribution
  const getPieChartData = () => {
    if (analysisHistory.length === 0) return [];
    
    // Count distribution of all anxiety levels
    const distribution = analysisHistory.reduce((acc, item) => {
      const level = item.anxietyLevelText;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    // Convert to percentage and create chart data
    const total = analysisHistory.length;
    return Object.entries(distribution).map(([level, count]) => ({
      name: getAnxietyLabel(level),
      value: ((count / total) * 100),
      color: getAnxietyColor(level),
      count: count
    })).sort((a, b) => {
      // Sort by anxiety level order: Normal, Mild, Moderate, Severe, Panic
      const order = ['Normal', 'Mild Anxiety', 'Moderate Anxiety', 'Severe Anxiety', 'Panic Level'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-[500px] flex flex-col">
      {/* Privacy Popup */}
      {showPrivacyPopup && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg p-6 max-w-md mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaLock className="text-blue-500 mr-2" /> Privacy Notice
              </h3>
              <button 
                onClick={() => setShowPrivacyPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Your information is private and secure. All conversations are encrypted and will never be shared with any third parties.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPrivacyPopup(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                I understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Analytics Graph Modal */}
      {showGraphs && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaChartBar className="text-blue-500 mr-2" /> 
                Anxiety Analysis Dashboard
              </h3>
              <button 
                onClick={() => setShowGraphs(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle size={24} />
              </button>
            </div>

            {analysisHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaChartBar className="mx-auto mb-4 text-4xl" />
                <p className="text-lg">No analysis data available yet</p>
                <p className="text-sm">Chat with the AI to generate analysis data</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Anxiety Level Trend Line Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">Anxiety Level Trend</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={analysisHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        domain={[1, 5]}
                        type="number"
                        tickCount={5}
                        tickFormatter={(value) => {
                          const levels = {
                            1: 'Normal',
                            2: 'Mild', 
                            3: 'Moderate',
                            4: 'Severe',
                            5: 'Panic'
                          };
                          return levels[value] || '';
                        }}
                        width={85}
                      />
                      <Tooltip 
                        formatter={(value, name) => {
                          const levels = ['', 'Normal', 'Mild', 'Moderate', 'Severe', 'Panic'];
                          return [levels[value] || value, 'Anxiety Level'];
                        }}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="anxietyLevel" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        name="Anxiety Level"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Confidence and Model Accuracy Bar Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">Model Performance</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analysisHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="confidence" fill="#10B981" name="Confidence %" />
                      <Bar dataKey="modelAccuracy" fill="#F59E0B" name="Model Accuracy %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Anxiety Distribution Pie Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">Anxiety Level Distribution</h4>
                  {analysisHistory.length > 0 ? (
                    <div className="flex flex-col lg:flex-row items-center">
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <Pie
                            data={getPieChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ value }) => `${value.toFixed(1)}%`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            stroke="#fff"
                            strokeWidth={2}
                          >
                            {getPieChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value.toFixed(1)}% (${props.payload.count} sessions)`, 
                              name
                            ]} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      {/* Legend */}
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <div className="space-y-3">
                          {getPieChartData().map((entry, index) => (
                            <div key={index} className="flex items-center">
                              <div 
                                className="w-4 h-4 rounded-full mr-3"
                                style={{ backgroundColor: entry.color }}
                              ></div>
                              <span className="text-sm font-medium text-gray-700">
                                {entry.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <p>No analysis data available</p>
                      <p className="text-sm mt-1">Chat to generate anxiety distribution data</p>
                    </div>
                  )}
                </div>

                {/* Summary Statistics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">Session Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysisHistory.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Messages</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analysisHistory.length > 0 ? 
                          Math.round(analysisHistory.reduce((sum, item) => sum + item.confidence, 0) / analysisHistory.length) : 0}%
                      </div>
                      <div className="text-sm text-gray-600">Avg Confidence</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analysisHistory.length > 0 ? 
                          Math.round(analysisHistory.reduce((sum, item) => sum + item.modelAccuracy, 0) / analysisHistory.length) : 0}%
                      </div>
                      <div className="text-sm text-gray-600">Avg Accuracy</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {analysisHistory.length > 0 ? 
                          getAnxietyLabel((['normal', 'mild', 'moderate', 'severe', 'panic'][
                            Math.round(analysisHistory.reduce((sum, item) => sum + item.anxietyLevel, 0) / analysisHistory.length) - 1
                          ] || 'normal')) : 'Normal'}
                      </div>
                      <div className="text-sm text-gray-600">Avg Status</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Anxiety Assistant</h2>
          <div className="flex items-center space-x-2">
            {/* Analytics Button */}
            <button
              onClick={() => setShowGraphs(true)}
              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-2 py-1 rounded flex items-center"
              title="View Analytics Dashboard"
            >
              <FaChartBar className="mr-1" />
              Analytics ({analysisHistory.length})
            </button>
            <button
              onClick={() => setShowPrivacyPopup(true)}
              className="text-white hover:text-blue-100 flex items-center text-sm"
            >
              <FaInfoCircle className="mr-1" /> Privacy
            </button>
          </div>
        </div>
      </div>
      
      {/* Intro Message with Prominent Analytics Link */}
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <p className="text-gray-700">
          Hi <span className="font-semibold">{username}</span>, I'm your AI assistant. You're safe here. Share your feelings freely.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Please type in Urdu only | براہ کرم صرف اردو میں لکھیں
        </p>
        
        {/* Prominent Analytics Section */}
        <div className="mt-3 flex items-center justify-between bg-white rounded-lg p-3 border-2 border-blue-200">
          <div className="flex items-center">
            <FaChartBar className="text-blue-500 mr-2 text-lg" />
            <div>
              <p className="text-sm font-semibold text-gray-800">View Your Mental Health Analytics</p>
              <p className="text-xs text-gray-600">Track anxiety patterns and progress over time</p>
            </div>
          </div>
          <button 
            onClick={() => setShowGraphs(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <FaChartBar className="mr-1" />
            Analytics ({analysisHistory.length})
          </button>
        </div>
        
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-600">❌ {error}</p>
        </div>
      )}
      
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="mt-2 text-lg">آپ کیسے محسوس کر رہے ہیں؟</p>
            <p className="mt-2 text-sm">اپنے احساسات کو اردو میں بیان کریں</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
                  }`}
                  dir={message.sender === 'user' ? 'rtl' : 'rtl'}
                >
                  <p className="text-base">{message.text}</p>
                  
                  {/* Show analysis results for AI messages from backend */}
                  {message.sender === 'assistant' && message.analysis && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
                        🧠 AI Analysis:
                        <button
                          onClick={() => setShowGraphs(true)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          title="View in Analytics Dashboard"
                        >
                          <FaChartBar size={12} />
                        </button>
                      </h4>
                      <div className="space-y-1 text-xs">
                        <p>
                          <strong>Status:</strong> 
                          <span className={`ml-1 font-semibold ${
                            message.analysis.anxiety_level === 'severe' || message.analysis.anxiety_level === 'panic' 
                              ? 'text-red-600' 
                              : message.analysis.anxiety_level === 'moderate' 
                                ? 'text-yellow-600' 
                                : message.analysis.anxiety_level === 'mild'
                                  ? 'text-blue-600'
                                  : 'text-green-600'
                          }`}>
                            {getAnxietyLabel(message.analysis.anxiety_level)}
                          </span>
                        </p>
                        <p><strong>Confidence:</strong> {message.analysis.confidence}%</p>
                        <p><strong>Model Accuracy:</strong> {message.analysis.model_accuracy}%</p>
                        {message.analysis.recommendations && message.analysis.recommendations.length > 0 && (
                          <div className="mt-2 p-2 bg-white rounded border">
                            <strong className="text-blue-700">💡 Personalized Recommendations:</strong>
                            <div className="mt-1 space-y-1">
                              {message.analysis.recommendations.slice(0, 3).map((rec, idx) => (
                                <div key={idx} className="flex items-start text-xs">
                                  <span className="text-green-600 mr-1 font-bold">•</span>
                                  <span className="text-gray-700">{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Timestamp */}
                  {message.sender === 'assistant' && message.timestamp && (
                    <div className="mt-2 text-xs opacity-60">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
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
                <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-bl-none">
                  <div className="flex space-x-2">
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
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
        {!isUrdu && input.length > 0 && (
          <div className="mb-2 text-red-500 text-sm flex items-center">
            <FaInfoCircle className="mr-1" /> Please enter your text in Urdu.
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="اپنے خیالات بیان کریں..."
            className={`flex-1 border ${!isUrdu && input.length > 0 ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnxietyAssistant;

