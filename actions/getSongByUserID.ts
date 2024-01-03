import { Song } from '@/types/types';

import { Database } from '@/types/supabaseType';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
 
export const getSongByUserID = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await 
    supabase.from('songs').select('*')
    .eq('user_id', sessionData.session?.user.id as string)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
}