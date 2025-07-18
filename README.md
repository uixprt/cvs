# Next.js CV Builder – Dynamic Resume Portfolio

A modern, professional CV builder application built with Next.js, Material-UI, and @react-pdf/renderer. This application displays multiple CV variants and provides both print and PDF export functionality with ATS-friendly, searchable PDFs. 

([Live Demo](https://cvs.uixprt.com))

## 🚀 Features

- **Dual CV Profiles**: Switch between different professional profiles (Frontend Engineer & Senior SDET/Full-Stack)
- **Real PDF Export**: Generate actual, searchable PDFs using @react-pdf/renderer (not image-based)
- **Print Functionality**: Clean print layout with optimized CSS for physical printing
- **Professional Design**: Modern UI with Material-UI components
- **Static Site Generation**: Optimized for GitHub Pages deployment
- **TypeScript**: Full type safety for better development experience
- **Responsive Design**: Works perfectly on all device sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **PDF Generation**: @react-pdf/renderer
- **Styling**: MUI
- **Deployment**: GitHub Pages with GitHub Actions

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with print styles
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── CVDisplay.tsx      # Browser CV display (MUI)
│   ├── CVDocumentPDF.tsx  # PDF template (@react-pdf/renderer)
│   └── CVHeader.tsx       # Header with controls
├── data/                  # CV data in JSON format
│   ├── cv-frontend.json   # Frontend Engineer profile
│   └── cv-sdet.json       # SDET/Full-Stack profile
└── types/                 # TypeScript type definitions
    └── cv.ts              # CV data structure types
```

## 🎯 Key Technical Solutions

### PDF Export Challenge
Unlike many solutions that convert HTML to images, this application uses @react-pdf/renderer to create actual, searchable PDFs. This requires maintaining two templates:
1. **Browser Template** (`CVDisplay.tsx`): Uses MUI components for web display
2. **PDF Template** (`CVDocumentPDF.tsx`): Uses @react-pdf/renderer primitives for PDF generation

### Static Site Generation
The application is configured for static export to work with GitHub Pages:
- Client-side only PDF generation to avoid SSR issues
- Optimized build configuration for static hosting
- Automatic deployment with GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone git@github.com:uixprt/nextjs-cv-builder.git
cd nextjs-cv-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized static build in the `out/` directory, ready for deployment.

## 📊 CV Data Structure

CV data is stored in JSON format with the following structure:

```typescript
interface CVData {
  profile: string;
  personalInfo: {
    name: string;
    location: string;
    contact: {
      phone: string;
      email: string;
      linkedin: string;
    };
  };
  headline: string;
  summary: string;
  skills: {
    [category: string]: string[];
  };
  experience: Experience[];
}
```

## 🔧 Customization

### Adding New CV Profiles

1. Create a new JSON file in `src/data/`
2. Follow the existing data structure
3. Add the profile to the `profiles` object in `src/app/page.tsx`
4. Update the profile selector in `CVHeader.tsx`

### Modifying Styles

- **Browser styles**: Edit MUI theme and component styles in the components
- **PDF styles**: Modify the StyleSheet in `CVDocumentPDF.tsx`
- **Print styles**: Update CSS in `src/app/layout.tsx`

## 🚀 Deployment

The project includes GitHub Actions workflow for automatic deployment to GitHub Pages:

1. Push to the `main` branch
2. GitHub Actions builds and deploys automatically
3. Enable GitHub Pages in repository settings
4. Set source to "GitHub Actions"

## 🎨 Design Philosophy

This application follows the engineering principle of "building the machine that builds the thing":
- **Separation of Concerns**: Display logic separated from data
- **Maintainable Templates**: Both web and PDF templates use the same data structure
- **Type Safety**: Full TypeScript coverage for reliable development
- **Professional Output**: ATS-friendly PDFs for job applications

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by [Asher Indursky](https://www.linkedin.com/in/asherindursky)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
