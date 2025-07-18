import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Portfolio - Asher Indursky",
  description: "Professional CV Portfolio with PDF export functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <style>
          {`
            @media print {
              @page {
                size: A4;
                margin:0.1in 0.15in 0.15in;
              }
              
              .no-print {
                display: none !important;
              }
              
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
              
              body * {
                visibility: hidden;
              }
              
              #cv-content-to-print, #cv-content-to-print * {
                visibility: visible;
              }
              
              #cv-content-to-print {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: white !important;
              }
            }
          `}
        </style>
      </head>
            <body className="font-sans antialiased" style={{ fontFamily: '"Rubik", "Roboto", "Helvetica", "Arial", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
