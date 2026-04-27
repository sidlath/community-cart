import type { Metadata } from 'next';
import './globals.css';
import RoleSwitcher from '@/components/RoleSwitcher';
import MinimalNav from '@/components/MinimalNav';

export const metadata: Metadata = {
  title: 'Community Cart — Mumbai pilot demo',
  description: 'Weekly bulk grocery ordering for Hiranandani Eldora, Powai. Live demo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink antialiased min-h-screen">
        <MinimalNav />
        <main className="relative pb-24">{children}</main>
        <RoleSwitcher />
      </body>
    </html>
  );
}
