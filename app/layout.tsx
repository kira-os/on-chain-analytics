import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'On-Chain Analytics | Kira',
  description: 'Solana whale tracking and smart money analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  );
}
