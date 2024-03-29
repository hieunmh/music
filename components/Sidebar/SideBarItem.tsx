import React from 'react';

import { IconType } from 'react-icons';
import Link  from 'next/link'
import { twMerge } from 'tailwind-merge';

interface SideBarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

export default function SideBarItem({ icon: Icon, label, active, href } : SideBarItemProps) {
  return (
    <Link href={href} 
      className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-base font-medium 
        cursor-pointer hover:text-white transition text-neutral-400 py-1`, active && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className='truncate w-full'>{label}</p>
    </Link>
  )
}
