/*
  HOW TO PREVIEW & REVIEW THE SITE:
  
  1. Start the Next.js local development server by running this command in your PowerShell terminal:
     $env:PATH = "c:\Users\muska\Desktop\WEB DEV\Projects\node-portable\node-v20.11.1-win-x64;" + $env:PATH; npm run dev
     
  2. Open your web browser and navigate to:
     http://localhost:3000
     
  3. Read the code review and verification notes inside the walkthrough artifact:
     file:///C:/Users/muska/.gemini/antigravity-ide/brain/c9d45e13-4ac8-4055-b59c-d08f6d016084/walkthrough.md
*/

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HELM | Premium Caribbean Creative Portfolio & Studio",
  description: "A luxury editorial scrollytelling digital portfolio rooted in Caribbean warmth and high-performance frontend engineering. Discover diaspora, depth, and fluid animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-midnight text-slate-100">
        {children}
      </body>
    </html>
  );
}
