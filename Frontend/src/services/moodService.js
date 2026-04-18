// // src/services/moodService.js - Enhanced Backend Integration
// import apiClient from './apiClient';
// import { API_CONFIG } from '../config/api';

// export const moodService = {
//   // Submit mood with backend integration and localStorage fallback
//   submitMood: async (moodType, useBackend = true) => {
//     console.log('🎭 Submitting mood:', moodType);
    
//     if (useBackend) {
//       try {
//         const response = await apiClient.post(API_CONFIG.ENDPOINTS.SUBMIT_MOOD, {
//           mood_type: moodType,
//           timestamp: new Date().toISOString()
//         });
        
//         console.log('✅ Backend mood submission successful:', response.data);
        
//         // Also store in localStorage as backup
//         moodService.storeMoodLocally(moodType);
        
//         return {
//           success: true,
//           data: response.data,
//           source: 'backend'
//         };
//       } catch (error) {
//         console.warn('⚠️ Backend mood submission failed, using localStorage fallback:', error.message);
        
//         // Fallback to localStorage
//         return moodService.storeMoodLocally(moodType);
//       }
//     } else {
//       // Direct localStorage storage
//       return moodService.storeMoodLocally(moodType);
//     }
//   },

//   // Store mood locally (fallback method)
//   storeMoodLocally: (moodType) => {
//     try {
//       const moodEntry = {
//         id: Date.now(),
//         mood_type: moodType,
//         timestamp: new Date().toISOString(),
//         date: new Date().toDateString()
//       };
      
//       // Get existing moods from localStorage
//       const existingMoods = JSON.parse(localStorage.getItem('mood_history') || '[]');
      
//       // Add new mood
//       existingMoods.unshift(moodEntry); // Add to beginning
      
//       // Keep only last 100 entries to avoid storage bloat
//       if (existingMoods.length > 100) {
//         existingMoods.splice(100);
//       }
      
//       // Store back to localStorage
//       localStorage.setItem('mood_history', JSON.stringify(existingMoods));
      
//       console.log('✅ Mood stored locally:', moodEntry);
      
//       return {
//         success: true,
//         data: {
//           mood: moodEntry,
//           message: 'Mood recorded successfully'
//         },
//         source: 'localStorage'
//       };
//     } catch (error) {
//       throw new Error('Failed to store mood locally: ' + error.message);
//     }
//   },

//   // Get mood history with backend integration and localStorage fallback
//   getMoodHistory: async (days = 30, limit = 100, useBackend = true) => {
//     console.log(`📊 Fetching mood history: ${days} days, limit ${limit}`);
    
//     if (useBackend) {
//       try {
//         const response = await apiClient.get(
//           `${API_CONFIG.ENDPOINTS.MOOD_HISTORY}?days=${days}&limit=${limit}`
//         );
        
//         console.log('✅ Backend mood history retrieved:', response.data);
//         return {
//           success: true,
//           data: response.data,
//           source: 'backend'
//         };
//       } catch (error) {
//         console.warn('⚠️ Backend mood history failed, using localStorage fallback:', error.message);
        
//         // Fallback to localStorage
//         return moodService.getMoodHistoryLocally(days, limit);
//       }
//     } else {
//       // Direct localStorage retrieval
//       return moodService.getMoodHistoryLocally(days, limit);
//     }
//   },

//   // Get mood history from localStorage (fallback method)
//   getMoodHistoryLocally: (days = 30, limit = 100) => {
//     try {
//       const allMoods = JSON.parse(localStorage.getItem('mood_history') || '[]');
      
//       // Filter by date range
//       const cutoffDate = new Date();
//       cutoffDate.setDate(cutoffDate.getDate() - days);
      
//       const filteredMoods = allMoods.filter(mood => {
//         const moodDate = new Date(mood.timestamp);
//         return moodDate >= cutoffDate;
//       });
      
//       // Apply limit
//       const limitedMoods = filteredMoods.slice(0, limit);
      
//       console.log(`✅ Local mood history retrieved: ${limitedMoods.length} entries`);
      
//       return {
//         success: true,
//         data: {
//           moods: limitedMoods,
//           total_count: limitedMoods.length,
//           days_range: days
//         },
//         source: 'localStorage'
//       };
//     } catch (error) {
//       throw new Error('Failed to retrieve local mood history: ' + error.message);
//     }
//   },

