import { useContext } from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';

import { CustomizeVinylImage } from '@components/CustomizeVinyl/CustomizeVinyl';
import Switch from '@components/Switch/Switch';
import { VINYL_COPY } from '@common/constants';
import { EJacket, ELabelTypes, ELaunchTypes } from '@common/definitions';
import { FormContext } from '@context/FormContext';

const Quantity = () => {
  const { formState, setFormState } = useContext(FormContext);

  const {
    quantity,
    presaleDuration,
    additionals,
    labelType,
    vinylColor,
    labelColor,
    albumName,
    launchType,
    singleArtworks,
    gatefoldArtworks,
    jacketType,
  } = formState;

  return (
    <div className='mb-20 flex h-full w-full items-center justify-between xl:pl-10 2xl:pl-16 desktop:pt-60'>
      <section className='flex flex-col gap-6'>
        <p className='xl:text-md flex w-fit items-center justify-center space-x-2 rounded-full bg-dim-emerald py-2 pr-4 pl-3 text-sm font-semibold uppercase text-black desktop:text-xl'>
          <HiOutlineSparkles className='h-6 w-6' />
          <span>publish</span>
        </p>
        <h1 className='text-4xl font-extrabold'>
          Time to launch your vinyl to the world
        </h1>
        <Switch
          state={launchType === ELaunchTypes.Presale}
          setState={(state: boolean) =>
            setFormState({
              ...formState,
              launchType: state ? ELaunchTypes.Presale : ELaunchTypes.Quantity,
            })
          }
          label='Vinyl Copies'
          values={VINYL_COPY}
        />
        {launchType === ELaunchTypes.Quantity ? (
          <div className='flex w-3/5 flex-col gap-4'>
            <div className='flex items-center justify-between gap-4 text-sm font-medium'>
              <h2 className=''>Quantity</h2>
              <span>Min 1,000</span>
            </div>
            <input
              type='number'
              min={1000}
              className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
              value={quantity!}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  quantity: e.target.value,
                })
              }
            />
          </div>
        ) : (
          <div className='flex w-3/5 flex-col gap-4'>
            <div className='flex items-center justify-between gap-4 text-sm font-medium'>
              <h2 className=''>Presale Duration</h2>
              <span>Days</span>
            </div>
            <input
              type='number'
              min={1}
              className='rounded-lg border border-white/60 bg-white/10 p-4 outline-none'
              value={presaleDuration!}
              onChange={(e) =>
                setFormState({ ...formState, presaleDuration: e.target.value })
              }
            />
          </div>
        )}
      </section>
      <section>
        <CustomizeVinylImage
          colorValue={vinylColor!}
          labelType={labelType === ELabelTypes.UploadLabel}
          fileValue={{
            title: '',
            id: '',
            asset: '',
          }}
          labelColor={labelColor!}
          flip={false}
          additionals={additionals}
          singleArray={singleArtworks!}
          gatefoldArray={gatefoldArtworks!}
          jacketType={jacketType === EJacket.Gatefold}
        />
      </section>
    </div>
  );
};

export default Quantity;
