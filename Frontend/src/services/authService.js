// // src/services/authService.js - FIXED TOKEN HANDLING
// import apiClient from './apiClient';
// import { API_CONFIG } from '../config/api';

// export const authService = {
//   // User Signup - FIXED TOKEN STORAGE
//   signup: async (username, password) => {
//     try {
//       console.log('🚀 Attempting signup with backend...');
      
//       const response = await apiClient.post(API_CONFIG.ENDPOINTS.SIGNUP, {
//         username: username.trim(),
//         password: password,
//         email: `${username.trim()}@gmail.com` // Add email
//       });
      
//       console.log('✅ Signup response:', response.data);
      
//       if (response.data.success && response.data.access_token) {
//         // STORE THE TOKEN PROPERLY
//         localStorage.setItem('access_token', response.data.access_token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
        
//         console.log('✅ Token stored:', response.data.access_token);
//         console.log('✅ User stored:', response.data.user);
        
//         return response.data;
//       } else {
//         throw new Error(response.data.error || 'Signup failed - no token received');
//       }
//     } catch (error) {
//       console.error('❌ Signup failed:', error);
//       throw new Error(error.response?.data?.error || error.message);
//     }
//   },

//   // User Login - FIXED TOKEN STORAGE
//   login: async (username, password) => {
//     try {
//       console.log('🚀 Attempting login with backend...');
      
//       const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOGIN, {
//         username: username.trim(),
//         password: password
//       });
      
//       console.log('✅ Login response:', response.data);
      
//       if (response.data.success && response.data.access_token) {
//         // STORE THE TOKEN PROPERLY
//         localStorage.setItem('access_token', response.data.access_token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
        
//         console.log('✅ Token stored after login:', response.data.access_token);
//         console.log('✅ User stored after login:', response.data.user);
        
//         return response.data;
//       } else {
//         throw new Error(response.data.error || 'Login failed - no token received');
//       }
//     } catch (error) {
//       console.error('❌ Login failed:', error);
//       throw new Error(error.response?.data?.error || error.message);
//     }
//   },

//   // Test if we can get a token
//   testLogin: async (username, password) => {
//     try {
//       console.log('🧪 Testing direct login...');
      
//       const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password
//         })
//       });
      
//       const result = await response.json();
//       console.log('🧪 Direct login test result:', result);
      
//       return result;
//     } catch (error) {
//       console.error('❌ Direct login test failed:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // User Logout
//   logout: async () => {
//     try {
//       await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('user');
//     }
//   },

//   // Get Current User
//   getCurrentUser: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },

//   // Check if authenticated
//   isAuthenticated: () => {
//     const token = localStorage.getItem('access_token');
//     const user = localStorage.getItem('user');
//     return !!(token && user);
//   },

//   // Get user profile
//   getProfile: async () => {
//     try {
//       const response = await apiClient.get(API_CONFIG.ENDPOINTS.PROFILE);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to fetch profile');
//     }
//   },

//   // Debug authentication state
//   debugAuth: () => {
//     const token = localStorage.getItem('access_token');
//     const user = localStorage.getItem('user');
    
//     console.log('🔍 AUTH DEBUG:');
//     console.log('Token exists:', !!token);
//     console.log('Token value:', token);
//     console.log('User exists:', !!user);
//     console.log('User value:', user);
    
//     return {
//       hasToken: !!token,
//       hasUser: !!user,
//       token: token,
//       user: user ? JSON.parse(user) : null
//     };
//   }
// };

// src/services/authService.js - UPDATED TOKEN HANDLING & Backend Integration
import apiClient from './apiClient';
import { API_CONFIG } from '../config/api';

export const authService = {
  // User Signup - FIXED TOKEN STORAGE
  signup: async (username, password) => {
    try {
      console.log('🚀 Attempting signup with backend...');
      
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.SIGNUP, {
        username: username.trim(),
        password: password,
        email: `${username.trim()}@gmail.com` // Add email as required by your backend
      });
      
      console.log('✅ Signup response:', response.data);
      
      if (response.data.success && response.data.access_token) {
        // STORE THE TOKEN PROPERLY
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('✅ Token stored:', response.data.access_token);
        console.log('✅ User stored:', response.data.user);
        
        return response.data;
      } else {
        throw new Error(response.data.error || 'Signup failed - no token received');
      }
    } catch (error) {
      console.error('❌ Signup failed:', error);
      
      // Enhanced error handling for your backend
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.backendError) {
        errorMessage = error.backendError;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  // User Login - FIXED TOKEN STORAGE
  login: async (username, password) => {
    try {
      console.log('🚀 Attempting login with backend...');
      
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOGIN, {
        username: username.trim(),
        password: password
      });
      
      console.log('✅ Login response:', response.data);
      
      if (response.data.success && response.data.access_token) {
        // STORE THE TOKEN PROPERLY
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('✅ Token stored after login:', response.data.access_token);
        console.log('✅ User stored after login:', response.data.user);
        
        return response.data;
      } else {
        throw new Error(response.data.error || 'Login failed - no token received');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      
      // Enhanced error handling for your backend
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.backendError) {
        errorMessage = error.backendError;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  // Test direct login (for debugging)
  testLogin: async (username, password) => {
    try {
      console.log('🧪 Testing direct login...');
      
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      
      const result = await response.json();
      console.log('🧪 Direct login test result:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Direct login test failed:', error);
      return { success: false, error: error.message };
    }
  },

  // User Logout - Enhanced
  logout: async () => {
    try {
      // Try to call backend logout endpoint
      await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
      console.log('✅ Backend logout successful');
    } catch (error) {
      console.error('⚠️ Backend logout error (continuing anyway):', error);
      // Continue with local cleanup even if backend fails
    } finally {
      // Always clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      console.log('✅ Local auth data cleared');
    }
  },

  // Get Current User
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    const isAuth = !!(token && user);
    
    console.log(`🔍 Auth check: ${isAuth ? 'Authenticated' : 'Not authenticated'}`);
    return isAuth;
  },

  // Get user profile - Updated to use settings endpoint
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PROFILE);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('❌ Profile fetch failed:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch profile');
    }
  },

  // Debug authentication state - Enhanced
  debugAuth: () => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    console.log('🔍 AUTH DEBUG REPORT:');
    console.log('==================');
    console.log('Token exists:', !!token);
    console.log('Token length:', token ? token.length : 0);
    console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'None');
    console.log('User exists:', !!user);
    console.log('User data:', user ? JSON.parse(user) : 'None');
    console.log('Is authenticated:', authService.isAuthenticated());
    console.log('==================');
    
    return {
      hasToken: !!token,
      hasUser: !!user,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? `${token.substring(0, 20)}...` : null,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: authService.isAuthenticated()
    };
  },

  // Test backend connectivity
  testBackendConnection: async () => {
    try {
      console.log('🔧 Testing backend connection for auth...');
      
      const response = await fetch('http://127.0.0.1:8000/api/health');
      const data = await response.json();
      
      console.log('✅ Backend connection successful:', data);
      
      return {
        success: true,
        data: data,
        status: data.status,
        database_status: data.database_status,
        message: 'Backend connection successful'
      };
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      
      return {
        success: false,
        error: error.message,
        message: 'Backend connection failed. Make sure your backend is running on http://127.0.0.1:8000'
      };
    }
  },

  // Clear all auth data (for debugging)
  clearAuthData: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('users'); // Also clear localStorage users for testing
    console.log('🗑️ All auth data cleared');
  }
};