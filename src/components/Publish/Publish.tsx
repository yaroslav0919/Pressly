import { useContext } from 'react';
import { AiOutlineDesktop } from 'react-icons/ai';
import Image from 'next/image';

import { FormContext } from '@context/FormContext';

const Publish = () => {
  const { formState, setFormState } = useContext(FormContext);
  const {
    url,
    artistInfo,
    singleArtworks,
    gatefoldArtworks,
    albumName,
    jacketType,
  } = formState;

  return (
    <div className='flex h-full w-full items-start justify-between'>
      <section className='flex flex-col space-y-6'>
        <p className='xl:text-md flex w-fit items-center justify-center space-x-2 rounded-full bg-dim-emerald py-2 pr-4 pl-3 text-sm font-semibold uppercase text-black desktop:text-xl'>
          <AiOutlineDesktop className='h-6 w-6' />
          <span>landing page</span>
        </p>
        <h2 className='text-5xl font-extrabold'>
          One-page <br /> marketplace
        </h2>
        <p className='text-lg'>
          Collectors and fans can buy your vinyl <br /> directly from your
          customized marketplace
        </p>

        <div className='flex flex-col gap-4'>
          <h2 className='text-sm font-medium'>Website URL</h2>
          <input
            type='text'
            className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
            placeholder='www.pressly.io/'
            value={url!}
            onChange={(e) => {
              setFormState({ ...formState, url: e.target.value });
              // Need to create a debounce here and call api to check if website url is available
            }}
          />
          <p>URL is available!</p>
        </div>
      </section>

      <section className='grid grid-cols-2 space-x-10'>
        <div className='w-80 space-y-4'>
          <h1 className='font-medium uppercase text-white/60'>
            Artist Information
          </h1>
          <div className='h-40 w-40 rounded-md border border-white/20'>
            {artistInfo.image?.asset && (
              <Image
                src={`${process.env.NEXT_PUBLIC_AWS_URL}`}
                alt=''
                width={160}
                height={160}
                className='rounded-md'
              />
            )}
          </div>
          <div className='flex flex-col space-y-3'>
            <h2 className='text-sm font-medium'>Artist Name</h2>
            <input
              type='text'
              className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
              placeholder='Artist Name'
              value={artistInfo.name!}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  artistInfo: {
                    ...artistInfo,
                    name: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <h2 className='flex items-center justify-between text-sm font-medium'>
              <span>Artist Bio</span>
              <span>{artistInfo.bio ? artistInfo.bio.length : 0}/300</span>
            </h2>
            <textarea
              rows={5}
              className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
              placeholder='Artist Bio'
              value={artistInfo.bio!}
              onChange={(e) => {
                if (e.target.value.length <= 300)
                  setFormState({
                    ...formState,
                    artistInfo: {
                      ...artistInfo,
                      bio: e.target.value,
                    },
                  });
              }}
            />
          </div>
        </div>
        <div className='w-80 space-y-4'>
          <h1 className='font-medium uppercase text-white/60'>
            Album Information
          </h1>
          <div className='h-40 w-40 rounded-md border border-white/20'>
            {/* {jacketType && singleArtworks ? (
              <p>image</p>
              // <Image
              //   src={`${process.env.NEXT_PUBLIC_AWS_URL}${data?.front_artwork}`}
              //   alt=''
              //   width={160}
              //   height={160}
              //   className='rounded-md'
              // />
            ) : (
              <p>hello</p>
            )} */}
          </div>
          <div className='flex flex-col space-y-3'>
            <h2 className='text-sm font-medium'>Album Name</h2>
            <input
              type='text'
              className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
              placeholder='Album Name'
              value={albumName!}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  albumName: e.target.value,
                });
              }}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <h2 className='flex items-center justify-between text-sm font-medium'>
              <span>Album Bio</span>
              <span>{artistInfo.bio ? artistInfo.bio.length : 0}/300</span>
            </h2>
            <textarea
              rows={5}
              className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
              placeholder='Album Bio'
              value={artistInfo.bio!}
              onChange={(e) => {
                if (e.target.value.length <= 300)
                  setFormState({
                    ...formState,
                    albumBio: e.target.value,
                  });
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publish;
