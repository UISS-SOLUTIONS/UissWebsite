import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from 'next/font/google'
import { Toaster } from 'sonner';
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'], // Include the Latin subset
  weight: ['400','500','600', '700'], // Add specific weights as needed
  style: ['normal', 'italic'], // Optional: Include styles
  variable: '--font-source-sans-3',
});

const uissWordmark = Poppins({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-uiss-wordmark',
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
        className={`${sourceSans3.className} ${sourceSans3.variable} ${uissWordmark.variable} antialiased`}
      >
        {children}
        <Toaster richColors theme="dark"/>
      </body>
    </html>
  );
}
