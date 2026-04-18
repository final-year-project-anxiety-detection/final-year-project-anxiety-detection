// // src/Components/test/IntegrationTest.jsx - Updated for YOUR structure
// import React, { useState } from 'react';
// import { authService } from '../../services/authService';
// import { aiService } from '../../services/aiService';

// const IntegrationTest = () => {
//   const [results, setResults] = useState({});
//   const [loading, setLoading] = useState(false);

//   const runTests = async () => {
//     setLoading(true);
//     const testResults = {};

//     try {
//       // Test 1: Backend Health Check
//       console.log('🧪 Testing Backend Connection...');
//       const healthResponse = await fetch('http://127.0.0.1:8000/api/health');
//       const healthData = await healthResponse.json();
//       testResults.health = { success: true, data: healthData };
//       console.log('✅ Backend connected:', healthData);

//       // Test 2: Authentication
//       console.log('🧪 Testing Authentication...');
//       const testUsername = 'testuser_' + Date.now();
//       const authResult = await authService.signup(testUsername, 'TestPass123!');
//       testResults.auth = { success: true, data: authResult };
//       console.log('✅ Authentication working:', authResult);

//       // Test 3: AI Service (Your ML Model)
//       console.log('🧪 Testing AI/ML Model...');
//       const aiResult = await aiService.chatWithAI('میں بہت پریشان ہوں اور گھبرا رہا ہوں');
//       testResults.ai = { success: true, data: aiResult };
//       console.log('✅ AI Model working:', aiResult);

//       console.log('🎉 All tests passed!', testResults);
      
//     } catch (error) {
//       console.error('❌ Test failed:', error);
//       testResults.error = error.message;
//     }

//     setResults(testResults);
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         🧪 Frontend-Backend Integration Test
//       </h2>
      
//       <div className="text-center mb-6">
//         <button
//           onClick={runTests}
//           disabled={loading}
//           className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? '⏳ Running Tests...' : '🚀 Run Integration Tests'}
//         </button>
//       </div>

//       {Object.keys(results).length > 0 && (
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-center">📋 Test Results:</h3>
          
//           {/* Backend Health Test */}
//           {results.health && (
//             <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//               <h4 className="font-semibold text-green-800 flex items-center">
//                 ✅ Backend Connection
//               </h4>
//               <p className="text-sm text-green-600 mt-1">
//                 Status: {results.health.data?.status} | 
//                 Database: {results.health.data?.database}
//               </p>
//             </div>
//           )}

//           {/* Authentication Test */}
//           {results.auth && (
//             <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//               <h4 className="font-semibold text-green-800 flex items-center">
//                 ✅ Authentication Service
//               </h4>
//               <p className="text-sm text-green-600 mt-1">
//                 User created: {results.auth.data?.user?.username}
//               </p>
//               <p className="text-sm text-green-600">
//                 Token received: {results.auth.data?.access_token ? 'Yes' : 'No'}
//               </p>
//             </div>
//           )}

//           {/* AI Test */}
//           {results.ai && (
//             <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//               <h4 className="font-semibold text-green-800 flex items-center">
//                 ✅ AI/ML Model Service
//               </h4>
//               <div className="text-sm text-green-600 mt-1 space-y-1">
//                 <p><strong>Input:</strong> میں بہت پریشان ہوں اور گھبرا رہا ہوں</p>
//                 <p><strong>Anxiety Level:</strong> {results.ai.data?.prediction?.anxiety_level}</p>
//                 <p><strong>Confidence:</strong> {results.ai.data?.prediction?.confidence}%</p>
//                 <p><strong>Model Accuracy:</strong> {results.ai.data?.prediction?.model_accuracy}%</p>
//                 {results.ai.data?.prediction?.recommendations && (
//                   <p><strong>Recommendations:</strong> {results.ai.data.prediction.recommendations.slice(0, 2).join(', ')}...</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Error */}
//           {results.error && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//               <h4 className="font-semibold text-red-800 flex items-center">
//                 ❌ Test Failed
//               </h4>
//               <p className="text-sm text-red-600 mt-1">{results.error}</p>
//               <div className="mt-2 text-xs text-red-500">
//                 <p>💡 Troubleshooting tips:</p>
//                 <ul className="list-disc list-inside mt-1 space-y-1">
//                   <li>Make sure your backend is running on http://127.0.0.1:8000</li>
//                   <li>Check if CORS is properly configured</li>
//                   <li>Verify your database connection</li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {loading && (
//         <div className="text-center mt-6">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <p className="mt-2 text-gray-600">Testing backend integration...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IntegrationTest;
// src/Components/test/IntegrationTest.jsx - FIXED Integration Test
import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { aiService } from '../../services/aiService';
import { moodService } from '../../services/moodService';
//import { categoriesService } from '../../services/categoriesService';
//import { summaryService } from '../../services/summaryService';
//import { settingsService } from '../../services/settingsService';

