import { useContext } from 'react';
import { GrDisc } from 'react-icons/gr';

import Switch from '@components/Switch/Switch';
import { Additionals, JACKET_TYPES, SPINE_TYPE } from '@common/constants';
import { EAdditional, EJacket, ESpine, TImage } from '@common/definitions';
import { FormContext } from '@context/FormContext';

import GatefoldUpload from './GatefoldUpload';
import ImageViewer from './ImageViewer';
import SingleUpload from './SingleUpload';

const CustomizeJacket = () => {
  const { formState, setFormState } = useContext(FormContext);
  const {
    jacketType,
    additionals,
    spineType,
    singleArtworks,
    gatefoldArtworks,
  } = formState;

  return (
    <div className='flex h-full w-full items-center justify-between'>
      <section className='flex flex-col gap-12'>
        <div className='flex flex-col space-y-4'>
          <VinylCreationIcon />
          <h2 className='font-druk text-4xl'>Make your vinyl jacket unique</h2>

          <p className='text-xl'>
            Upload your artwork and customize your vinyl record
          </p>
        </div>

        <Switch
          state={jacketType == EJacket.Gatefold}
          setState={(state: boolean) =>
            setFormState({
              ...formState,
              jacketType: state ? EJacket.Gatefold : EJacket.Single,
            })
          }
          label='Jacket Type'
          values={JACKET_TYPES}
        />
        <div className='flex flex-wrap items-center gap-4'>
          {Additionals.map((additional: EAdditional, index: number) => {
            return (
              <div className='text-base desktop:text-xl' key={additional}>
                <input
                  id={`radio${index}`}
                  type='radio'
                  name='effect'
                  className='hidden'
                  checked={additionals?.includes(additional)}
                  onChange={() =>
                    // TODO:ANDREW - FIX THIS LOGIC
                    additionals?.includes(additional)
                      ? setFormState({
                          ...formState,
                          additionals: additionals.filter(
                            (i) => i !== Additionals[index]
                          ),
                        })
                      : setFormState({
                          ...formState,
                          additionals: [...additionals, Additionals[index]],
                        })
                  }
                />
                <label
                  htmlFor={`radio${index}`}
                  className='flex cursor-pointer items-center gap-3'>
                  <span className='mr-1 inline-block h-5 w-5 border-2 border-white/30'></span>
                  {additional}
                </label>
              </div>
            );
          })}
        </div>

        <div>
          {jacketType === EJacket.Single && (
            <Switch
              state={spineType === ESpine.ImageFoldOver}
              setState={(state: boolean) =>
                setFormState({
                  ...formState,
                  spineType: state ? ESpine.ImageFoldOver : ESpine.DefaultColor,
                })
              }
              label='Spine'
              values={SPINE_TYPE}
              width={'w-44'}
            />
          )}

          <span
            className={`mt-4 w-10/12 text-sm ${
              !spineType ? 'hidden' : 'block'
            }`}>
            Upload a slightly wider than square version of your Album Artwork at
            5200x5000px to accomodate for the spine on the left side of the
            image.
          </span>
        </div>
      </section>

      <section className='flex w-fit flex-row gap-5'>
        <div className='flex flex-row flex-wrap items-start justify-center gap-5 xl:flex-col xl:items-end xl:justify-start'>
          {jacketType === EJacket.Single ? (
            <SingleUpload
              spineType={spineType === ESpine.ImageFoldOver}
              jacketType={false}
              singleArray={singleArtworks!}
              setSingleArray={(state: TImage[]) =>
                setFormState({ ...formState, singleArtworks: state })
              }
            />
          ) : (
            <GatefoldUpload
              gatefoldArray={gatefoldArtworks!}
              setGatefoldArray={(state: TImage[]) => {
                setFormState({ ...formState, gatefoldArtworks: state });
              }}
            />
          )}
        </div>
        <ImageViewer
          additionals={additionals}
          singleArray={singleArtworks!}
          gatefoldArray={gatefoldArtworks!}
          jacketType={jacketType === EJacket.Gatefold}
        />
      </section>
    </div>
  );
};

export default CustomizeJacket;

export const VinylCreationIcon = () => {
  return (
    <p className='xl:text-md flex w-fit items-center justify-center space-x-2 rounded-full bg-dim-emerald py-2 pr-4 pl-3 text-sm uppercase text-black desktop:text-xl'>
      <GrDisc className='h-6 w-6' />
      <span>vinyl creation</span>
    </p>
  );
};