//   // Get mood summary with backend integration and localStorage fallback
//   getMoodSummary: async (useBackend = true) => {
//     console.log('📈 Fetching mood summary');
    
//     if (useBackend) {
//       try {
//         const response = await apiClient.get(API_CONFIG.ENDPOINTS.MOOD_SUMMARY);
        
//         console.log('✅ Backend mood summary retrieved:', response.data);
//         return {
//           success: true,
//           data: response.data,
//           source: 'backend'
//         };
//       } catch (error) {
//         console.warn('⚠️ Backend mood summary failed, using localStorage fallback:', error.message);
        
//         // Fallback to localStorage
//         return moodService.getMoodSummaryLocally();
//       }
//     } else {
//       // Direct localStorage summary calculation
//       return moodService.getMoodSummaryLocally();
//     }
//   },

//   // Calculate mood summary from localStorage (fallback method)
//   getMoodSummaryLocally: () => {
//     try {
//       const allMoods = JSON.parse(localStorage.getItem('mood_history') || '[]');
      
//       if (allMoods.length === 0) {
//         return {
//           success: true,
//           data: {
//             total_entries: 0,
//             mood_distribution: {},
//             recent_trend: 'neutral',
//             summary: 'No mood data available yet.'
//           },
//           source: 'localStorage'
//         };
//       }
      
//       // Calculate mood distribution
//       const moodCounts = {};
//       allMoods.forEach(mood => {
//         moodCounts[mood.mood_type] = (moodCounts[mood.mood_type] || 0) + 1;
//       });
      
//       // Find most common mood
//       const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
//         moodCounts[a] > moodCounts[b] ? a : b
//       );
      
//       // Get recent trend (last 7 entries)
//       const recentMoods = allMoods.slice(0, 7);
//       const recentMoodTypes = recentMoods.map(m => m.mood_type);
      
//       console.log('✅ Local mood summary calculated');
      
//       return {
//         success: true,
//         data: {
//           total_entries: allMoods.length,
//           mood_distribution: moodCounts,
//           most_common_mood: mostCommonMood,
//           recent_moods: recentMoodTypes,
//           recent_trend: mostCommonMood,
//           summary: `You've recorded ${allMoods.length} mood entries. Your most common mood is "${mostCommonMood}".`
//         },
//         source: 'localStorage'
//       };
//     } catch (error) {
//       throw new Error('Failed to calculate local mood summary: ' + error.message);
//     }
//   },

//   // Get mood options with backend integration and static fallback
//   getMoodOptions: async (useBackend = true) => {
//     console.log('🎨 Fetching mood options');
    
//     if (useBackend) {
//       try {
//         const response = await apiClient.get(API_CONFIG.ENDPOINTS.MOOD_OPTIONS);
        
//         console.log('✅ Backend mood options retrieved:', response.data);
//         return {
//           success: true,
//           data: response.data,
//           source: 'backend'
//         };
//       } catch (error) {
//         console.warn('⚠️ Backend mood options failed, using static fallback:', error.message);
        
//         // Fallback to static options
//         return moodService.getStaticMoodOptions();
//       }
//     } else {
//       // Direct static options
//       return moodService.getStaticMoodOptions();
//     }
//   },

//   // Static mood options (fallback method)
//   getStaticMoodOptions: () => {
//     const staticOptions = {
//       moods: [
//         { id: 1, name: 'excellent', emoji: '😄', color: '#10B981', label: 'Excellent' },
//         { id: 2, name: 'good', emoji: '😊', color: '#6366F1', label: 'Good' },
//         { id: 3, name: 'okay', emoji: '😐', color: '#F59E0B', label: 'Okay' },
//         { id: 4, name: 'bad', emoji: '😔', color: '#EF4444', label: 'Bad' },
//         { id: 5, name: 'terrible', emoji: '😢', color: '#DC2626', label: 'Terrible' },
//         { id: 6, name: 'anxious', emoji: '😰', color: '#8B5CF6', label: 'Anxious' },
//         { id: 7, name: 'stressed', emoji: '😤', color: '#F97316', label: 'Stressed' },
//         { id: 8, name: 'calm', emoji: '😌', color: '#06B6D4', label: 'Calm' }
//       ],
//       categories: ['positive', 'neutral', 'negative', 'anxiety-related']
//     };
    
