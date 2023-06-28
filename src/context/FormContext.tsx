import { createContext, ReactNode, useState } from 'react';

import {
  initialArtistImage,
  initialGatefold,
  initialLabelArtwork,
  initialSingle,
} from '@common/constants';
import {
  EAdditional,
  ECreateVinylSteps,
  EJacket,
  ELabelTypes,
  ELaunchTypes,
  ESpine,
  EVinylWeights,
  TImage,
  TVinylSide,
} from '@common/definitions';

const INITIAL_FORM_STATE: FormStateType = {
  step: ECreateVinylSteps.CustomizeJacket,
  jacketType: EJacket.Single, // false = single, true = gatefold
  additionals: [],
  spineType: ESpine.DefaultColor, // false = default color, true = image fold over
  singleArtworks: initialSingle,
  gatefoldArtworks: initialGatefold,
  gramWeight: EVinylWeights.Weight140gr, //false = 140gr, true = 180gr
  vinylColor: '#121212',
  labelType: ELabelTypes.SimpleLabel, //false = simple label, true = upload a label
  labelColor: '#202020',
  labelArtwork: initialLabelArtwork,
  albumName: null,
  tracksOnLabel: false,
  trackList: {
    uncategorized: {
      id: 'uncategorized',
      title: 'Uncategorized',
      tracks: [],
    },
    sideA: {
      id: 'sideA',
      title: 'Side A',
      tracks: [],
      progress: 0,
    },
    sideB: {
      id: 'sideB',
      title: 'Side B',
      tracks: [],
      progress: 0,
    },
  },
  launchType: ELaunchTypes.Quantity, // false = quantity, true = crowdfunding
  quantity: null, // in units
  presaleDuration: null, // in days
  contactInfo: {
    name: null,
    email: null,
    number: null,
  },
  artistInfo: {
    name: null,
    bio: null,
    image: initialArtistImage,
  },
  url: '',
};

interface FormStateType {
  step: ECreateVinylSteps;
  jacketType: EJacket; // false = single, true = gatefold
  additionals: EAdditional[];
  spineType: ESpine; // false = default color, true = image fold over
  singleArtworks?: TImage[];
  gatefoldArtworks?: TImage[];
  gramWeight: EVinylWeights; //false = 140gr, true = 180gr
  vinylColor: string;
  labelType: ELabelTypes; //false = simple label, true = upload a label
  labelColor?: string;
  labelArtwork?: TImage | null;
  albumName: string | null;
  tracksOnLabel: boolean;
  trackList: {
    [uncategorized: string]: TVinylSide;
    sideA: TVinylSide;
    sideB: TVinylSide;
  };
  launchType: ELaunchTypes; // false = quantity, true = crowdfunding
  quantity: number | null; // in units
  presaleDuration: number | null; // in days
  contactInfo: {
    name: string | null;
    email: string | null;
    number: string | null;
  };
  artistInfo: {
    name: string | null;
    bio: string | null;
    image: TImage | null;
  };
  url: string | null;
}

interface FormContextType {
  formState: FormStateType;
  setFormState: any;
  // React.Dispatch<React.SetStateAction<FormStateType>>;
}

export const FormContext = createContext<FormContextType>({
  formState: INITIAL_FORM_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFormState: () => {},
});

const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formState, setFormState] = useState<FormStateType>(INITIAL_FORM_STATE);

  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
