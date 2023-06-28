import { EAdditional } from './definitions/enums';

export const Additionals = [
  EAdditional.MatteFinish,
  EAdditional.Numbering,
  EAdditional.ShrinkWrapping,
];

export const initialSingle = [
  {
    id: 'single_front',
    value: '',
    asset: '/static/images/Rectangle3.png',
    title: 'Front Artwork',
  },
  {
    id: 'single_back',
    value: '',
    asset: '',
    title: 'Back Artwork',
  },
  {
    id: 'single_spine',
    value: '',
    asset: '',
    title: 'Wide Artwork with Spine',
  },
];

export const initialGatefold = [
  {
    id: 'gatefold_front',
    value: '',
    asset: '',
    title: 'Front Artwork',
  },
  {
    id: 'gatefold_back',
    value: '',
    asset: '',
    title: 'Back Artwork',
  },
  {
    id: 'gatefold_inside_left',
    value: '',
    asset: '',
    title: 'Inside Left Artwork',
  },
  {
    id: 'gatefold_inside_right',
    value: '',
    asset: '',
    title: 'Inside Right Artwork',
  },
  {
    id: 'gatefold_spine',
    value: '',
    asset: '',
    title: 'Spine Artwork',
  },
];

export const initialLabelArtwork = {
  id: 'label_artwork',
  value: '',
  asset: '',
  title: 'Label Artwork',
};

export const initialArtistImage = {
  id: 'artist_image',
  value: '',
  asset: '',
  title: 'Artist Image',
};

export const JACKET_TYPES = ['Single', 'Gatefold'];
export const SPINE_TYPE = ['Default Color', 'Image Fold Over'];

export const colors = [
  '#202020',
  '#FF3535',
  '#FFBA35',
  '#FFFFFF',
  '#76FF35',
  '#BC4EF0',
];

export const LABEL_TYPE = ['Simple Label', 'Upload a Label'];

export const VINYL_WEIGHTS = ['140 gr', '180 gr'];

export const SIDES = ['Side A', 'Side B'];

export const VINYL_COPY = ['by quantity', 'by time presale'];

// URL configs
export const ROOT_API = '/api';
export const BASE_CANONICAL_URL = process.env.NEXT_CANONICAL_URL;
