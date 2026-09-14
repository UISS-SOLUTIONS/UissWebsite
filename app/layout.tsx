import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Source_Sans_3 } from 'next/font/google'
import { Toaster } from 'sonner';
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  display: 'optional',
  variable: '--font-source-sans-3',
})

const uissWordmark = Poppins({
  subsets: ['latin'],
  weight: ['800'],
  display: 'optional',
  preload: false,
  variable: '--font-uiss-wordmark',
})

const uissDisplay = localFont({
  src: "./fonts/GeistVF.woff",
  display: 'optional',
  preload: false,
  variable: "--font-uiss-display",
})

export const metadata: Metadata = {
  title: "UISS",
  description: "University of Dar es Salaam ICT Students' Society (UISS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.variable} ${uissWordmark.variable} ${uissDisplay.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
