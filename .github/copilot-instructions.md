<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# CV Portfolio Project Instructions

This is a Next.js application that displays a professional CV portfolio with the following features:

## Project Structure
- Two CV variants stored in JSON format: `src/data/cv-frontend.json` and `src/data/cv-sdet.json`
- React components for displaying CV content (`CVDisplay.tsx`)
- PDF export functionality using `@react-pdf/renderer` (`CVDocumentPDF.tsx`)
- MUI (Material-UI) for styling and components
- GitHub Actions workflow for deployment to GitHub Pages

## Key Components
- `CVHeader.tsx`: Profile selector and export buttons (print/PDF)
- `CVDisplay.tsx`: Browser display of CV content using MUI components
- `CVDocumentPDF.tsx`: PDF template using @react-pdf/renderer primitives

## Technical Requirements
- The project uses TypeScript for type safety
- Static export is enabled for GitHub Pages deployment
- Print functionality is implemented with CSS media queries
- PDF export creates real, searchable, ATS-friendly PDFs (not images)

## Development Guidelines
- Maintain two separate templates: one for browser display (MUI) and one for PDF (@react-pdf/renderer)
- Ensure both templates render the same content structure
- Use proper TypeScript types for CV data structure
- Follow MUI design principles for consistent styling
- Test both print and PDF export functionality

## Data Structure
The CV JSON files follow this structure:
- `personalInfo`: Name, location, contact information
- `headline`: Professional title/summary
- `summary`: Detailed professional summary
- `skills`: Categorized skill sets
- `experience`: Array of companies with roles and responsibilities
