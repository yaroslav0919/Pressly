// import { Flex, h1, Text } from "@chakra-ui/react";

import { useContext, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { FiMusic } from 'react-icons/fi';

import { TTrack } from '@common/definitions';
import { FormContext } from '@context/FormContext';

import TrackUploader from './TrackUploader';
import VinylTracks from './VinylTracks';

//TODO-ANDREW: ADD PROGRESS TO TRACK SIDES
const Tracks = () => {
  // const [trackForm, setTrackForm] = useState<any>(initialData);
  const [loading, setLoading] = useState(false);
  const { formState, setFormState } = useContext(FormContext);

  const { trackList } = formState;

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;
    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    /////////// If the user drops within the same column but in a different position
    const sourceCol = trackList[source.droppableId];
    const destinationCol = trackList[destination.droppableId];
    const reorderedTracks: TTrack[] = [...sourceCol.tracks];
    // perform swap
    reorderedTracks[destination.index] = sourceCol.tracks[source.index];
    reorderedTracks[source.index] = sourceCol.tracks[destination.index];

    // set state
    if (sourceCol.id === destinationCol.id) {
      setFormState({
        ...formState,
        trackList: {
          ...trackList,
          [sourceCol.id]: {
            ...sourceCol,
            tracks: reorderedTracks,
          },
        },
      });

      return;
    }

    //////////// If user moves from one column to another
    // 1. Remove the track from the source column
    const [removed]: any = sourceCol.tracks.splice(source.index, 1);

    // 2. Add the track to the destination column in correct index position
    destinationCol.tracks.splice(destination.index, 0, removed);

    // 3. Set form state
    setFormState({
      ...formState,
      trackList: {
        ...formState.trackList,
        [sourceCol.id]: sourceCol,
        [destinationCol.id]: destinationCol,
      },
    });

    return;
  };

  const deleteTrack = (columnId: string, taskId: number) =>
    console.log('delete track', columnId, taskId);

  const handleChange = (
    files: File,
    name: string,
    type: string,
    duration: number
  ) => {
    console.log('called', files, name, type, duration);
    setFormState({
      ...formState,
      trackList: {
        ...formState.trackList,
        uncategorized: {
          ...formState.trackList.uncategorized,
          tracks: [
            ...formState.trackList.uncategorized.tracks,
            { id: `id-${name}-${duration}`, file: files, name, duration },
          ],
        },
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='mb-20 flex h-full w-full items-center justify-between xl:pl-10 2xl:pl-16 desktop:pt-60'>
        <section className='flex flex-col space-y-4'>
          <p className='xl:text-md flex w-fit items-center justify-center space-x-2 rounded-full bg-dim-emerald py-2 pr-4 pl-3 text-sm font-semibold uppercase text-black desktop:text-xl'>
            <FiMusic className='h-6 w-6' />
            <span>tracks</span>
          </p>
          <h2 className='text-4xl font-extrabold xl:text-4xl 2xl:text-5xl desktop:text-5xl'>
            Upload Tracks
          </h2>
          <div className='grid h-full min-h-[700px] w-full grid-cols-3 space-x-20'>
            <TrackUploader
              key={trackList.uncategorized.id}
              category={trackList.uncategorized}
              tracks={trackList.uncategorized.tracks}
              handleChange={handleChange}
              onDelete={deleteTrack}
            />
            <VinylTracks
              key={trackList.sideA.id}
              side={trackList.sideA}
              tracks={trackList.sideA.tracks}
              onDelete={deleteTrack}
            />
            <VinylTracks
              key={trackList.sideB.id}
              side={trackList.sideB}
              tracks={trackList.sideB.tracks}
              onDelete={deleteTrack}
            />
          </div>
        </section>
      </div>
    </DragDropContext>
  );
};

const calcProgress = (arr: any, duration: any) => {
  let progress = 0;
  arr?.forEach((x: any) => {
    progress += Number(x.duration);
  });
  progress += duration;
  return progress;
};

const reorderColumnList = (sourceCol: any, startIndex: any, endIndex: any) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export default Tracks;
