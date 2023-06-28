import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
import Image from 'next/image';

import { EAdditional } from '@common/definitions';

const ImageViewer: React.FC<{
  additionals: EAdditional[];
  singleArray: any[];
  gatefoldArray: any[];
  jacketType: boolean;
}> = ({ additionals, singleArray, gatefoldArray, jacketType }) => {
  const [flip, setFlip] = useState<boolean>(false);

  return (
    <div className='flex flex-col items-center gap-6 xl:items-start'>
      {/* setting diff pixels for diff breakpoints but what should we do*/}
      <div className='relative h-[450px] w-[450px] bg-white/10 2xl:h-[576px] 2xl:w-[576px]'>
        {additionals.includes(EAdditional.MatteFinish) ? (
          <Image
            src='/static/images/Matte.png'
            alt='overlay'
            className='absolute z-10'
            fill
          />
        ) : additionals.includes(EAdditional.Numbering) ? (
          <div className='absolute z-10 h-full w-full bg-white/10'></div>
        ) : additionals.includes(EAdditional.ShrinkWrapping) ? (
          <Image
            src='/static/images/Wrap.png'
            alt='overlay'
            fill
            className='absolute z-10'
          />
        ) : null}

        {jacketType
          ? gatefoldArray[Number(flip)]?.asset !== '' && (
              <Image
                src={gatefoldArray[Number(flip)]?.asset}
                alt='image'
                fill
              />
            )
          : singleArray[Number(flip)]?.asset !== '' && (
              <Image src={singleArray[Number(flip)]?.asset} alt='image' fill />
            )}
      </div>
      <div className='flex w-fit items-center justify-between gap-10 text-base xl:w-full'>
        <span className='flex cursor-pointer items-center gap-4'>
          <BsInfoCircle className='h-6 w-6' /> Image Dimensions
        </span>
        <p
          className='flex cursor-pointer items-center justify-center gap-4'
          onClick={() => setFlip(!flip)}>
          <FiRefreshCw className='h-6 w-6' />
          Flip Vinyl
        </p>
      </div>
    </div>
  );
};
export default ImageViewer;
