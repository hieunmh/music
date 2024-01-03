import { Database } from '@/types/supabaseType';
import { Song } from '@/types/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient<Database>();

  if (!song) return null;

  const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(song.imagepath as string);

  return imageData.publicUrl;
}