import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/styles/globals.css';
import { CartProvider } from '@/src/context/CartContext';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AIMS',
  description: 'An internet media store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
