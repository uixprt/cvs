import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { Email, Phone, LinkedIn, LocationOn } from '@mui/icons-material';
import { CVData, Experience, Role } from '@/types/cv';
import { THEME_COLORS } from '@/theme/colors';

interface CVDisplayProps {
  cvData: CVData;
}

const CVDisplay: React.FC<CVDisplayProps> = ({ cvData }) => {
  const theme = cvData.profile.includes('Frontend') ? THEME_COLORS.frontend : THEME_COLORS.sdet;
  const profileColor = theme.primary;
  const profileGradient = theme.gradient;

  const renderContactInfo = () => (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 2, 
      mt: 3,
      justifyContent: 'center',
      '@media print': {
        mt: 1,
        gap: 1,
        fontSize: '0.8rem'
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Email sx={{ color: 'white', fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: 'white' }}>
          {cvData.personalInfo.contact.email}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ color: 'white', fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: 'white' }}>
          {cvData.personalInfo.contact.phone}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOn sx={{ color: 'white', fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: 'white' }}>
          {cvData.personalInfo.location}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LinkedIn sx={{ color: 'white', fontSize: 18 }} />
        <Typography 
          variant="body2" 
          component="a" 
          href={cvData.personalInfo.contact.linkedin}
          sx={{ textDecoration: 'none', color: 'white', '&:hover': { textDecoration: 'underline' } }}
        >
          LinkedIn Profile
        </Typography>
      </Box>
    </Box>
  );

  const renderSkillsSection = () => (
    <Box sx={{ 
      mb: 3,
      '@media print': {
        mb: 1.5
      }
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(cvData.skills).map(([category, skills]: [string, string[]], index) => (
          <Typography key={index} variant="body1" sx={{ 
            fontSize: '0.9rem',
            color: '#333',
            lineHeight: 1.5,
            '@media print': {
              fontSize: '0.8rem',
              lineHeight: 1.3
            }
          }}>
            <Box component="span" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
              {category.replace(/_/g, ' ')}:
            </Box>
            {' '}
            {skills.join(', ')}
          </Typography>
        ))}
      </Box>
    </Box>
  );

  const renderExperienceSection = () => (
    <Box sx={{ 
      mb: 3,
      '@media print': {
        mb: 0
      }
    }}>
      {cvData.experience.map((company: Experience, companyIndex: number) => (
        <Box key={companyIndex} sx={{ 
          mb: companyIndex < cvData.experience.length - 1 ? 3 : 0,
          '@media print': {
            mb: companyIndex < cvData.experience.length - 1 ? 1.5 : 0
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                color: profileColor,
                opacity: 0.8,
                '@media print': {
                  fontSize: '0.9rem'
                }
              }}>
                {company.company}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: 1,
                '@media print': {
                  fontSize: '0.75rem',
                  mb: 0.5
                }
              }}>
                {company.location}
                {company.totalTenure && (
                  <Chip 
                    label={company.totalTenure} 
                    size="small" 
                    sx={{ 
                      ml: 1, 
                      backgroundColor: `${profileColor}10`, 
                      color: profileColor,
                      '@media print': {
                        fontSize: '0.65rem',
                        height: 'auto',
                        '& .MuiChip-label': {
                          px: 0.5,
                          py: 0.2
                        }
                      }
                    }}
                  />
                )}
              </Typography>
            </Box>
          </Box>
          
          {company.roles.map((role: Role, roleIndex: number) => (
            <Box key={roleIndex} sx={{ 
              mb: roleIndex < company.roles.length - 1 ? 2 : 0,
              position: 'relative',
              '@media print': {
                mb: roleIndex < company.roles.length - 1 ? 1 : 0
              }
            }}>
              <Box sx={{ 
                backgroundColor: '#f8f9fa',
                borderRadius: 1,
                p: 1.5,
                border: `1px solid ${profileColor}20`,
                '@media print': {
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 0,
                  p: 0.5
                }
              }}>
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 600, 
                  color: '#333',
                  '@media print': {
                    fontSize: '0.8rem'
                  }
                }}>
                  {role.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 1,
                  '@media print': {
                    fontSize: '0.7rem',
                    mb: 0.5
                  }
                }}>
                  {role.duration}
                </Typography>
                
                <Stack spacing={0.5}>
                  {role.responsibilities.map((responsibility: string, respIndex: number) => (
                    <Box key={respIndex} sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 1,
                      '@media print': {
                        gap: 0.5
                      }
                    }}>
                      <Box sx={{ 
                        width: 4, 
                        height: 4, 
                        borderRadius: '50%', 
                        backgroundColor: profileColor,
                        mt: 0.5,
                        flexShrink: 0,
                        '@media print': {
                          width: 3,
                          height: 3,
                          mt: 0.3
                        }
                      }} />
                      <Typography variant="body2" sx={{ 
                        lineHeight: 1.4,
                        '@media print': {
                          fontSize: '0.75rem',
                          lineHeight: 1.2
                        }
                      }}>
                        {responsibility}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ 
      maxWidth: '100%', 
      mx: 'auto', 
      px: 2,
      '@media print': {
        maxWidth: 'none',
        px: 0,
        mx: 0
      }
    }}>
      {/* Profile Header */}
      <Card elevation={0} sx={{ 
        mb: 2, 
        background: profileGradient,
        color: 'white',
        borderRadius: 2,
        overflow: 'hidden',
        '@media print': {
          mb: 1,
          mt: 1,
          borderRadius: 0,
          boxShadow: 'none'
        }
      }}>
        <CardContent sx={{ 
          textAlign: 'center',
          '@media print': {
            p: 2,
            '&:last-child': {
              paddingBottom: 2
            }
          }
        }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 700,
            '@media print': {
              fontSize: '1.8rem',
              mb: 1
            }
          }}>
            {cvData.personalInfo.name}
          </Typography>
          <Chip 
            label={cvData.headline}
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.9rem',
              py: 1,
              px: 2
            }}
          />
          {renderContactInfo()}
        </CardContent>
      </Card>

      {/* Single Card for All Content */}
      <Card elevation={0} sx={{ 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        '@media print': {
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none'
        }
      }}>
        <CardContent sx={{ 
          p: 3,
          '@media print': {
            p: 1,
            '&:last-child': {
              paddingBottom: 1
            }
          }
        }}>
          
          {/* Professional Summary */}
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: profileColor,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '@media print': {
              fontSize: '1rem',
              mb: 1
            }
          }}>
            Professional Summary
          </Typography>
          <Typography variant="body1" sx={{ 
            lineHeight: 1.6,
            fontSize: '1rem',
            color: '#333',
            mb: 3,
            '@media print': {
              fontSize: '0.85rem',
              mb: 1.5,
              lineHeight: 1.4
            }
          }}>
            {cvData.summary}
          </Typography>

          <Divider sx={{ 
            mb: 3,
            '@media print': {
              mb: 1.5
            }
          }} />

          {/* Skills & Expertise */}
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: profileColor,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '@media print': {
              fontSize: '1rem',
              mb: 1
            }
          }}>
            Skills & Expertise
          </Typography>
          {renderSkillsSection()}

          <Divider sx={{ 
            mb: 3,
            '@media print': {
              mb: 1.5
            }
          }} />

          {/* Professional Experience */}
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: profileColor,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '@media print': {
              fontSize: '1rem',
              mb: 1
            }
          }}>
            Professional Experience
          </Typography>
          {renderExperienceSection()}

        </CardContent>
      </Card>
    </Box>
  );
};

export default CVDisplay;