const IntegrationTest = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [testUser, setTestUser] = useState(null);

  const runTests = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test 1: Backend Health Check
      console.log('🧪 Testing Backend Connection...');
      try {
        const healthResponse = await fetch('http://127.0.0.1:8000/api/health');
        const healthData = await healthResponse.json();
        testResults.health = { success: true, data: healthData };
        console.log('✅ Backend connected:', healthData);
      } catch (error) {
        testResults.health = { success: false, error: error.message };
      }

      // Test 2: Database Status Check
      console.log('🧪 Testing Database Status...');
      try {
        const dbResponse = await fetch('http://127.0.0.1:8000/api/db-status');
        const dbData = await dbResponse.json();
        testResults.database = { success: true, data: dbData };
        console.log('✅ Database status:', dbData);
      } catch (error) {
        testResults.database = { success: false, error: error.message };
      }

      // Test 3: Authentication
      console.log('🧪 Testing Authentication...');
      try {
        const testUsername = 'testuser_' + Date.now();
        const authResult = await authService.signup(testUsername, 'TestPass123!');
        testResults.auth = { success: true, data: authResult };
        setTestUser(authResult.user);
        console.log('✅ Authentication working:', authResult);
      } catch (error) {
        testResults.auth = { success: false, error: error.message };
      }

      // Test 4: Categories Service
      console.log('🧪 Testing Categories Service...');
      try {
        const categoriesResult = await categoriesService.getAllCategories();
        testResults.categories = { success: true, data: categoriesResult };
        console.log('✅ Categories working:', categoriesResult);
      } catch (error) {
        testResults.categories = { success: false, error: error.message };
      }

      // Test 5: AI Service (Your ML Model) - Only if authenticated
      if (testResults.auth.success) {
        console.log('🧪 Testing AI/ML Model...');
        try {
          const aiResult = await aiService.chatWithAI('میں بہت پریشان ہوں اور گھبرا رہا ہوں');
          testResults.ai = { success: true, data: aiResult };
          console.log('✅ AI Model working:', aiResult);
        } catch (error) {
          testResults.ai = { success: false, error: error.message };
        }

        // Test 6: Mood Service - Only if authenticated
        console.log('🧪 Testing Mood Service...');
        try {
          const moodResult = await moodService.submitMood('good');
          testResults.mood = { success: true, data: moodResult };
          console.log('✅ Mood service working:', moodResult);
        } catch (error) {
          testResults.mood = { success: false, error: error.message };
        }

        // Test 7: Settings Service - Only if authenticated
        console.log('🧪 Testing Settings Service...');
        try {
          const settingsResult = await settingsService.getUserSettings();
          testResults.settings = { success: true, data: settingsResult };
          console.log('✅ Settings service working:', settingsResult);
        } catch (error) {
          testResults.settings = { success: false, error: error.message };
        }

        // Test 8: Summary Service - Only if authenticated
        console.log('🧪 Testing Summary Service...');
        try {
          const summaryResult = await summaryService.getLocalSummary(); // Use local fallback
          testResults.summary = { success: true, data: summaryResult };
          console.log('✅ Summary service working:', summaryResult);
        } catch (error) {
          testResults.summary = { success: false, error: error.message };
        }
      }

      console.log('🎉 All tests completed!', testResults);
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      testResults.error = error.message;
    }

    setResults(testResults);
    setLoading(false);
  };

  // Quick backend connectivity test
  const quickConnectivityTest = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/');
      const data = await response.json();
      alert(`✅ Backend is running!\n\nAPI: ${data.message}\nVersion: ${data.version}\nStatus: ${data.status}\nDatabase: ${data.database_status}`);
    } catch (error) {
      alert(`❌ Backend connection failed!\n\nError: ${error.message}\n\nMake sure your backend is running on http://127.0.0.1:8000`);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🧪 Frontend-Backend Integration Test
      </h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">🔧 Backend Requirements:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>✅ Backend running on: <code>http://127.0.0.1:8000</code></li>
          <li>✅ Database: PostgreSQL with centralized operations</li>
          <li>✅ ML Model: LGBMClassifier for anxiety detection</li>
          <li>✅ API Endpoints: /api/auth, /api/ai, /api/mood, /api/categories, /api/settings</li>
        </ul>
      </div>
      
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={quickConnectivityTest}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          🔍 Quick Connectivity Test
        </button>
        
        <button
          onClick={runTests}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '⏳ Running Full Test Suite...' : '🚀 Run Full Integration Tests'}
        </button>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">📋 Test Results:</h3>
          
          {/* Backend Health Test */}
          {results.health && (
            <div className={`p-4 rounded-lg border ${results.health.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.health.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.health.success ? '✅' : '❌'} Backend Health Check
              </h4>
              {results.health.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>Status: {results.health.data?.status}</p>
                  <p>Database: {results.health.data?.database_status}</p>
                  <p>Centralized DB: {results.health.data?.centralized_database ? 'Yes' : 'No'}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.health.error}</p>
              )}
            </div>
          )}

          {/* Database Status Test */}
          {results.database && (
            <div className={`p-4 rounded-lg border ${results.database.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.database.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.database.success ? '✅' : '❌'} Database Status
              </h4>
              {results.database.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>Connection: {results.database.data?.database_status?.connection}</p>
                  <p>Operations Available: {results.database.data?.database_status?.available_operations?.length || 0}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.database.error}</p>
              )}
            </div>
          )}

          {/* Authentication Test */}
          {results.auth && (
            <div className={`p-4 rounded-lg border ${results.auth.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.auth.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.auth.success ? '✅' : '❌'} Authentication Service
              </h4>
              {results.auth.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>User created: {results.auth.data?.user?.username}</p>
                  <p>Token received: {results.auth.data?.access_token ? 'Yes' : 'No'}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.auth.error}</p>
              )}
            </div>
          )}

          {/* Categories Test */}
          {results.categories && (
            <div className={`p-4 rounded-lg border ${results.categories.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.categories.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.categories.success ? '✅' : '❌'} Categories Service
              </h4>
              {results.categories.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>Categories found: {results.categories.data?.categories?.length || 0}</p>
                  <p>Source: {results.categories.data?.source}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.categories.error}</p>
              )}
            </div>
          )}

          {/* AI/ML Model Test */}
          {results.ai && (
            <div className={`p-4 rounded-lg border ${results.ai.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.ai.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.ai.success ? '✅' : '❌'} AI/ML Model Service (LGBMClassifier)
              </h4>
              {results.ai.success ? (
                <div className="text-sm text-green-600 mt-1 space-y-1">
                  <p><strong>Input:</strong> میں بہت پریشان ہوں اور گھبرا رہا ہوں</p>
                  <p><strong>Anxiety Level:</strong> {results.ai.data?.anxiety_level}</p>
                  <p><strong>Confidence:</strong> {results.ai.data?.confidence}%</p>
                  <p><strong>Model Accuracy:</strong> {results.ai.data?.model_accuracy}%</p>
                  {results.ai.data?.recommendations && (
                    <p><strong>Recommendations:</strong> {results.ai.data.recommendations.slice(0, 1).join(', ')}...</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.ai.error}</p>
              )}
            </div>
          )}

          {/* Mood Service Test */}
          {results.mood && (
            <div className={`p-4 rounded-lg border ${results.mood.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.mood.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.mood.success ? '✅' : '❌'} Mood Tracking Service
              </h4>
              {results.mood.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>Mood submitted: {results.mood.data?.data?.mood_type}</p>
                  <p>Source: {results.mood.data?.source}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.mood.error}</p>
              )}
            </div>
          )}

          {/* Settings Service Test */}
          {results.settings && (
            <div className={`p-4 rounded-lg border ${results.settings.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.settings.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.settings.success ? '✅' : '❌'} Settings Service
              </h4>
              {results.settings.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>Settings retrieved for: {results.settings.data?.settings?.username}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.settings.error}</p>
              )}
            </div>
          )}

          {/* Summary Service Test */}
          {results.summary && (
            <div className={`p-4 rounded-lg border ${results.summary.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold flex items-center ${results.summary.success ? 'text-green-800' : 'text-red-800'}`}>
                {results.summary.success ? '✅' : '❌'} Summary Service
              </h4>
              {results.summary.success ? (
                <div className="text-sm text-green-600 mt-1">
                  <p>Source: {results.summary.data?.source}</p>
                  <p>Mood entries: {results.summary.data?.summary?.mood_analytics?.total_entries || 0}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 mt-1">Error: {results.summary.error}</p>
              )}
            </div>
          )}

          {/* Error */}
          {results.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 flex items-center">
                ❌ Test Suite Failed
              </h4>
              <p className="text-sm text-red-600 mt-1">{results.error}</p>
              <div className="mt-2 text-xs text-red-500">
                <p>💡 Troubleshooting tips:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Make sure your backend is running on http://127.0.0.1:8000</li>
                  <li>Check if CORS is properly configured in your backend</li>
                  <li>Verify your PostgreSQL database connection</li>
                  <li>Ensure all required Python packages are installed</li>
                  <li>Check if your ML model files are present</li>
                </ul>
              </div>
            </div>
          )}

          {/* Test Summary */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📊 Test Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {Object.values(results).filter(r => r.success).length}
                </div>
                <div className="text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {Object.values(results).filter(r => !r.success).length}
                </div>
                <div className="text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600">
                  {Object.keys(results).length}
                </div>
                <div className="text-gray-600">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {Math.round((Object.values(results).filter(r => r.success).length / Object.keys(results).length) * 100) || 0}%
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center mt-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Testing backend integration...</p>
        </div>
      )}

      {testUser && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            🎯 Test completed with user: <strong>{testUser.username}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default IntegrationTest;