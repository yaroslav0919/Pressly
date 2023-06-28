import { useContext, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Image from 'next/image';

import FileUpload from '@components/FileUpload/FileUpload';
import Disc from '@components/Icons/Disc';
import Switch from '@components/Switch/Switch';
import { colors, LABEL_TYPE, VINYL_WEIGHTS } from '@common/constants';
import {
  EAdditional,
  ELabelTypes,
  EVinylWeights,
  TImage,
} from '@common/definitions';
import { FormContext } from '@context/FormContext';

import ColorPicker from './ColourPicker';
import { VinylCreationIcon } from '../CustomizeJacket/CustomizeJacket';

const CustomizeVinyl = () => {
  const [flip, setFlip] = useState(false);

  const { formState, setFormState } = useContext(FormContext);
  const {
    additionals,
    gramWeight,
    labelType,
    vinylColor,
    labelColor,
    labelArtwork,
    singleArtworks,
    gatefoldArtworks,
  } = formState;

  console.log('vinylcolor', vinylColor);

  const [data, setData] = useState({
    front_artwork: null,
    back_artwork: null,
  });

  return (
    <section className='flex h-full w-full justify-between space-x-20'>
      <div className='flex flex-col space-y-4'>
        <VinylCreationIcon />
        <h2 className='text-4xl font-extrabold'>Customize Vinyl</h2>

        <Switch
          state={gramWeight === EVinylWeights.Weight180gr}
          setState={(state: boolean) =>
            setFormState({
              ...formState,
              gramWeight: state
                ? EVinylWeights.Weight180gr
                : EVinylWeights.Weight140gr,
            })
          }
          label='Vinyl Gram Weight'
          values={VINYL_WEIGHTS}
        />
        {gramWeight && (
          <p>Premium weight will add additional costs on production</p>
        )}

        <h2 className='text-sm font-medium desktop:text-lg'>Vinyl Color</h2>
        <ColorPicker
          colorValue={vinylColor}
          setColorValue={(state: string | number) =>
            setFormState({ ...formState, vinylColor: state })
          }
        />

        <Switch
          state={labelType === ELabelTypes.UploadLabel}
          setState={(state: boolean) =>
            setFormState({
              ...formState,
              labelType: state
                ? ELabelTypes.UploadLabel
                : ELabelTypes.SimpleLabel,
            })
          }
          label='Label Type'
          values={LABEL_TYPE}
        />

        {labelType === ELabelTypes.UploadLabel ? (
          <FileUpload
            title={labelArtwork!.title}
            id={labelArtwork!.id}
            assetVal={labelArtwork!.asset}
            onHandleChange={(file: any, asset: string, id: string) => {
              setFormState({
                ...formState,
                labelArtwork: { ...labelArtwork, value: file[0], asset: asset },
              });
            }}
            size='small'
            hidden={false}
          />
        ) : (
          <div className='mt-3 flex gap-4 px-2 desktop:gap-6'>
            {colors.map((item, i) => (
              <div
                className={`h-8 w-8 cursor-pointer rounded-full desktop:h-12 desktop:w-12 ${
                  labelColor === item
                    ? 'scale-125 border-2'
                    : 'scale-100 border'
                }`}
                style={{ background: item }}
                key={i}
                onClick={() => setFormState({ ...formState, labelColor: item })}
              />
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-10'>
        <CustomizeVinylImage
          colorValue={vinylColor as string}
          labelType={labelType === ELabelTypes.UploadLabel}
          fileValue={labelArtwork!}
          labelColor={labelColor as string}
          flip={flip}
          singleArray={singleArtworks!}
          gatefoldArray={gatefoldArtworks!}
          additionals={additionals}
          jacketType={false}
        />
        <span
          className='flex cursor-pointer items-center justify-center gap-4'
          onClick={() => setFlip(!flip)}>
          <FiRefreshCw className='h-6 w-6' />
          Flip Vinyl
        </span>
      </div>
    </section>
  );
};

export default CustomizeVinyl;

export const CustomizeVinylImage: React.FC<{
  className?: string;
  colorValue: string | number;
  labelType: boolean;
  fileValue: { title: string; id: string; asset: string };
  labelColor: string | number;
  flip: boolean;
  singleArray: TImage[];
  gatefoldArray: TImage[];
  additionals: EAdditional[];
  jacketType: boolean;
}> = ({
  colorValue,
  labelType,
  fileValue,
  labelColor,
  flip,
  className,
  additionals,
  singleArray,
  gatefoldArray,
  jacketType,
}) => {
  console.log('color value', colorValue);

  return (
    <div
      className={`relative h-[450px] w-[675px] ${className} 2xl:h-[576px] 2xl:w-[864px]`}>
      <div className='absolute right-[225px] z-10 h-[450px] w-[450px] bg-white/10 2xl:right-[288px] 2xl:h-[576px] 2xl:w-[576px]'>
        {additionals.includes(EAdditional.MatteFinish) ? (
          <Image
            src='/static/images/Matte.png'
            alt='overlay'
            fill
            className='absolute z-10'
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

      <div className='absolute right-0 h-[450px] w-[450px] 2xl:h-[576px] 2xl:w-[576px]'>
        <div className='absolute h-[450px] w-[450px] overflow-hidden rounded-full 2xl:h-[576px] 2xl:w-[576px]'>
          <Disc
            diskcolor={colorValue as string}
            labelColor={
              (labelType
                ? fileValue.asset !== ''
                  ? fileValue.asset
                  : labelColor
                : labelColor) as string
            }
            logoColor={
              labelColor !== '#202020' || labelType ? '#202020' : '#fff'
            }
            labelType={labelType}
          />
        </div>
        <div className='absolute z-2 h-[450px] w-[450px] overflow-hidden rounded-full opacity-70 mix-blend-luminosity 2xl:h-[576px] 2xl:w-[576px]'>
          <Image
            src='/static/images/SMVinylOverlay.png'
            alt='overlay'
            fill
            className=''
          />
        </div>
      </div>
    </div>
  );
};
