import { useLoadImage } from '@/hooks/useLoadImage';
import { Song } from '@/types/types';
import Image from 'next/image';

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

export const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {

  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) return onClick(data.id)
  }

  return (
    <div onClick={handleClick} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'>
      <div className='relative rounded-md min-h-12 min-w-12 overflow-hidden'>
        <Image src={imageUrl || '/liked.png'} alt='media image' fill 
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 truncate text-sm'>{data.author}</p>
      </div>
    </div>
  )
}