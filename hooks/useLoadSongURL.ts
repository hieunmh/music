import { Database } from '@/types/supabaseType';
import { Song } from '@/types/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


const useLoadSongURL = (song: Song) => {
  const supabaseClient = useSupabaseClient<Database>();

  if (!song) return '';

  const { data: songData } = supabaseClient.storage.from('songs').getPublicUrl(song.songpath!);

  return songData.publicUrl;
}

export default useLoadSongURL;