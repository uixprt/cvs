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
  
  // Determine main color based on profile
  const isSdet = cvData.profile.toLowerCase().includes('sdet');
  const mainColor = isSdet ? THEME_COLORS.sdet.primary : '#2196f3';
  
  // Create styles that match the print layout exactly
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Rubik',
      backgroundColor: '#ffffff',
      padding: '14pt 10pt 10pt 10pt', // עוד הקטנה
      color: '#333333',
      fontSize: 9, // עוד הקטנה
      lineHeight: 1.2, // עוד הקטנה
      maxHeight: '842pt',
      minHeight: '842pt',
    },
    
    // Profile Header - matches the gradient card in print
    profileHeader: {
      backgroundColor: mainColor,
      borderRadius: 8,
      padding: 8,
      textAlign: 'center',
      marginBottom: 4,
      color: '#ffffff',
    },
    
    profileName: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 16,
      color: '#ffffff',
    },
    
    profileHeadline: {
      fontSize: 10,
      fontWeight: 500,
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 4,
      marginBottom: 3,
      color: '#ffffff',
      alignSelf: 'center',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: 0,
      maxWidth: '80%',
    },
    
    // Contact Info Container
    contactContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8, // היה 12
      marginTop: 4, // היה 8
      marginBottom: 4,
    },
    
    contactItem: {
      fontSize: 11,
      color: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      marginRight: 8,
    },
    contactIcon: {
      fontSize: 11,
      marginRight: 3,
    },
    
    contactLink: {
      fontSize: 10,
      color: '#ffffff',
      textDecoration: 'underline',
    },
    
    // Main Content Container
    mainContent: {
      paddingTop: 8,
    },
    
    // Section Titles
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: mainColor,
      marginBottom: 6,
      textTransform: 'none',
      letterSpacing: 0.2,
      textDecoration: 'none',
      alignSelf: 'flex-start',
    },
    
    // Professional Summary
    summaryText: {
      fontSize: 9,
      lineHeight: 1.35, // היה 1.2
      color: '#333333',
      marginBottom: 8, // היה 6
      textAlign: 'justify',
    },
    
    // Divider
    divider: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 6,
    },
    
    // Skills Section
    skillsContainer: {
      marginBottom: 6,
    },
    
    skillCategory: {
      fontSize: 9,
      lineHeight: 1.25, // היה 1.1
      color: '#333333',
      marginBottom: 3, // היה 2
    },
    
    skillCategoryName: {
      fontWeight: 600,
      textTransform: 'capitalize',
    },
    
    // Experience Section
    experienceContainer: {
      marginBottom: 6,
    },
    
    companyCard: {
      backgroundColor: '#fff',
      borderRadius: 4,
      padding: 6,
      marginBottom: 6,
    },
    
    companyHeader: {
      marginBottom: 2,
    },
    
    companyName: {
      fontSize: 11,
      fontWeight: 700,
      color: '#222',
      marginBottom: 1,
    },
    
    companyLocation: {
      fontSize: 8,
      color: '#666666',
      marginBottom: 0,
    },
    
    companyTenure: {
      fontSize: 8,
      fontWeight: 600,
      color: theme.primary,
    },
    
    // Role Cards
    roleCard: {
      backgroundColor: '#fff',
      borderRadius: 2,
      padding: 4,
      marginBottom: 2,
    },
    
    roleTitle: {
      fontSize: 9,
      fontWeight: 700,
      color: '#222',
      marginBottom: 1,
      textDecoration: 'none',
    },
    
    roleDuration: {
      fontSize: 8,
      color: '#666666',
      marginBottom: 2,
    },
    
    // Responsibilities
    responsibilityItem: {
      flexDirection: 'row',
      marginBottom: 1,
      alignItems: 'flex-start',
    },
    
    bullet: {
      fontSize: 8,
      color: theme.primary,
      fontWeight: 700,
      marginRight: 4,
      marginTop: 1,
    },
    
    responsibilityText: {
      fontSize: 8,
      lineHeight: 1.25, // היה 1.1
      color: '#333333',
      flex: 1,
    },
    contactRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 4,
      marginBottom: 4,
      flexWrap: 'wrap',
    },
    contactText: {
      fontSize: 10,
      color: '#ffffff',
      textAlign: 'center',
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
          
          {/* Contact Information - single row, no icons */}
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>
              {cvData.personalInfo.contact.email} | {cvData.personalInfo.contact.phone} | {cvData.personalInfo.location} |
            </Text>
            <Link src={cvData.personalInfo.contact.linkedin} style={styles.contactLink}>LinkedIn Profile</Link>
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
