import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import './AssessmentHistory.css';

const AssessmentHistory = () => {
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Mock data for demonstration - in real app, this would come from API
  const mockAssessmentHistory = [
    {
      id: 1,
      assessmentType: 'Leadership Assessment',
      completedAt: '2024-01-15T10:30:00Z',
      score: 85,
      strengths: [
        'Strong communication skills',
        'Excellent team collaboration',
        'Strategic thinking abilities',
        'Adaptability in challenging situations'
      ],
      blindSpot: [
        'Delegation could be improved',
        'Time management optimization needed',
        'Public speaking confidence'
      ],
      insight: 'You demonstrate strong natural leadership qualities with excellent interpersonal skills. Your ability to connect with team members and think strategically positions you well for leadership roles. Focus on developing delegation skills and time management to enhance your effectiveness.',
      scripture: {
        text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.',
        reference: 'Jeremiah 29:11'
      },
      recommendations: 'Consider taking on more leadership responsibilities in group projects. Practice delegation by assigning specific tasks to team members and following up on progress.',
      actionPlan: '1. Join a leadership workshop, 2. Practice delegation weekly, 3. Set time management goals'
    },
    {
      id: 2,
      assessmentType: 'Career Development Assessment',
      completedAt: '2024-01-10T14:20:00Z',
      score: 78,
      strengths: [
        'Strong analytical skills',
        'Detail-oriented approach',
        'Problem-solving abilities'
      ],
      blindSpot: [
        'Networking opportunities',
        'Risk-taking in career decisions'
      ],
      insight: 'Your analytical mindset and attention to detail are valuable assets in any career path. Consider expanding your professional network and being more open to calculated risks in your career development.',
      scripture: {
        text: 'Commit to the Lord whatever you do, and he will establish your plans.',
        reference: 'Proverbs 16:3'
      }
    },
    {
      id: 3,
      assessmentType: 'Personal Growth Assessment',
      completedAt: '2024-01-05T09:15:00Z',
      score: 92,
      strengths: [
        'High emotional intelligence',
        'Self-awareness',
        'Growth mindset',
        'Resilience'
      ],
      blindSpot: [
        'Work-life balance',
        'Setting boundaries'
      ],
      insight: 'You show remarkable self-awareness and emotional intelligence. Your growth mindset is a significant strength. Focus on maintaining work-life balance and setting healthy boundaries.',
      scripture: {
        text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
        reference: 'Joshua 1:9'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch assessment history
    const fetchAssessmentHistory = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setAssessmentHistory(mockAssessmentHistory);
        setError(null);
      } catch (err) {
        setError('Failed to load assessment history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Transform assessment data to match LeadershipType format for PDF generation
  const transformAssessmentData = (assessment) => {
    return {
      id: assessment.id,
      assessmentType: assessment.assessmentType,
      completedAt: assessment.completedAt,
      createdAt: assessment.completedAt, // Fallback
      strengths: assessment.strengths,
      blindSpot: assessment.blindSpot,
      insight: assessment.insight,
      scripture: assessment.scripture,
      recommendations: assessment.recommendations,
      actionPlan: assessment.actionPlan,
      score: assessment.score
    };
  };

  // Generate filename for PDF download
  const generatePDFFilename = (assessment) => {
    const date = new Date(assessment.completedAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
    
    const assessmentType = assessment.assessmentType
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    
    return `${assessmentType}_${formattedDate}.pdf`;
  };

  // Handle viewing full results
  const handleViewFullResults = (assessment) => {
    setSelectedAssessment(assessment);
    // In a real app, this might navigate to a detailed view or open a modal
    alert(`Viewing full results for ${assessment.assessmentType} completed on ${new Date(assessment.completedAt).toLocaleDateString()}`);
  };

  // Handle viewing development plan
  const handleViewDevelopmentPlan = (assessment) => {
    // In a real app, this might navigate to a development plan page
    alert(`Opening development plan for ${assessment.assessmentType}`);
  };

  // Handle PDF generation start
  const handlePDFGenerationStart = () => {
    setPdfGenerating(true);
  };

  // Handle PDF generation complete - currently unused but kept for future use
  // eslint-disable-next-line no-unused-vars
  const handlePDFGenerationComplete = () => {
    setPdfGenerating(false);
  };

  if (loading) {
    return (
      <div className="assessment-history-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading assessment history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assessment-history-container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-history-container">
      <div className="assessment-history-header">
        <h1>Assessment History</h1>
        <p>Review your past assessments and download detailed reports</p>
      </div>

      <div className="assessment-history-content">
        {assessmentHistory.length === 0 ? (
          <div className="no-assessments">
            <i className="fas fa-clipboard-list"></i>
            <h3>No Assessments Found</h3>
            <p>You haven't completed any assessments yet. Take your first assessment to see your results here.</p>
            <button className="take-assessment-button">
              Take Assessment
            </button>
          </div>
        ) : (
          <div className="assessments-grid">
            {assessmentHistory.map((assessment, index) => (
              <div key={assessment.id} className="assessment-card">
                <div className="assessment-card-header">
                  <h3>{assessment.assessmentType}</h3>
                  <div className="assessment-score">
                    <span className="score-label">Score:</span>
                    <span className="score-value">{assessment.score}/100</span>
                  </div>
                </div>

                <div className="assessment-card-body">
                  <div className="assessment-date">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Completed: {new Date(assessment.completedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>

                  <div className="assessment-preview">
                    <div className="preview-section">
                      <h4>Key Strengths:</h4>
                      <ul>
                        {assessment.strengths.slice(0, 2).map((strength, idx) => (
                          <li key={idx}>{strength}</li>
                        ))}
                        {assessment.strengths.length > 2 && (
                          <li>... and {assessment.strengths.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="assessment-card-actions">
                  <button 
                    className="view-results-btn"
                    onClick={() => handleViewFullResults(assessment)}
                  >
                    <i className="fas fa-eye"></i>
                    View Full Results
                  </button>
                  
                  <button 
                    className="development-plan-btn"
                    onClick={() => handleViewDevelopmentPlan(assessment)}
                  >
                    <i className="fas fa-route"></i>
                    View Development Plan
                  </button>

                  <PDFDownloadLink
                    document={<PDFDocument assessment={transformAssessmentData(assessment)} userInfo={{ name: 'Current User' }} />}
                    fileName={generatePDFFilename(assessment)}
                    className="pdf-download-btn"
                    onClick={handlePDFGenerationStart}
                  >
                    {({ blob, url, loading: pdfLoading, error: pdfError }) => {
                      if (pdfLoading) {
                        return (
                          <span className="pdf-loading">
                            <i className="fas fa-spinner fa-spin"></i>
                            Generating PDF...
                          </span>
                        );
                      }
                      
                      if (pdfError) {
                        return (
                          <span className="pdf-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            PDF Error
                          </span>
                        );
                      }

                      return (
                        <span className="pdf-ready">
                          <i className="fas fa-download"></i>
                          Download PDF
                        </span>
                      );
                    }}
                  </PDFDownloadLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pdfGenerating && (
        <div className="pdf-generation-overlay">
          <div className="pdf-generation-modal">
            <div className="pdf-generation-spinner">
              <i className="fas fa-file-pdf fa-3x"></i>
              <div className="spinner"></div>
            </div>
            <h3>Generating PDF Report</h3>
            <p>Please wait while we prepare your assessment report...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentHistory;