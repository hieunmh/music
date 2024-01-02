'use client';

import { AuthModal } from '@/components/AuthModal';
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
    </div>
  )
}