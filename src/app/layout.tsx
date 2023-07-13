import './globals.css';

import { Analytics } from '@vercel/analytics/react';

import { Inter } from 'next/font/google';

import Footer from '~/components/layouts/Footer';
import MainNav from '~/components/layouts/MainNav';
import { ThemeProvider } from '~/components/ThemeProvider';
import { cn } from '~/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Weather',
  description: 'Canberra Weather App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={cn(inter.className, 'bg-black')}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <MainNav />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
