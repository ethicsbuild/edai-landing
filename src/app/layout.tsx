// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Keep the default fonts; they only add CSS vars to <body>
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://edai.quest"),
  title: "E.D.A.I. – Ethical Deployment of Artificial Intelligence",
  description: "A system that knows the edge of its own knowledge. Closing the intention–reality gap, starting with our own.",
  openGraph: { title: "E.D.A.I.", description: "Ethical Deployment of AI.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Your Tailwind theme (bg-edai-ink, text-white, etc.) is applied via globals.css */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}