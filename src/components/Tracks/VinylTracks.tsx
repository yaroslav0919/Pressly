import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FaGripLines } from 'react-icons/fa';
import { FiMusic, FiTrash } from 'react-icons/fi';
import Image from 'next/image';

import { TTrack, TVinylSide } from '@common/definitions';
import { convertSecondToTime, getRemainingTime } from '@common/utils/dates';
import { getSubstring } from '@common/utils/string';

const VinylTracks: React.FC<{
  side: TVinylSide;
  tracks: TTrack[];
  onDelete: any;
}> = ({ side, tracks, onDelete }: any) => {
  return (
    <div className='flex min-w-[22rem] flex-col gap-10'>
      <div className='flex flex-col gap-6'>
        <div className='flex w-full items-center gap-6'>
          <Image
            src='/static/images/VinylSide.png'
            alt='image'
            width={104}
            height={104}
          />
          <h1 className='text-2xl font-bold xl:text-3xl desktop:text-5xl'>
            {side.title}
          </h1>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='w-full text-sm xl:text-base desktop:text-xl'>
            {side.progress
              ? getRemainingTime(side.progress)
              : getRemainingTime(0)}{' '}
            minutes remaining
          </p>
          <progress className='w-full' value={side.progress || 0} max={1500} />
        </div>
      </div>
      <div className='flex flex-col items-center gap-3'>
        <div className='flex w-full items-center justify-between gap-16 text-sm text-white/50 xl:text-base desktop:text-xl'>
          <span className='flex items-center gap-4 uppercase'>
            <FiMusic className='h-6 w-6 desktop:h-8 desktop:w-8' />
            track name
          </span>
          <Image
            src='/static/images/equalizer.svg'
            alt='equalizer'
            width={24}
            height={24}
          />
        </div>
        <div className='max-h-96 w-full overflow-y-auto'>
          <Droppable droppableId={side.id}>
            {(droppableProvided, droppableSnapshot) => (
              <div
                className='mt-3 flex w-full flex-1 flex-col'
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}>
                {tracks.length > 0 ? (
                  tracks.map((track: TTrack, index: number) => (
                    <Draggable
                      key={track.id}
                      draggableId={`${track.id}`}
                      index={index}>
                      {(provided, snapshot) => (
                        <form
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          className={`flex items-center ${
                            snapshot.isDragging ? '' : ''
                          } w-full`}
                          ref={provided.innerRef}>
                          <div className='flex flex-1 items-center justify-between gap-5 rounded-lg bg-neutral-900 px-4 py-5 text-sm xl:text-base desktop:text-xl'>
                            <h1 className='w-full whitespace-nowrap'>
                              {getSubstring(track.name)}
                            </h1>
                            <div className='flex items-center gap-5'>
                              <span className='flex gap-2'>
                                {convertSecondToTime(track.duration)}
                              </span>
                              <FaGripLines className='h-6 w-6 desktop:h-8 desktop:w-8' />
                            </div>
                          </div>
                          <span
                            className='ml-[10px] cursor-pointer text-[25px] desktop:text-4xl'
                            onClick={() => onDelete(side.id, track.id)}>
                            <FiTrash className='mr-3 h-6 w-6 cursor-pointer desktop:h-8 desktop:w-8' />
                          </span>
                        </form>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className='flex h-60 w-full flex-col items-center justify-center gap-4 rounded-lg border border-white/40 p-4 text-center text-sm xl:p-8 xl:text-base desktop:p-16 desktop:text-xl'>
                    <FiMusic className='h-6 w-6 desktop:h-8 desktop:w-8' />
                    <p>Drag and drop tracks on {side.title}</p>
                  </div>
                )}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default VinylTracks;
