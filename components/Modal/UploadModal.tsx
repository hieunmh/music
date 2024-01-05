'use client';

import { useUploadModal } from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Modal } from './Modal';
import { Input } from '../Input';
import { Button } from '../Button';

import { useState } from 'react';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';
import { Database } from '@/types/supabaseType';
import { useRouter } from 'next/navigation';


export const UploadModal = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });

  const onchange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onsubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();


      //Upload song
      const { data: songData, error: songError } = await 
        supabaseClient.storage.from('songs')
        .upload(`song-${values.title}-${values.author}-${uniqueID}`, songFile, { cacheControl: '3600', upsert: false });
      
      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload!');
      }

      // Upload image
      const { data: imageData, error: imageError } = await 
        supabaseClient.storage.from('images')
        .upload(`image-${values.title}-${values.author}-${uniqueID}`, imageFile, { cacheControl: '3600', upsert: false });
      
      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload!');
      }

      const { error: supabaseError } = await 
        supabaseClient.from('songs').insert({ 
          user_id: user.id, 
          title: values.title,
          author: values.author,
          imagepath: imageData.path,
          songpath: songData.path
        })
      
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message)
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song created!');
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal title='Add a song' description='Upload an MP3 file' 
      isOpen={uploadModal.isOpen} onChange={onchange}
    >
      <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-4'>
        <Input id='title' disabled={isLoading} 
          {...register('title', { required: true })} 
          placeholder='Song title' 
        />

        <Input id='author' disabled={isLoading} 
          {...register('author', { required: true })} 
          placeholder='Song author' 
        />

        <div>
          <div>Select a song file</div>
          <Input id='song' type='file' disabled={isLoading} 
            {...register('song', { required: true })} accept='.mp3'
          />
        </div>

        <div>
          <div>Select an image</div>
          <Input id='image' type='file' disabled={isLoading} 
            {...register('image', { required: true })} accept='image/*'
          />
        </div>

        <Button disabled={isLoading} type='submit'>
          {isLoading ? (
            <div className='h-[25px] flex items-center justify-center'>
              Uploading . . .
            </div>
          ) : (
            <div className='h-[25px] flex items-center justify-center'>
              Create
            </div>
          )}
        </Button>
      </form>
    </Modal>
  )
}

Input.displayName = 'Input';