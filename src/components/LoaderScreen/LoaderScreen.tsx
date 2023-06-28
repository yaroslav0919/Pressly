import React from 'react';
import Image from 'next/image';

const LoaderScreen = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <Image
        src='/static/images/Frame 1804.svg'
        alt=''
        width={104}
        height={104}
        className='animate-spin'
      />
      <p>Creating your vinyl.</p>
    </div>
  );
};

export default LoaderScreen;
