"use client";
import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  AppBar,
  Toolbar
} from '@mui/material';
import { Print, Download } from '@mui/icons-material';
import CVDocumentPDF from '@/components/CVDocumentPDF';
import { CVData } from '@/types/cv';
import { THEME_COLORS } from '@/theme/colors';

interface CVHeaderProps {
  selectedProfile: string;
  onProfileChange: (profile: string) => void;
  cvData: CVData;
}

const CVHeader: React.FC<CVHeaderProps> = ({ selectedProfile, onProfileChange, cvData }) => {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Use the same theme logic as CVDisplay
  const theme = cvData.profile.includes('Frontend') ? THEME_COLORS.frontend : THEME_COLORS.sdet;
  const profileGradient = theme.gradient;
  const frontendColor = THEME_COLORS.frontend.primary;
  const sdetColor = THEME_COLORS.sdet.primary;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleProfileChange = (event: SelectChangeEvent) => {
    const newProfile = event.target.value;
    console.log('Profile changed to:', newProfile);
    onProfileChange(newProfile);
  };

  // PDF download method using pdf() function
  const handleDownloadPdf = async () => {
    if (!isClient) return;
    
    setIsGenerating(true);
    try {
      const pdfBlob = await pdf(<CVDocumentPDF cvData={cvData} />).toBlob();
      saveAs(pdfBlob, `${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV_${selectedProfile}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Sticky Top Bar */}
      <AppBar 
        position="sticky" 
        className="no-print"
        sx={{
          background: profileGradient,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
      >
        <Toolbar sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          minHeight: 60,
          py: 1
        }}>
          {/* Profile Selector styled like buttons */}
          <Box sx={{ position: 'relative', minWidth: 180 }}>
            <FormControl variant="outlined" sx={{ 
              minWidth: 180,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                height: 40,
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                '&.Mui-focused': { 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderColor: 'rgba(255,255,255,0.5)'
                },
                transition: 'all 0.3s ease'
              },
              '& .MuiSelect-root': { 
                color: 'white',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 2,
                paddingRight: 4,
                fontSize: '0.9rem',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
              },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-icon': { color: 'white' }
            }}>
              <Select
                id="profile-select"
                value={selectedProfile}
                onChange={handleProfileChange}
                displayEmpty
                sx={{ 
                  color: 'white',
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'white',
                      '& .MuiMenuItem-root': {
                        color: '#333'
                      }
                    }
                  }
                }}
              >
                <MenuItem value="frontend">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      backgroundColor: frontendColor 
                    }} />
                    Frontend Engineer
                  </Box>
                </MenuItem>
                <MenuItem value="sdet">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      backgroundColor: sdetColor 
                    }} />
                    Senior SDET / Full-Stack
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Action Buttons */}
          <Button 
            variant="contained" 
            onClick={handlePrint}
            startIcon={<Print sx={{ color: theme.primary }} />}
            sx={{ 
              minWidth: 120,
              height: 40,
              px: 2.5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              fontWeight: 500,
              fontSize: '0.9rem',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Print Resume
          </Button>

          {isClient && (
            <Button 
              variant="contained" 
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              startIcon={<Download sx={{ color: theme.primary }} />}
              sx={{ 
                minWidth: 120,
                height: 40,
                px: 2.5,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: 500,
                fontSize: '0.9rem',
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                '&:disabled': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Spacer for content */}
      <Box sx={{ mb: 2 }} />
    </>
  );
};

export default CVHeader;
