import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
const roboto = Roboto({ weight: '400', subsets: ['latin'] });
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'ExpenseTracker',
  description: 'Just learning how to use Next.JS...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className}`}>
          <Header />
          <main className="container">{children}</main> <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
