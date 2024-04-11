import Navbar from '@/components/Navbar/Navbar';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import Script from 'next/script';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.scss';

const barlow = Barlow({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SolTrack - Ultimate Solana Token/Wallet Tracker',
  description:
    'Track any Solana wallet and their holdings with SolTrack. Get detailed information about any Solana token and its holders.',
  openGraph: {
    images: `https://tracksol.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4774ccb0.png&w=2048&q=75`,
    title: 'SolTrack - Ultimate Solana Token/Wallet Tracker',
    authors: 'telegram - @devuno1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <GoogleTagManager gtmId="GTM-W2H722V6" />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-FQDVKXKWVB`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics-script" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FQDVKXKWVB');
        `}
      </Script>
      <GoogleAnalytics gaId="" />
      <body className={barlow.className}>
        <SkeletonTheme baseColor="#19214250" highlightColor="#1e284f50">
          <Navbar />
          {children}
        </SkeletonTheme>
      </body>
    </html>
  );
}
