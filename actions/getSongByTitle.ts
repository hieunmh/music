import { Song } from '@/types/types';

import { Database } from '@/types/supabaseType';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getSongs } from './getSongs';
 
export const getSongByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await 
    supabase.from('songs').select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.log(error);
  }

  return (data as any) || [];
}