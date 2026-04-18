// src/services/analyticsService.js - Analytics API Integration
import apiClient from './apiClient';
import { API_CONFIG } from '../config/api';

export const analyticsService = {
  // Save analytics point to backend
  saveAnalyticsPoint: async (analyticsData) => {
    try {
      console.log('📊 Saving analytics point to backend:', analyticsData);
      
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.ANALYTICS_SAVE, {
        input_text: analyticsData.input_text,
        anxiety_level: analyticsData.anxiety_level,
        confidence_score: analyticsData.confidence_score,
        anxiety_detected: analyticsData.anxiety_detected,
        raw_score: analyticsData.raw_score,
        binary_prediction: analyticsData.binary_prediction,
        found_keywords: analyticsData.found_keywords,
        processing_time_ms: analyticsData.processing_time_ms,
        recommendation_urdu: analyticsData.recommendation_urdu,
        recommendation_english: analyticsData.recommendation_english,
        session_id: analyticsData.session_id
      });
      
      if (response.data.success) {
        console.log('✅ Analytics point saved successfully:', response.data);
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to save analytics point');
      }
    } catch (error) {
      console.error('❌ Save analytics error:', error);
      throw error;
    }
  },

  // Get user analytics for charts
  getUserAnalytics: async (limit = 50) => {
    try {
      console.log('📈 Fetching user analytics from backend...');
      
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.ANALYTICS_USER}?limit=${limit}`);
      
      if (response.data.success) {
        console.log('✅ Analytics retrieved successfully:', response.data.analytics.length, 'points');
        return response.data.analytics;
      } else {
        throw new Error(response.data.error || 'Failed to fetch analytics');
      }
    } catch (error) {
      console.error('❌ Get analytics error:', error);
      // Return empty array as fallback
      return [];
    }
  },

  // Get analytics summary
  getAnalyticsSummary: async (days = 30) => {
    try {
      console.log(`📊 Fetching analytics summary for ${days} days...`);
      
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.ANALYTICS_SUMMARY}?days=${days}`);
      
      if (response.data.success) {
        console.log('✅ Analytics summary retrieved:', response.data.summary);
        return response.data.summary;
      } else {
        throw new Error(response.data.error || 'Failed to fetch analytics summary');
      }
    } catch (error) {
      console.error('❌ Get analytics summary error:', error);
      return {
        total_analyses: 0,
        anxiety_detection_rate: 0,
        average_confidence: 0,
        level_distribution: {},
        recent_trend: 'no_data'
      };
    }
  },

  // Get report data for PDF generation
  getReportData: async (limit = 100) => {
    try {
      console.log('📄 Fetching report data from backend...');
      
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.ANALYTICS_REPORT_DATA}?limit=${limit}`);
      
      if (response.data.success) {
        console.log('✅ Report data retrieved successfully');
        return response.data.report_data;
      } else {
        throw new Error(response.data.error || 'Failed to fetch report data');
      }
    } catch (error) {
      console.error('❌ Get report data error:', error);
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
          timestamp: data.timestamp
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Clear analytics (for testing)
  clearAnalytics: async () => {
    try {
      console.log('🗑️ Clearing analytics data...');
      
      const response = await apiClient.delete(API_CONFIG.ENDPOINTS.ANALYTICS_CLEAR);
      
      if (response.data.success) {
        console.log('✅ Analytics cleared successfully');
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to clear analytics');
      }
    } catch (error) {
      console.error('❌ Clear analytics error:', error);
      throw error;
    }
  }
};