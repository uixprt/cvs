import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { CVData, Experience, Role } from '@/types/cv';
import { THEME_COLORS } from '@/theme/colors';

// Register Rubik fonts
Font.register({
  family: 'Rubik',
  fonts: [
    { src: '/fonts/Rubik-Light.ttf', fontWeight: 300 },
    { src: '/fonts/Rubik-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Rubik-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Rubik-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Rubik-Bold.ttf', fontWeight: 700 },
  ]
});

interface CVDocumentPDFProps {
  cvData: CVData;
}

const CVDocumentPDF: React.FC<CVDocumentPDFProps> = ({ cvData }) => {
  // Use the same theme logic as the web components
  const theme = cvData.profile.includes('Frontend') ? THEME_COLORS.frontend : THEME_COLORS.sdet;
  
  // Create styles that match the print layout exactly
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Rubik',
      backgroundColor: '#ffffff',
      padding: '25pt 18pt 18pt 18pt', // Matching print margins: 0.35in top, 0.25in sides/bottom
      color: '#333333',
      fontSize: 11,
      lineHeight: 1.4,
    },
    
    // Profile Header - matches the gradient card in print
    profileHeader: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 16,
      textAlign: 'center',
      marginBottom: 8,
      color: '#ffffff',
    },
    
    profileName: {
      fontSize: 26,
      fontWeight: 700,
      marginBottom: 8,
      color: '#ffffff',
    },
    
    profileHeadline: {
      fontSize: 14,
      fontWeight: 500,
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 4,
      marginBottom: 8,
      color: '#ffffff',
    },
    
    // Contact Info Container
    contactContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 12,
      marginTop: 8,
    },
    
    contactItem: {
      fontSize: 11,
      color: '#ffffff',
    },
    
    contactLink: {
      fontSize: 11,
      color: '#ffffff',
      textDecoration: 'underline',
    },
    
    // Main Content Container
    mainContent: {
      paddingTop: 8,
    },
    
    // Section Titles
    sectionTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.primary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    
    // Professional Summary
    summaryText: {
      fontSize: 12,
      lineHeight: 1.4,
      color: '#333333',
      marginBottom: 12,
      textAlign: 'justify',
    },
    
    // Divider
    divider: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 12,
    },
    
    // Skills Section
    skillsContainer: {
      marginBottom: 12,
    },
    
    skillCategory: {
      fontSize: 11,
      lineHeight: 1.3,
      color: '#333333',
      marginBottom: 6,
    },
    
    skillCategoryName: {
      fontWeight: 600,
      textTransform: 'capitalize',
    },
    
    // Experience Section
    experienceContainer: {
      marginBottom: 12,
    },
    
    companyCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: 6,
      padding: 12,
      marginBottom: 12,
      border: `1pt solid ${theme.primary}33`,
    },
    
    companyHeader: {
      marginBottom: 8,
    },
    
    companyName: {
      fontSize: 14,
      fontWeight: 600,
      color: '#333333',
      marginBottom: 4,
    },
    
    companyLocation: {
      fontSize: 10,
      color: '#666666',
      marginBottom: 2,
    },
    
    companyTenure: {
      fontSize: 10,
      fontWeight: 600,
      color: theme.primary,
    },
    
    // Role Cards
    roleCard: {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      padding: 10,
      marginBottom: 8,
      border: `1pt solid ${theme.primary}33`,
    },
    
    roleTitle: {
      fontSize: 12,
      fontWeight: 500,
      color: '#333333',
      marginBottom: 4,
    },
    
    roleDuration: {
      fontSize: 10,
      color: '#666666',
      marginBottom: 6,
    },
    
    // Responsibilities
    responsibilityItem: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'flex-start',
    },
    
    bullet: {
      fontSize: 10,
      color: theme.primary,
      fontWeight: 600,
      marginRight: 8,
      marginTop: 1,
    },
    
    responsibilityText: {
      fontSize: 10,
      lineHeight: 1.3,
      color: '#333333',
      flex: 1,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>
            {cvData.personalInfo.name}
          </Text>
          
          <Text style={styles.profileHeadline}>
            {cvData.headline}
          </Text>
          
          {/* Contact Information */}
          <View style={styles.contactContainer}>
            <Text style={styles.contactItem}>
              {cvData.personalInfo.contact.email}
            </Text>
            <Text style={styles.contactItem}>
              {cvData.personalInfo.contact.phone}
            </Text>
            <Text style={styles.contactItem}>
              {cvData.personalInfo.location}
            </Text>
            {cvData.personalInfo.contact.linkedin && (
              <Link src={cvData.personalInfo.contact.linkedin} style={styles.contactLink}>
                <Text style={styles.contactLink}>
                  LinkedIn Profile
                </Text>
              </Link>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Professional Summary */}
          <Text style={styles.sectionTitle}>
            Professional Summary
          </Text>
          <Text style={styles.summaryText}>
            {cvData.summary}
          </Text>
          
          <View style={styles.divider} />
          
          {/* Skills & Expertise */}
          <Text style={styles.sectionTitle}>
            Skills & Expertise
          </Text>
          <View style={styles.skillsContainer}>
            {Object.entries(cvData.skills).map(([category, skills]: [string, string[]], index) => (
              <Text key={index} style={styles.skillCategory}>
                <Text style={styles.skillCategoryName}>
                  {category.replace(/_/g, ' ')}:
                </Text>
                {' ' + skills.join(', ')}
              </Text>
            ))}
          </View>
          
          <View style={styles.divider} />
          
          {/* Professional Experience */}
          <Text style={styles.sectionTitle}>
            Professional Experience
          </Text>
          <View style={styles.experienceContainer}>
            {cvData.experience.map((company: Experience, companyIndex: number) => (
              <View key={companyIndex} style={styles.companyCard}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>
                    {company.company}
                  </Text>
                  <Text style={styles.companyLocation}>
                    {company.location}
                    {company.totalTenure && (
                      <Text style={styles.companyTenure}> • {company.totalTenure}</Text>
                    )}
                  </Text>
                </View>
                
                {company.roles.map((role: Role, roleIndex: number) => (
                  <View key={roleIndex} style={styles.roleCard}>
                    <Text style={styles.roleTitle}>
                      {role.title}
                    </Text>
                    <Text style={styles.roleDuration}>
                      {role.duration}
                    </Text>
                    
                    {role.responsibilities.map((responsibility: string, respIndex: number) => (
                      <View key={respIndex} style={styles.responsibilityItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.responsibilityText}>
                          {responsibility}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVDocumentPDF;