//     console.log('✅ Static mood options provided');
    
//     return {
//       success: true,
//       data: staticOptions,
//       source: 'static'
//     };
//   },

//   // Clear all mood data (for testing/debugging)
//   clearAllMoodData: () => {
//     try {
//       localStorage.removeItem('mood_history');
//       console.log('🗑️ All local mood data cleared');
//       return { success: true, message: 'All mood data cleared successfully' };
//     } catch (error) {
//       throw new Error('Failed to clear mood data: ' + error.message);
//     }
//   },

//   // Get mood statistics (enhanced helper method)
//   getMoodStats: async (useBackend = true) => {
//     try {
//       const historyResult = await moodService.getMoodHistory(30, 100, useBackend);
      
//       if (!historyResult.success || !historyResult.data.moods) {
//         return { success: false, error: 'No mood data available' };
//       }
      
//       const moods = historyResult.data.moods;
//       const last7Days = moods.filter(mood => {
//         const moodDate = new Date(mood.timestamp);
//         const weekAgo = new Date();
//         weekAgo.setDate(weekAgo.getDate() - 7);
//         return moodDate >= weekAgo;
//       });
      
//       return {
//         success: true,
//         data: {
//           total_entries: moods.length,
//           last_7_days: last7Days.length,
//           most_recent: moods[0],
//           source: historyResult.source
//         }
//       };
//     } catch (error) {
//       throw new Error('Failed to get mood statistics: ' + error.message);
//     }
//   },

//   // Test backend connection
//   testConnection: async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/health');
//       const data = await response.json();
      
//       return {
//         success: true,
//         data: {
//           status: data.status,
//           database: data.database,
//           timestamp: data.timestamp
//         }
//       };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   }
// };
// src/services/moodService.js - FIXED Backend Integration
import apiClient from './apiClient';
import { API_CONFIG } from '../config/api';

export const moodService = {
  // Submit mood with backend integration and localStorage fallback
  submitMood: async (moodType, useBackend = true) => {
    console.log('🎭 Submitting mood:', moodType);
    
    if (useBackend) {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch('http://127.0.0.1:8000/api/mood/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            mood_type: moodType
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Backend mood submission successful:', result);
        
        // Also store in localStorage as backup
        moodService.storeMoodLocally(moodType);
        
        return {
          success: true,
          data: result,
          source: 'backend'
        };
      } catch (error) {
        console.warn('⚠️ Backend mood submission failed, using localStorage fallback:', error.message);
        
        // Fallback to localStorage
        return moodService.storeMoodLocally(moodType);
      }
    } else {
      // Direct localStorage storage
      return moodService.storeMoodLocally(moodType);
    }
  },

  // Store mood locally (fallback method)
  storeMoodLocally: (moodType) => {
    try {
      const moodEntry = {
        id: Date.now(),
        mood_type: moodType,
        mood_emoji: moodService.getMoodEmoji(moodType),
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
      };
      
      // Get existing moods from localStorage
      const existingMoods = JSON.parse(localStorage.getItem('mood_history') || '[]');
      
      // Add new mood
      existingMoods.unshift(moodEntry); // Add to beginning
      
      // Keep only last 100 entries to avoid storage bloat
      if (existingMoods.length > 100) {
        existingMoods.splice(100);
      }
      
      // Store back to localStorage
      localStorage.setItem('mood_history', JSON.stringify(existingMoods));
      
      console.log('✅ Mood stored locally:', moodEntry);
      
      return {
        success: true,
        data: {
          mood_id: moodEntry.id,
          mood_type: moodEntry.mood_type,
          message: 'Mood recorded successfully'
        },
        source: 'localStorage'
      };
    } catch (error) {
      throw new Error('Failed to store mood locally: ' + error.message);
    }
  },

  // Get mood history with backend integration and localStorage fallback
  getMoodHistory: async (limit = 50, useBackend = true) => {
    console.log(`📊 Fetching mood history: limit ${limit}`);
    
    if (useBackend) {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch(`http://127.0.0.1:8000/api/mood/history?limit=${limit}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Backend mood history retrieved:', result);
        
        return {
          success: true,
          data: result.data,
          source: 'backend'
        };
      } catch (error) {
        console.warn('⚠️ Backend mood history failed, using localStorage fallback:', error.message);
        
        // Fallback to localStorage
        return moodService.getMoodHistoryLocally(limit);
      }
    } else {
      // Direct localStorage retrieval
      return moodService.getMoodHistoryLocally(limit);
    }
  },

  // Get mood history from localStorage (fallback method)
  getMoodHistoryLocally: (limit = 50) => {
    try {
      const allMoods = JSON.parse(localStorage.getItem('mood_history') || '[]');
      
      // Apply limit
      const limitedMoods = allMoods.slice(0, limit);
      
      console.log(`✅ Local mood history retrieved: ${limitedMoods.length} entries`);
      
      return {
        success: true,
        data: {
          moods: limitedMoods,
          total: limitedMoods.length
        },
        source: 'localStorage'
      };
    } catch (error) {
      throw new Error('Failed to retrieve local mood history: ' + error.message);
    }
  },

  // Get mood analytics with backend integration
  getMoodAnalytics: async (days = 30, useBackend = true) => {
    console.log(`📈 Fetching mood analytics for ${days} days`);
    
    if (useBackend) {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch(`http://127.0.0.1:8000/api/mood/analytics?days=${days}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Backend mood analytics retrieved:', result);
        
        return {
          success: true,
          data: result.analytics,
          source: 'backend'
        };
      } catch (error) {
        console.warn('⚠️ Backend mood analytics failed, using localStorage fallback:', error.message);
        
        // Fallback to localStorage
        return moodService.getMoodAnalyticsLocally(days);
      }
    } else {
      // Direct localStorage analytics calculation
      return moodService.getMoodAnalyticsLocally(days);
    }
  },

  // Calculate mood analytics from localStorage (fallback method)
  getMoodAnalyticsLocally: (days = 30) => {
    try {
      const allMoods = JSON.parse(localStorage.getItem('mood_history') || '[]');
      
      if (allMoods.length === 0) {
        return {
          success: true,
          data: {
            total_entries: 0,
            average_mood: 0,
            mood_distribution: {},
            mood_trend: 'neutral'
          },
          source: 'localStorage'
        };
      }
      
      // Filter by date range
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const filteredMoods = allMoods.filter(mood => {
        const moodDate = new Date(mood.timestamp);
        return moodDate >= cutoffDate;
      });
      
      // Calculate mood distribution
      const moodCounts = {};
      const moodScores = { 'very_bad': 1, 'bad': 2, 'ok': 3, 'good': 4, 'very_good': 5 };
      let totalScore = 0;
      
      filteredMoods.forEach(mood => {
        moodCounts[mood.mood_type] = (moodCounts[mood.mood_type] || 0) + 1;
        totalScore += moodScores[mood.mood_type] || 3;
      });
      
      const averageMood = filteredMoods.length > 0 ? totalScore / filteredMoods.length : 0;
      
      // Convert to percentages
      const moodDistribution = {};
      Object.keys(moodCounts).forEach(moodType => {
        moodDistribution[moodType] = Math.round((moodCounts[moodType] / filteredMoods.length) * 100);
      });
      
      console.log('✅ Local mood analytics calculated');
      
      return {
        success: true,
        data: {
          total_entries: filteredMoods.length,
          average_mood: Math.round(averageMood * 100) / 100,
          mood_distribution: moodDistribution,
          period_days: days,
          mood_trend: averageMood > 3 ? 'improving' : averageMood === 3 ? 'stable' : 'needs_attention'
        },
        source: 'localStorage'
      };
    } catch (error) {
      throw new Error('Failed to calculate local mood analytics: ' + error.message);
    }
  },

  // Helper function to get mood emoji
  getMoodEmoji: (moodType) => {
    const emojiMap = {
      'very_good': '😊',
      'good': '🙂',
      'ok': '😐',
      'bad': '😔',
      'very_bad': '😢'
    };
    return emojiMap[moodType] || '😐';
  },

  // Validate mood type
  validateMoodType: (moodType) => {
    const validMoods = ['very_good', 'good', 'ok', 'bad', 'very_bad'];
    return validMoods.includes(moodType);
  },

  // Clear all mood data (for testing/debugging)
  clearAllMoodData: () => {
    try {
      localStorage.removeItem('mood_history');
      console.log('🗑️ All local mood data cleared');
      return { success: true, message: 'All mood data cleared successfully' };
    } catch (error) {
      throw new Error('Failed to clear mood data: ' + error.message);
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
  }
};