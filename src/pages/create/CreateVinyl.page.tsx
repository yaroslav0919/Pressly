import { useContext } from 'react';

import ArtistInfo from '@components/ArtistInfo/ArtistInfo';
import CustomizeJacket from '@components/CustomizeJacket/CustomizeJacket';
import CustomizeVinyl from '@components/CustomizeVinyl/CustomizeVinyl';
import LeftPanel from '@components/LeftSidePanel/LeftSidePanel';
import Publish from '@components/Publish/Publish';
import Quantity from '@components/Quantity/Quantity';
import Submit from '@components/Submission/Submission';
import Tracks from '@components/Tracks/Tracks';
import { ECreateVinylSteps } from '@common/definitions/enums';
import { FormContext } from '@context/FormContext';

const CreateVinylPage = () => {
  const { formState, setFormState } = useContext(FormContext);

  const getStep = (step: ECreateVinylSteps) => {
    switch (step) {
      case ECreateVinylSteps.CustomizeJacket:
      default:
        return <CustomizeJacket />;
      case ECreateVinylSteps.CustomizeVinyl:
        return <CustomizeVinyl />;
      case ECreateVinylSteps.Tracks:
        return <Tracks />;
      case ECreateVinylSteps.Quantity:
        return <Quantity />;
      case ECreateVinylSteps.ArtistInfo:
        return <ArtistInfo />;
      case ECreateVinylSteps.Publish:
        return <Publish />;
      case ECreateVinylSteps.Submit:
        return <Submit />;
    }
  };

  const handleSubmit = () => {
    setFormState({ ...formState, step: formState.step + 1 });
    window.scrollTo(0, 0);
  };

  const nextButton = (
    <button
      className='gradient-button w-36 animate-gradient rounded-md px-6 py-4'
      onClick={handleSubmit}>
      Next Step
    </button>
  );

  const backButton = (
    <button
      className='w-36 rounded-md px-6 py-4'
      onClick={() => {
        sessionStorage.setItem('step', '0');
        setFormState({
          ...formState,
          step: (formState.step - 1) as ECreateVinylSteps,
        });
        window.scrollTo(0, 0);
      }}>
      Go Back
    </button>
  );

  return (
    <div className='mx-auto mt-32  w-11/12 desktop:w-2/3'>
      <div className='mb-16 flex p-10'>
        <LeftPanel
          className='fixed top-60 left-10 desktop:relative desktop:top-0'
          step={formState.step}
        />
        <div className='mx-auto ml-52 w-10/12'>{getStep(formState.step)}</div>
      </div>
      {formState.step <= ECreateVinylSteps.Publish && (
        <div className='mx-auto flex w-fit gap-8 text-xl'>
          {formState.step !== ECreateVinylSteps.CustomizeJacket && backButton}
          {nextButton}
        </div>
      )}
    </div>
  );
};
export default CreateVinylPage;
