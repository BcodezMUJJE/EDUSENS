import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 5,
  },
  sectionContent: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#2c3e50',
    textAlign: 'justify',
  },
  strengthsList: {
    marginTop: 10,
  },
  strengthItem: {
    fontSize: 12,
    color: '#27ae60',
    marginBottom: 5,
    paddingLeft: 10,
  },
  blindSpotItem: {
    fontSize: 12,
    color: '#e74c3c',
    marginBottom: 5,
    paddingLeft: 10,
  },
  scriptureSection: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  scriptureText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#2c3e50',
  },
  scriptureReference: {
    fontSize: 10,
    color: '#7f8c8d',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 10,
  },
});

const PDFDocument = ({ assessment, userInfo }) => {
  // Ensure assessment data exists
  if (!assessment) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Assessment Report</Text>
            <Text style={styles.subtitle}>No assessment data available</Text>
          </View>
        </Page>
      </Document>
    );
  }

  const formatDate = (date) => {
    if (!date) return 'Unknown Date';
    const assessmentDate = new Date(date);
    return assessmentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Leadership Assessment Report</Text>
          <Text style={styles.subtitle}>
            Assessment Type: {assessment.assessmentType || 'Leadership Assessment'}
          </Text>
          <Text style={styles.subtitle}>
            Date: {formatDate(assessment.completedAt || assessment.createdAt)}
          </Text>
          {userInfo && (
            <Text style={styles.subtitle}>
              Participant: {userInfo.name || userInfo.displayName || 'Anonymous'}
            </Text>
          )}
        </View>

        {/* Strengths Section */}
        {assessment.strengths && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Strengths</Text>
            <View style={styles.strengthsList}>
              {Array.isArray(assessment.strengths) ? (
                assessment.strengths.map((strength, index) => (
                  <Text key={index} style={styles.strengthItem}>
                    • {strength}
                  </Text>
                ))
              ) : (
                <Text style={styles.sectionContent}>{assessment.strengths}</Text>
              )}
            </View>
          </View>
        )}

        {/* Blind Spots Section */}
        {assessment.blindSpot && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Areas for Development</Text>
            <View style={styles.strengthsList}>
              {Array.isArray(assessment.blindSpot) ? (
                assessment.blindSpot.map((spot, index) => (
                  <Text key={index} style={styles.blindSpotItem}>
                    • {spot}
                  </Text>
                ))
              ) : (
                <Text style={styles.sectionContent}>{assessment.blindSpot}</Text>
              )}
            </View>
          </View>
        )}

        {/* Insights Section */}
        {assessment.insight && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Insights</Text>
            <Text style={styles.sectionContent}>{assessment.insight}</Text>
          </View>
        )}

        {/* Scripture Section */}
        {assessment.scripture && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inspirational Scripture</Text>
            <View style={styles.scriptureSection}>
              <Text style={styles.scriptureText}>
                {assessment.scripture.text || assessment.scripture}
              </Text>
              {assessment.scripture.reference && (
                <Text style={styles.scriptureReference}>
                  - {assessment.scripture.reference}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Additional Assessment Data */}
        {assessment.recommendations && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <Text style={styles.sectionContent}>{assessment.recommendations}</Text>
          </View>
        )}

        {assessment.actionPlan && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Action Plan</Text>
            <Text style={styles.sectionContent}>{assessment.actionPlan}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by EduSens Leadership Assessment Platform - {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;