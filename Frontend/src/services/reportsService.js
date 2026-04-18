// src/services/reportsService.js - PDF Reports Service
import apiClient from './apiClient';
import { API_CONFIG } from '../config/api';

export const reportsService = {
  // Get user analytics data formatted for PDF report
  getUserAnalyticsForReport: async (limit = 100) => {
    try {
      console.log('📊 Fetching user analytics for PDF report...');
      
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.REPORTS_USER_ANALYTICS}?limit=${limit}`);
      
      if (response.data.success) {
        console.log('✅ User analytics for report retrieved successfully');
        return response.data.report_data;
      } else {
        throw new Error(response.data.error || 'Failed to fetch analytics for report');
      }
    } catch (error) {
      console.error('❌ Get user analytics for report error:', error);
      throw error;
    }
  },

  // Generate PDF report
  generatePDFReport: async () => {
    try {
      console.log('📄 Generating PDF report...');
      
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.REPORTS_GENERATE_PDF);
      
      if (response.data.success) {
        console.log('✅ PDF report generated successfully:', response.data);
        return {
          success: true,
          report_id: response.data.report_id,
          filename: response.data.filename,
          download_url: response.data.download_url,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.error || 'Failed to generate PDF report');
      }
    } catch (error) {
      console.error('❌ PDF generation error:', error);
      throw error;
    }
  },

  // Download generated report
  downloadReport: async (reportId) => {
    try {
      console.log('📥 Downloading report:', reportId);
      
      const downloadUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REPORTS_DOWNLOAD}/${reportId}`;
      
      // Open in new tab for download
      window.open(downloadUrl, '_blank');
      
      return {
        success: true,
        download_url: downloadUrl
      };
    } catch (error) {
      console.error('❌ Download report error:', error);
      throw error;
    }
  },

  // Get sharing information for a report
  getShareInfo: async (reportId) => {
    try {
      console.log('🔗 Getting share info for report:', reportId);
      
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.REPORTS_SHARE_INFO, {
        report_id: reportId
      });
      
      if (response.data.success) {
        console.log('✅ Share info retrieved:', response.data.share_info);
        return response.data.share_info;
      } else {
        throw new Error(response.data.error || 'Failed to get share info');
      }
    } catch (error) {
      console.error('❌ Get share info error:', error);
      throw error;
    }
  },

  // List user's generated reports
  listUserReports: async () => {
    try {
      console.log('📋 Fetching user reports list...');
      
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.REPORTS_LIST);
      
      if (response.data.success) {
        console.log('✅ User reports retrieved:', response.data.reports.length, 'reports');
        return response.data.reports;
      } else {
        throw new Error(response.data.error || 'Failed to fetch reports');
      }
    } catch (error) {
      console.error('❌ List reports error:', error);
      return [];
    }
  },

  // Share on WhatsApp
  shareOnWhatsApp: (shareUrl, customMessage = null) => {
    try {
      const message = customMessage || `Check out my mental health analysis report: ${shareUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      
      console.log('📱 Sharing on WhatsApp:', whatsappUrl);
      window.open(whatsappUrl, '_blank');
      
      return { success: true };
    } catch (error) {
      console.error('❌ WhatsApp share error:', error);
      throw error;
    }
  },

  // Share on Facebook
  shareOnFacebook: (shareUrl) => {
    try {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      
      console.log('📘 Sharing on Facebook:', facebookUrl);
      window.open(facebookUrl, '_blank');
      
      return { success: true };
    } catch (error) {
      console.error('❌ Facebook share error:', error);
      throw error;
    }
  },

  // Share on Twitter
  shareOnTwitter: (shareUrl, customText = null) => {
    try {
      const text = customText || 'Check out my mental health analysis report';
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      
      console.log('🐦 Sharing on Twitter:', twitterUrl);
      window.open(twitterUrl, '_blank');
      
      return { success: true };
    } catch (error) {
      console.error('❌ Twitter share error:', error);
      throw error;
    }
  },

  // Share on LinkedIn
  shareOnLinkedIn: (shareUrl) => {
    try {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      
      console.log('💼 Sharing on LinkedIn:', linkedinUrl);
      window.open(linkedinUrl, '_blank');
      
      return { success: true };
    } catch (error) {
      console.error('❌ LinkedIn share error:', error);
      throw error;
    }
  },

  // Share via Email
  shareViaEmail: (shareUrl, subject = null, body = null) => {
    try {
      const emailSubject = subject || 'Mental Health Analysis Report';
      const emailBody = body || `Please find my mental health analysis report at: ${shareUrl}`;
      const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      console.log('✉️ Sharing via Email');
      window.open(emailUrl, '_blank');
      
      return { success: true };
    } catch (error) {
      console.error('❌ Email share error:', error);
      throw error;
    }
  },

  // Copy to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('📋 Copied to clipboard successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Copy to clipboard error:', error);
      throw error;
    }
  },

  // Generate shareable link with custom message
  generateShareableLink: (reportId, customMessage = null) => {
    try {
      const baseUrl = window.location.origin;
      const reportUrl = `${baseUrl}/api/reports/download/${reportId}`;
      
      const shareData = {
        url: reportUrl,
        message: customMessage || `Check out my mental health analysis report`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${customMessage || 'Check out my mental health analysis report'}: ${reportUrl}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reportUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage || 'Check out my mental health analysis report')}&url=${encodeURIComponent(reportUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`,
        email: `mailto:?subject=${encodeURIComponent('Mental Health Analysis Report')}&body=${encodeURIComponent(`${customMessage || 'Please find my mental health analysis report at'}: ${reportUrl}`)}`
      };
      
      return shareData;
    } catch (error) {
      console.error('❌ Generate shareable link error:', error);
      throw error;
    }
  },

  // Test reports service connection
  testConnection: async () => {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.REPORTS_HEALTH);
      
      if (response.data.success) {
        return {
          success: true,
          data: {
            status: response.data.status,
            pdf_generator: response.data.pdf_generator,
            active_reports: response.data.active_reports,
            timestamp: response.data.timestamp
          }
        };
      } else {
        throw new Error(response.data.error || 'Reports service test failed');
      }
    } catch (error) {
      console.error('❌ Reports service test failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Cleanup old reports (admin function)
  cleanupReports: async () => {
    try {
      console.log('🗑️ Cleaning up old reports...');
      
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.REPORTS_CLEANUP);
      
      if (response.data.success) {
        console.log('✅ Reports cleanup successful:', response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to cleanup reports');
      }
    } catch (error) {
      console.error('❌ Reports cleanup error:', error);
      throw error;
    }
  }
};