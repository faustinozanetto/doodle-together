import '../styles/global.css';

import React from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { siteConfig } from '@config/config';
import Providers from './providers';

const interFont = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `Home | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'Faustino Zanetto',
      url: 'https://github.com/faustinozanetto',
    },
  ],
  creator: 'Faustino Zanetto',
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/banner.webp`,
        width: 2000,
        height: 1500,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@faustinozanetto',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/assets/banner.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  icons: {
    shortcut: 'favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interFont.variable} suppressHydrationWarning>
      <body className="font-sans subpixel-antialiased transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
