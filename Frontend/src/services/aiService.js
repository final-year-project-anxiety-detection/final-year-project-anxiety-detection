// // Check if your src/services/aiService.js looks like this:

// export const aiService = {
//   // Chat with AI (Your ACTUAL TRAINED LGBMClassifier) - WITH AUTH
//   chatWithAI: async (text) => {
//     try {
//       console.log('🚀 Calling REAL TRAINED MODEL with authentication');
//       console.log('📝 Input text:', text);
      
//       const token = localStorage.getItem('access_token');
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login again.');
//       }
      
//       const response = await fetch('http://127.0.0.1:8000/api/ai/chat', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ text: text })
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log('🧠 REAL MODEL RESPONSE:', result);
      
//       return {
//         response: result.response || 'Analysis completed',
//         anxietyLevel: result.anxiety_level || 'moderate',
//         confidence: result.confidence || 75,
//         modelAccuracy: result.model_accuracy || 94.2,
//         recommendations: result.recommendations || [],
//         modelInfo: result.model_info || 'LGBMClassifier',
//         analysisDetails: result.analysis_details || {},
//         isRealModel: true // This makes it show "🧠 AI Model"
//       };
      
//     } catch (error) {
//       console.error('❌ AI Service Error:', error);
//       throw error;
//     }
//   }
// };
/// valid 
// src/services/aiService.js - FIXED Backend Integration
import apiClient from './apiClient';
import { API_CONFIG } from '../config/api';

export const aiService = {
  // Chat with AI (Your ACTUAL TRAINED LGBMClassifier) - FIXED
  chatWithAI: async (text) => {
    try {
      console.log('🚀 Calling REAL TRAINED MODEL with authentication');
      console.log('📝 Input text:', text);
      
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch('http://127.0.0.1:8000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: text })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('🧠 REAL MODEL RESPONSE:', result);
      
      // FIXED: Return the correct structure based on your backend response
      return {
        success: result.success,
        response: result.response || 'Analysis completed',
        anxiety_level: result.anxiety_level,    // Keep backend field names
        confidence: result.confidence,
        model_accuracy: result.model_accuracy,
        recommendations: result.recommendations || [],
        model_info: result.model_info,
        analysis_details: result.analysis_details,
        timestamp: result.timestamp
      };
      
    } catch (error) {
      console.error('❌ AI Service Error:', error);
      throw error;
    }
  },

  // Get chat history - FIXED
  getChatHistory: async (limit = 50, offset = 0) => {
    try {
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.CHAT_HISTORY}?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('❌ Chat History Error:', error);
      throw error;
    }
  },

  // Get analysis history - FIXED
  getAnalysisHistory: async (limit = 50) => {
    try {
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.ANALYSIS_HISTORY}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('❌ Analysis History Error:', error);
      throw error;
    }
  },

  // Test backend connection
  testConnection: async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/health');
      const data = await response.json();
      
      return {
        success: true,
        data: {
          status: data.status,
          database_status: data.database_status,
          centralized_database: data.centralized_database,
          timestamp: data.timestamp
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};


