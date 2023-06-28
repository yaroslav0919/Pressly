import { useContext, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Image from 'next/image';

import Disc from '@components/Icons/Disc';
import Switch from '@components/Switch/Switch';
import { SIDES } from '@common/constants';
import { ELabelTypes } from '@common/definitions';
import { FormContext } from '@context/FormContext';

import { VinylCreationIcon } from '../CustomizeJacket/CustomizeJacket';

const VinylInfo = () => {
  const [flip, setFlip] = useState(false);
  const [side, setSide] = useState(false);
  const [includeTracks, setIncludeTracks] = useState(false);
  const { formState, setFormState } = useContext(FormContext);
  const {
    artistInfo,
    albumName,
    labelType,
    labelArtwork,
    vinylColor,
    labelColor,
  } = formState;

  return (
    <div className='flex w-full justify-between pr-24'>
      <section className='flex min-w-fit flex-col space-y-8'>
        <VinylCreationIcon />
        <h2 className='text-4xl font-extrabold'>Vinyl Info</h2>
        <Switch
          state={side}
          setState={setSide}
          label='Vinyl Side'
          values={SIDES}
        />

        <div className='grid grid-cols-2 gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-4 text-sm font-medium desktop:text-lg'>
              <h2 className=''>Artist Name </h2>
              <span>{artistInfo?.name?.length}/50</span>
            </div>

            <input
              type='text'
              placeholder='Artist Name'
              value={artistInfo.name ?? ''}
              onChange={(e) => {
                if (e.target.value.length <= 50)
                  setFormState({
                    ...formState,
                    artistInfo: {
                      ...artistInfo,
                      name: e.target.value,
                    },
                  });
              }}
              className='rounded-lg border border-white/60 bg-white/10 p-4 text-base outline-none desktop:text-xl'
            />
          </div>

          <div className='mb-3 flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-4 text-sm font-medium desktop:text-lg'>
              <h2 className=''>Album Name</h2>
              <span>{albumName?.length}/50</span>
            </div>
            <input
              type='text'
              placeholder='Album Name'
              value={albumName ?? ''}
              onChange={(e) => {
                if (e.target.value.length <= 50)
                  setFormState({
                    ...formState,
                    albumName: e.target.value,
                  });
              }}
              className='rounded-lg border border-white/60 bg-white/10 p-4 text-base outline-none desktop:text-xl'
            />
          </div>
        </div>

        <input
          id='include'
          type='checkbox'
          name='effect'
          className='hidden'
          checked={includeTracks}
          onChange={() => setIncludeTracks(!includeTracks)}
        />
        <label
          htmlFor='include'
          className='flex cursor-pointer items-center gap-3'>
          <span className='mr-1 inline-block h-5 w-5 border-2 border-white/30'></span>
          Include tracks on label
        </label>
      </section>

      <section className='space-y-8'>
        <div className='mx-auto h-[450px] w-[450px]'>
          <div className='absolute h-[450px] w-[450px] overflow-hidden rounded-full'>
            <Disc
              diskcolor={vinylColor as string}
              labelColor={
                labelType
                  ? labelArtwork!.asset !== ''
                    ? labelArtwork!.asset
                    : labelColor
                  : labelColor
              }
              logoColor={
                labelColor !== '#202020' || labelType ? '#202020' : '#fff'
              }
              labelType={labelType === ELabelTypes.UploadLabel}
            />
          </div>
          <div className='absolute z-2 h-[450px] w-[450px] overflow-hidden rounded-full opacity-70 mix-blend-luminosity'>
            <Image
              src='/static/images/SMVinylOverlay.png'
              alt='overlay'
              fill
              className=''
            />
          </div>
        </div>
        <span
          className='mx-auto flex w-fit cursor-pointer items-center justify-center gap-4 rounded-md py-2 px-3 text-base'
          onClick={() => setFlip(!flip)}>
          <FiRefreshCw className='h-6 w-6' />
          Flip Vinyl
        </span>
      </section>
    </div>
  );
};

export default VinylInfo;
