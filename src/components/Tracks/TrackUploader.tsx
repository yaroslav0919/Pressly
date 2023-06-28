import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FaGripLines } from 'react-icons/fa';
import { FiMusic, FiTrash } from 'react-icons/fi';
import Image from 'next/image';

import CardUpload from '@components/CardUpload/CardUpload';
import { TTrack } from '@common/definitions/types';
import { convertSecondToTime } from '@common/utils/dates';
import { getSubstring } from '@common/utils/string';

const TrackUploader: React.FC<{
  category: any;
  tracks: any;
  handleChange: any;
  onDelete: any;
}> = ({ category, tracks, handleChange, onDelete }) => {
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='flex w-full items-center justify-between gap-16 text-white/50'>
        <div className='flex items-center gap-4 text-sm uppercase xl:text-base desktop:text-xl'>
          <FiMusic className='h-6 w-6 desktop:h-8 desktop:w-8' />
          track name
        </div>
        <Image
          src='/static/images/equalizer.svg'
          alt='equalizer'
          width={24}
          height={24}
        />
      </div>

      <Droppable droppableId={category.id}>
        {(provided, snapshot) => (
          <div
            className='h-19 flex max-h-80 w-full flex-col overflow-y-auto rounded-lg border border-gray-500'
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {tracks.length <= 0 && (
              <div className='flex h-full w-full items-center justify-center py-4'>
                <p className='text-gray-400'>Uploaded Tracks</p>
              </div>
            )}
            <div className='space-y-3'>
              {tracks.map((track: TTrack, index: number) => (
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
                      } w-[22rem]`}
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
                        className='ml-[10px] cursor-pointer'
                        onClick={() => onDelete(category.id, track.id)}>
                        <FiTrash className='mr-3 h-6 w-6 cursor-pointer desktop:h-8 desktop:w-8' />
                      </span>
                    </form>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <CardUpload
        onHandleChange={handleChange}
        typeVal='uncategorized'
        height=''
        icon=''
      />
    </div>
  );
};

export default TrackUploader;
