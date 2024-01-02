'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiLoaderCircle, BiSearch } from 'react-icons/bi';

import { Button } from './Button';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';


export default function Header({ children, className } : { children: React.ReactNode, className: string }) {

  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  let [isLoading, setIsloading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsloading(true);
    const { error } = await supabaseClient.auth.signOut();
    setIsloading(false);
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button onClick={() => router.back()} 
            className='rounded-full bg-black flex ic justify-center hover:opacity-75 transition'
          >
            <RxCaretLeft size={35} />
          </button>
          <button onClick={() => router.forward()}
            className='rounded-full bg-black flex ic justify-center hover:opacity-75 transition'
          >
            <RxCaretRight size={35} />
          </button>
        </div>

        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome className='text-black' size={20} />
          </button>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <BiSearch className='text-black' size={20} />
          </button>
        </div>

        <div className='flex justify-between items-center gap-x-4'>
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button onClick={handleLogout} className='bg-white px-6 py-2 flex items-center'>
                {isLoading ? (
                  <div className='h-[25px] w-[50px] flex items-center justify-center'>
                    <BiLoaderCircle size={20} className='animate-spin' />
                  </div>
                ) : (
                  <div className='h-[25px] w-[50px] flex items-center justify-center'>
                    Logout
                  </div>
                )}

              </Button>

              <Button onClick={() => router.push('/account')} className='bg-white'>
                <FaUser />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button onClick={authModal.onOpen} className='bg-transparent text-neutral-300'>
                  Sign Up
                </Button>
              </div>

              <div>
                <Button onClick={authModal.onOpen} className='bg-white px-6 py-2'>
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
