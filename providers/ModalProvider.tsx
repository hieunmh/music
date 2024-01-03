'use client';

import { AuthModal } from '@/components/Modal/AuthModal';
import { UploadModal } from '@/components/Modal/UploadModal';
import { useEffect, useState } from 'react';


export const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <AuthModal />
      <UploadModal />
    </div>
  )
}