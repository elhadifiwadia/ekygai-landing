import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EKYGAI - Votre Coach Fitness Intelligent',
  description: 'Transformez votre parcours fitness avec un coach AI personnalisé, des analyses scientifiques avancées et une expérience sur mesure qui s\'adapte à vous.',
  keywords: ['fitness', 'coach AI', 'santé', 'sport', 'entraînement personnalisé', 'EKYGAI'],
  authors: [{ name: 'EKYGAI' }],
  openGraph: {
    title: 'EKYGAI - Votre Coach Fitness Intelligent',
    description: 'Transformez votre parcours fitness avec un coach AI personnalisé',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EKYGAI - Votre Coach Fitness Intelligent',
    description: 'Transformez votre parcours fitness avec un coach AI personnalisé',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#A8CABA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
