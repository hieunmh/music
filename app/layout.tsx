import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import  { SupabaseProvider } from '@/providers/SupabaseProvider';
import { UserProvider } from '@/providers/UserProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { ToasterProvider } from '@/providers/ToasterProvider';
import { getSongByUserID } from '@/actions/getSongByUserID';
import Player from '@/components/Play/Player';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Spotify Listen to Music!!!',
}

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const useSongs = await getSongByUserID();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            <Sidebar songs={useSongs}>
              {children}
            </Sidebar>

            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
