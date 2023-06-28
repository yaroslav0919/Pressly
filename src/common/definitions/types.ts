export type TImage = {
  id: string;
  value: any;
  asset: any;
  title: string;
};

export type TTrack = {
  id: string;
  file: Blob;
  name: string;
  duration: number;
};

export type TVinylSide = {
  id: string;
  title: string;
  tracks: TTrack[];
  progress?: number;
};

export type TDefaultProps = { className?: string; rootClassName?: string };
