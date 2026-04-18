// // src/services/apiClient.js - Main API Client
// import axios from 'axios';
// import { API_CONFIG } from '../config/api';

// // Create axios instance
// const apiClient = axios.create({
//   baseURL: API_CONFIG.BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 seconds timeout
// });

// // Request interceptor - Add auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - Handle errors
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.status} ${response.config.url}`);
//     return response;
//   },
//   (error) => {
//     console.error('❌ API Error:', error.response?.data || error.message);
    
//     // Handle authentication errors
//     if (error.response?.status === 401) {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
// src/services/apiClient.js - FIXED Main API Client for Backend Integration
import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with proper backend configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL, // http://127.0.0.1:8000/api
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout (increased for backend processing)
  withCredentials: false, // Set to true if you need cookies
});

// Request interceptor - Add auth token and debug logging
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🔑 Token added to request: ${token.substring(0, 20)}...`);
    } else {
      console.log('⚠️ No token found in localStorage');
    }
    
    // Enhanced logging for debugging
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log(`📝 Request data:`, config.data);
    console.log(`📋 Request headers:`, config.headers);
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Enhanced success logging
    console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    console.log(`📊 Response data:`, response.data);
    
    // Check if backend response has success field
    if (response.data && typeof response.data.success !== 'undefined') {
      if (!response.data.success) {
        console.warn('⚠️ Backend returned success: false', response.data);
      }
    }
    
    return response;
  },
  (error) => {
    // Enhanced error logging
    console.error('❌ API Error Details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method?.toUpperCase());
    console.error('Response Data:', error.response?.data);
    console.error('Full Error:', error);
    
    // Handle specific backend error responses
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('🔴 Bad Request - Check your request data');
          break;
        case 401:
          console.error('🔴 Unauthorized - Clearing auth and redirecting to login');
          // Clear authentication data
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('🔴 Forbidden - Access denied');
          break;
        case 404:
          console.error('🔴 Not Found - Endpoint does not exist');
          break;
        case 500:
          console.error('🔴 Internal Server Error - Backend issue');
          break;
        case 502:
          console.error('🔴 Bad Gateway - Backend server is down');
          break;
        case 503:
          console.error('🔴 Service Unavailable - Backend temporarily unavailable');
          break;
        default:
          console.error(`🔴 HTTP ${status} Error:`, data?.error || error.message);
      }
      
      // Enhance error object with backend-specific information
      if (data?.error) {
        error.backendError = data.error;
        error.message = data.error;
      }
    } else if (error.request) {
      // Network error - backend not reachable
      console.error('🔴 Network Error - Backend server not reachable');
      console.error('Make sure your backend is running on http://127.0.0.1:8000');
      error.message = 'Backend server not reachable. Please check if the server is running.';
    } else {
      // Other error
      console.error('🔴 Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to test backend connectivity
export const testBackendConnection = async () => {
  try {
    console.log('🧪 Testing backend connection...');
    
    // Test basic connection to main endpoint
    const response = await fetch('http://127.0.0.1:8000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Backend connection successful:', data);
    
    return {
      success: true,
      data: data,
      message: 'Backend connection successful'
    };
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'Backend connection failed'
    };
  }
};

// Helper function to test health endpoint
export const testHealthEndpoint = async () => {
  try {
    console.log('🏥 Testing health endpoint...');
    
    const response = await fetch('http://127.0.0.1:8000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Health endpoint successful:', data);
    
    return {
      success: true,
      data: data,
      message: 'Health endpoint successful'
    };
  } catch (error) {
    console.error('❌ Health endpoint failed:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'Health endpoint failed'
    };
  }
};

// Helper function to debug authentication
export const debugAuth = () => {
  const token = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');
  
  console.log('🔍 AUTH DEBUG:');
  console.log('Has token:', !!token);
  console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'None');
  console.log('Has user:', !!user);
  console.log('User data:', user ? JSON.parse(user) : 'None');
  
  return {
    hasToken: !!token,
    hasUser: !!user,
    tokenPreview: token ? `${token.substring(0, 20)}...` : null,
    userData: user ? JSON.parse(user) : null
  };
};

export default apiClient;