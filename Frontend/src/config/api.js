// // src/config/api.js - Corrected API Configuration
// export const API_CONFIG = {
//   BASE_URL: 'http://127.0.0.1:8000/api',
//   ENDPOINTS: {
//     // Authentication - matches your backend
//     SIGNUP: '/auth/signup',
//     LOGIN: '/auth/login',
//     LOGOUT: '/auth/logout',
//     PROFILE: '/auth/profile',
    
//     // AI Assistant - matches your backend (/api/ai)
//     AI_CHAT: '/ai/chat',
//     CHAT_HISTORY: '/ai/chat/history',
//     ANALYSIS_HISTORY: '/ai/analysis/history',
    
//     // Mood Tracking - matches your backend (/api/mood)
//     SUBMIT_MOOD: '/mood/submit',
//     MOOD_HISTORY: '/mood/history',
//     MOOD_SUMMARY: '/mood/summary',
//     MOOD_OPTIONS: '/mood/options',
    
//     // Summary & Reports - matches your backend (/api/summary)
//     COMPLETE_SUMMARY: '/summary/complete',
//     MOOD_ANALYTICS: '/summary/mood-analytics',
//     ANXIETY_ANALYTICS: '/summary/anxiety-analytics',
//     EXPORT_REPORT: '/summary/export-report',
    
//     // Categories - matches your backend (/api/categories)
//     ALL_CATEGORIES: '/categories/all',
//     HOME_CATEGORIES: '/categories/home-display',
//     CATEGORY_DETAILS: '/categories',
//     CATEGORY_TREATMENT: '/categories',
//     SEARCH_CATEGORIES: '/categories/search',
    
//     // Settings - matches your backend (/api/settings)
//     USER_SETTINGS: '/settings/profile',
//     UPDATE_PROFILE_PICTURE: '/settings/profile-picture',
//     UPDATE_THEME: '/settings/theme',
//     UPDATE_NOTIFICATIONS: '/settings/notifications',
//     CHANGE_PASSWORD: '/settings/change-password',
//     ACCOUNT_INFO: '/settings/account-info',
//     DELETE_ACCOUNT: '/settings/delete-account',
//     EXPORT_DATA: '/settings/export-data',
//     APP_INFO: '/settings/app-info',
    
//     // Health & Stats
//     HEALTH: '/health',
//     STATS: '/stats'
//   }
// };
// src/config/api.js - FIXED API Configuration to match your backend exactly
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api',
  ENDPOINTS: {
    // Authentication - matches your auth_routes.py exactly
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login', 
    LOGOUT: '/auth/logout',
    AUTH_DEBUG: '/auth/debug',

    // AI Assistant - matches your ai_assistant_routes.py exactly  
    AI_CHAT: '/ai/chat',
    CHAT_HISTORY: '/ai/chat/history',
    ANALYSIS_HISTORY: '/ai/analysis/history',

    // Mood Tracking - matches your mood_routes.py exactly
    SUBMIT_MOOD: '/mood/submit',
    MOOD_HISTORY: '/mood/history',
    MOOD_ANALYTICS: '/mood/analytics',

    // Summary & Reports - matches your summary_routes.py exactly
    COMPLETE_SUMMARY: '/summary/complete',
    MOOD_ANALYTICS_SUMMARY: '/summary/mood-analytics',
    ANXIETY_ANALYTICS: '/summary/anxiety-analytics', 
    EXPORT_REPORT: '/summary/export-report',

    // Categories - matches your categories_routes.py exactly
    ALL_CATEGORIES: '/categories/all',
    HOME_CATEGORIES: '/categories/home-display',
    CATEGORY_DETAILS: '/categories', // + /:id
    CATEGORY_TREATMENT: '/categories', // + /:id/treatment
    SEARCH_CATEGORIES: '/categories/search',
    INITIALIZE_CATEGORIES: '/categories/initialize',

    // Settings - matches your settings_routes.py exactly
    USER_SETTINGS: '/settings/profile',
    PROFILE: '/settings/profile', // Alias for profile
    UPDATE_PROFILE_PICTURE: '/settings/profile-picture',
    UPDATE_THEME: '/settings/theme',
    UPDATE_NOTIFICATIONS: '/settings/notifications',
    CHANGE_PASSWORD: '/settings/change-password',
    ACCOUNT_INFO: '/settings/account-info',
    DELETE_ACCOUNT: '/settings/delete-account',
    EXPORT_DATA: '/settings/export-data',
    APP_INFO: '/settings/app-info',
  }
};

// Separate health endpoints (outside /api prefix)
export const HEALTH_ENDPOINTS = {
  MAIN: 'http://127.0.0.1:8000/',           // Main API info
  HEALTH: 'http://127.0.0.1:8000/api/health',     // Health check
  DB_STATUS: 'http://127.0.0.1:8000/api/db-status', // Database status
  TEST_DB: 'http://127.0.0.1:8000/api/test-db',    // Test database
  SYSTEM_INFO: 'http://127.0.0.1:8000/api/system-info' // System info
};

// Backend health check helper function
export const healthCheck = async () => {
  try {
    const response = await fetch(HEALTH_ENDPOINTS.HEALTH);
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      status: data.status,
      database_status: data.database_status,
      centralized_database: data.centralized_database
    };
  } catch (error) {
    console.error('Health check failed:', error);
    return { 
      success: false, 
      error: error.message,
      status: 'error'
    };
  }
};

// Database status check
export const databaseStatusCheck = async () => {
  try {
    const response = await fetch(HEALTH_ENDPOINTS.DB_STATUS);
    const data = await response.json();
    
    return {
      success: data.success,
      data: data.database_status,
      connection: data.database_status?.connection,
      available_operations: data.database_status?.available_operations
    };
  } catch (error) {
    console.error('Database status check failed:', error);
    return { 
      success: false, 
      error: error.message
    };
  }
};

// Main API info check
export const mainApiCheck = async () => {
  try {
    const response = await fetch(HEALTH_ENDPOINTS.MAIN);
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      message: data.message,
      version: data.version,
      status: data.status,
      database_status: data.database_status,
      endpoints: data.endpoints
    };
  } catch (error) {
    console.error('Main API check failed:', error);
    return { 
      success: false, 
      error: error.message
    };
  }
};



