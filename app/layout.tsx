import '#/styles/globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { 
    default: 'comLedger - Real-time Speech-to-Text Transcription', 
    template: '%s | comLedger' 
  },
  description:
    'Professional real-time speech-to-text transcription with smart highlighting, bilingual support (EN/FI), and export to PDF/CSV. Built with Next.js 15 and ElevenLabs Scribe v2 API.',
  keywords: [
    'speech to text',
    'transcription',
    'real-time',
    'ElevenLabs',
    'voice recognition',
    'text highlighting',
    'PDF export',
    'CSV export',
    'accessibility',
    'WCAG',
    'bilingual',
    'Finnish',
    'English'
  ],
  authors: [{ name: 'Oskari Järvelin', url: 'https://github.com/oskarijarvelin' }],
  creator: 'Oskari Järvelin',
  publisher: 'Oskari Järvelin',
  metadataBase: new URL('https://comledger.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'fi_FI',
    url: 'https://comledger.vercel.app',
    title: 'comLedger - Real-time Speech-to-Text Transcription',
    description:
      'Professional real-time speech-to-text transcription with smart highlighting, bilingual support, and export capabilities.',
    siteName: 'comLedger',
  },
  twitter: { 
    card: 'summary_large_image',
    title: 'comLedger - Real-time Speech-to-Text',
    description: 'Professional transcription with smart highlighting and export to PDF/CSV',
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
  verification: {
    google: 'verification_token', // Add your Google Search Console verification token
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`overflow-y-scroll bg-gray-950 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
