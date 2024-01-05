'use client';

import { Song } from '@/types/types';
import { SongItem } from './Item/SongItem';
import useOnPlay from '@/hooks/useOnPlay';

interface PageContentProps {
  songs: Song[]
}

export const PageContent: React.FC<PageContentProps> = ({ songs }) => {

  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className='mt-4 text-neutral-400'>
        No song available!
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
      {songs.map(song => (
        <SongItem key={song.id} onClick={(id: string) => onPlay(id)} data={song} />
      ))}
    </div>
  )
}