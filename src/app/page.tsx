"use client";
import React, { useState } from 'react';
import CVHeader from '@/components/CVHeader';
import CVDisplay from '@/components/CVDisplay';
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { CVData } from '@/types/cv';
import { THEME_COLORS } from '@/theme/colors';

// Import CV data
import cvFrontendData from '@/data/cv-frontend.json';
import cvSdetData from '@/data/cv-sdet.json';

const profiles: Record<string, CVData> = {
  frontend: cvFrontendData as CVData,
  sdet: cvSdetData as CVData,
};

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: THEME_COLORS.frontend.secondary,
      light: '#9bb5ff',
      dark: THEME_COLORS.frontend.primary,
    },
    secondary: {
      main: THEME_COLORS.sdet.primary,
      light: THEME_COLORS.sdet.secondary,
      dark: '#2D5A32',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: THEME_COLORS.frontend.primary,
      secondary: '#4a5568',
    },
  },
  typography: {
    fontFamily: '"Rubik", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState<'frontend' | 'sdet'>('frontend');
  const cvData = profiles[selectedProfile];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}>
        {/* Full-width Header */}
        <CVHeader
          selectedProfile={selectedProfile}
          onProfileChange={(profile) => setSelectedProfile(profile as 'frontend' | 'sdet')}
          cvData={cvData}
        />
        
        {/* Contained Content */}
        <Container maxWidth={false} sx={{ 
          py: 4, 
          px: 3,
          '@media print': {
            py: 0,
            px: 0,
            maxWidth: 'none'
          }
        }}>
          <Box id="cv-content-to-print">
            <CVDisplay cvData={cvData} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
