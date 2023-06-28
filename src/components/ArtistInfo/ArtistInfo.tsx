import { useContext } from 'react';
import { HiOutlineMusicNote } from 'react-icons/hi';

import FileUpload from '@components/FileUpload/FileUpload';
import { FormContext } from '@context/FormContext';

const ArtistInfo = () => {
  const { formState, setFormState } = useContext(FormContext);
  const { contactInfo, artistInfo } = formState;

  return (
    <div className='flex h-full w-full items-start justify-between'>
      <section className='flex flex-col space-y-6'>
        <p className='xl:text-md flex w-fit items-center justify-center space-x-2 rounded-full bg-dim-emerald py-2 pr-4 pl-3 text-sm font-semibold uppercase text-black desktop:text-xl'>
          <HiOutlineMusicNote className='h-6 w-6' />
          <span>artist info</span>
        </p>
        <h2 className='text-5xl font-extrabold'>
          Build your artist
          <br /> profile
        </h2>
        <p className='text-lg'>
          Make it easy for collectors and fans to find you and <br /> your work
        </p>
      </section>

      <section className='grid grid-cols-2 space-x-10'>
        <div className='w-80 space-y-6'>
          <h1 className='font-medium uppercase text-white/60'>
            Contact Information
          </h1>
          <div className='space-y-3'>
            <h2 className='text-sm font-medium'>Your Name</h2>
            <input
              type='text'
              className='w-full rounded-lg border-white/60 bg-white/10 p-4 text-sm outline-none focus:border'
              placeholder='Your Name'
              value={contactInfo.name!}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  contactInfo: {
                    ...contactInfo,
                    name: e.target.value,
                  },
                });
              }}
            />
          </div>

          <div className='space-y-3'>
            <h2 className='text-sm font-medium'>Email Address</h2>
            <input
              type='email'
              className='w-full rounded-lg border-white/60 bg-white/10 p-4 text-sm outline-none focus:border'
              placeholder='you@email.com'
              value={contactInfo.email!}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  contactInfo: {
                    ...contactInfo,
                    email: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <h2 className='flex items-center justify-between text-sm font-medium'>
              <span>Phone Number</span>
              <span>Optional</span>
            </h2>
            <input
              type='text'
              className='w-full rounded-lg border-white/60 bg-white/10 p-4 text-sm outline-none focus:border'
              placeholder='(603) 555-0123'
              value={contactInfo.number!}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  contactInfo: {
                    ...contactInfo,
                    number: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>

        <div className='w-80 space-y-6'>
          <h1 className='font-medium uppercase text-white/60'>
            Artist Information
          </h1>
          <FileUpload
            title={artistInfo.image!.title}
            id={artistInfo.image!.id}
            assetVal={artistInfo.image!.asset}
            onHandleChange={(file: any, asset: string, id: string) => {
              setFormState({
                ...formState,
                artistInfo: {
                  ...artistInfo,
                  image: {
                    ...artistInfo.image,
                    value: file[0],
                    asset: asset,
                    id: id,
                  },
                },
              });
            }}
            size='small'
            hidden={false}
          />
          <div className='space-y-2'>
            <h2 className='text-sm font-medium'>Artist Name</h2>
            <input
              type='text'
              className='w-full rounded-lg border-white/60 bg-white/10 p-4 text-sm outline-none focus:border'
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

          <div className='flex flex-col space-y-2'>
            <h2 className='flex items-center justify-between text-sm font-medium'>
              <span>Artist Bio</span>
              <span>{artistInfo.bio?.length}/300</span>
            </h2>
            <textarea
              rows={5}
              className='rounded-lg border-white/60 bg-white/10 p-4 text-sm outline-none focus:border'
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
      </section>
    </div>
  );
};

export default ArtistInfo;
