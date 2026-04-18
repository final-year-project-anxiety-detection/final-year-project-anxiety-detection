// src/Components/Share.jsx - Share Page with PDF Reports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShare, 
  FaFilePdf, 
  FaDownload, 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin,
  FaChartBar,
  FaCalendar,
  FaUser,
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCopy,
  FaEye,
  FaSync
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { reportsService } from '../services/reportsService';
import { analyticsService } from '../services/analytics_service';

const Share = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [error, setError] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Load analytics data on component mount
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      console.log('📊 Loading analytics data for share page...');
      
      // Get analytics data and report data
      const [analytics, reportDataResponse] = await Promise.all([
        analyticsService.getUserAnalytics(100),
        reportsService.getUserAnalyticsForReport()
      ]);
      
      setAnalyticsData(analytics);
      setReportData(reportDataResponse);
      
      console.log('✅ Analytics data loaded:', analytics.length, 'records');
      
    } catch (error) {
      console.error('❌ Failed to load analytics data:', error);
      setError('Failed to load analytics data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDFReport = async () => {
    try {
      setIsGeneratingPDF(true);
      setError('');
      
      console.log('📄 Generating PDF report...');
      
      const result = await reportsService.generatePDFReport();
      
      if (result.success) {
        setGeneratedReport(result);
        setShareUrl(`${window.location.origin}${result.download_url}`);
        console.log('✅ PDF report generated:', result);
      } else {
        throw new Error(result.error || 'Failed to generate PDF');
      }
      
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      setError(`Failed to generate PDF report: ${error.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const downloadReport = () => {
    if (generatedReport) {
      window.open(shareUrl, '_blank');
    }
  };

  const shareOnWhatsApp = () => {
    if (generatedReport) {
      const message = `Check out my mental health analysis report: ${shareUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const shareOnFacebook = () => {
    if (generatedReport) {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(facebookUrl, '_blank');
    }
  };

  const shareOnTwitter = () => {
    if (generatedReport) {
      const text = 'Check out my mental health analysis report';
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  const shareOnLinkedIn = () => {
    if (generatedReport) {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      window.open(linkedinUrl, '_blank');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getAnxietyColor = (level) => {
    const colors = {
      'normal': '#10B981',
      'mild': '#3B82F6',
      'moderate': '#F59E0B',
      'severe': '#EF4444',
      'panic': '#7C2D12'
    };
    return colors[level?.toLowerCase()] || '#6B7280';
  };

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

  const getPieChartData = () => {
    if (!analyticsData || analyticsData.length === 0) return [];
    
    const distribution = analyticsData.reduce((acc, item) => {
      const level = item.anxietyLevelText;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    const total = analyticsData.length;
    return Object.entries(distribution).map(([level, count]) => ({
      name: getAnxietyLabel(level),
      value: ((count / total) * 100),
      color: getAnxietyColor(level),
      count: count
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your mental health analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaShare className="inline-block mr-3 text-blue-500" />
            Share Your Mental Health Report
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate and share your comprehensive mental health analysis report with healthcare professionals or trusted individuals.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Report Generation Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaFilePdf className="text-red-500 mr-2" />
                PDF Report Generation
              </h2>
              <p className="text-gray-600 mt-1">
                Generate a comprehensive PDF report of your mental health analytics
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={loadAnalyticsData}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                disabled={isLoading}
              >
                <FaSync className="mr-2" />
                Refresh Data
              </button>
              <button
                onClick={generatePDFReport}
                disabled={isGeneratingPDF || !analyticsData || analyticsData.length === 0}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                {isGeneratingPDF ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FaFilePdf className="mr-2" />
                    Generate PDF Report
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Report Status */}
          {generatedReport && (
            <motion.div 
              className="bg-green-50 border border-green-200 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <div>
                    <p className="text-green-800 font-medium">Report Generated Successfully!</p>
                    <p className="text-green-600 text-sm">{generatedReport.filename}</p>
                  </div>
                </div>
                <button
                  onClick={downloadReport}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Analytics Summary */}
        {reportData && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaUser className="text-blue-500 mr-2" />
              Your Mental Health Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {reportData.analytics_summary?.total_analyses || 0}
                </div>
                <div className="text-sm text-gray-600">Total Analyses</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {reportData.analytics_summary?.average_confidence || 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Confidence</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {reportData.analytics_summary?.anxiety_detection_rate || 0}%
                </div>
                <div className="text-sm text-gray-600">Anxiety Detection</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {reportData.analytics_summary?.recent_trend || 'Stable'}
                </div>
                <div className="text-sm text-gray-600">Recent Trend</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Visualization */}
        {analyticsData && analyticsData.length > 0 && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaChartBar className="text-green-500 mr-2" />
              Analytics Visualization
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Anxiety Level Trend */}
              <div>
                <h3 className="text-lg font-medium mb-4">Anxiety Level Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analyticsData.slice(-10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="anxietyLevel" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Anxiety Distribution */}
              <div>
                <h3 className="text-lg font-medium mb-4">Anxiety Level Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={getPieChartData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ value }) => `${value.toFixed(1)}%`}
                    >
                      {getPieChartData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Analysis Records */}
        {reportData && reportData.detailed_analytics && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaCalendar className="text-purple-500 mr-2" />
              Recent Analysis Records
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date/Time</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Input Text</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Anxiety Level</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.detailed_analytics.slice(0, 10).map((record, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-600">{record.timestamp}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {record.input_text.length > 50 
                          ? record.input_text.substring(0, 50) + '...' 
                          : record.input_text}
                      </td>
                      <td className="px-4 py-2">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: getAnxietyColor(record.anxiety_level) + '20',
                            color: getAnxietyColor(record.anxiety_level)
                          }}
                        >
                          {getAnxietyLabel(record.anxiety_level)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {record.confidence_score.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Share Options */}
        {generatedReport && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaShare className="text-blue-500 mr-2" />
              Share Your Report
            </h2>

            {/* Share URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center"
                >
                  {showCopySuccess ? <FaCheckCircle /> : <FaCopy />}
                </button>
              </div>
              {showCopySuccess && (
                <p className="text-green-600 text-sm mt-1">Copied to clipboard!</p>
              )}
            </div>

            {/* Social Media Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={shareOnWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </button>
              <button
                onClick={shareOnFacebook}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <FaFacebook className="mr-2" />
                Facebook
              </button>
              <button
                onClick={shareOnTwitter}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <FaTwitter className="mr-2" />
                Twitter
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <FaLinkedin className="mr-2" />
                LinkedIn
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> This report contains your personal mental health data. 
                Please share only with trusted healthcare professionals or individuals.
              </p>
            </div>
          </motion.div>
        )}

        {/* No Data Message */}
        {(!analyticsData || analyticsData.length === 0) && !isLoading && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaChartBar className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Analytics Data Available</h3>
            <p className="text-gray-600 mb-4">
              Start using the AI Assistant to generate mental health analytics that you can share.
            </p>
            <button
              onClick={() => window.location.href = '/assistant'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to AI Assistant
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Share;