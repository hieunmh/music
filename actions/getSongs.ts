import { Song } from '@/types/types';

import { Database } from '@/types/supabaseType';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
 
export const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.from('songs').select('*').order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
}