import type { Metadata } from "next";
import localFont from "next/font/local";
import { Source_Sans_3 } from 'next/font/google'
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'], // Include the Latin subset
  weight: ['400','500','600', '700'], // Add specific weights as needed
  style: ['normal', 'italic'], // Optional: Include styles
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        className={`${sourceSans3.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
