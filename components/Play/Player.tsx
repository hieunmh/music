'use client';

import useGetSongByID from '@/hooks/useGetSongByID';
import useLoadSongURL from '@/hooks/useLoadSongURL';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';

const Player = () => {

  const player = usePlayer();
  const { song } = useGetSongByID(player.activeID);

  const songURL = useLoadSongURL(song!);

  if (!song || !songURL || !player.activeID) {
    return null;
  }

  return (
    <div className=' fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
      <PlayerContent song={song} songURL={songURL} key={songURL} />
    </div>
  )
}

export default Player;