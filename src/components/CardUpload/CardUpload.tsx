import React, { useRef } from 'react';
import { FiMusic, FiUpload } from 'react-icons/fi';
import Image from 'next/image';

type propsType = {
  onHandleChange: any;
  typeVal: string;
  height: string;
  icon: string;
};

const CardUpload = ({ onHandleChange, typeVal, height, icon }: propsType) => {
  const [isDragover, setIsDragover] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dropElementRef = useRef(null);
  let duration = 0;

  const preventingDefaultForDragEvents = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOverAndDragEnter = (e: any) => {
    preventingDefaultForDragEvents(e);
    setIsDragover(true);
  };

  const onDragLeaveAndDragEnd = (e: any) => {
    preventingDefaultForDragEvents(e);
    e.target === dropElementRef.current && setIsDragover(false);
  };

  const onDropHandler = (e: any) => {
    preventingDefaultForDragEvents(e);
    setIsDragover(false);
    setFileInfo(e.dataTransfer.files);
  };

  const onChangehandler = async (e: any) => {
    setFileInfo(e.target.files);
  };

  const setFileInfo = async (value: any) => {
    try {
      setIsLoading(true);
      const files = value[0];
      const video = document.createElement('video');
      video.preload = 'metadata';
      const formData = new FormData();
      formData.append('file', files);
      // const keyval: any = await axios.post(`${api.S3UPLOAD}`, formData);
      const keyval = 'temp-keyval'; // TODO:ANDREW - SET PROPER KEY VAL
      // await uploadfile({
      //   body: formData,
      // }).unwrap();

      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        duration = video.duration;
        onHandleChange(files, files.name, typeVal, Number(duration));
      };
      if (files) video.src = URL?.createObjectURL(files);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='flex h-fit w-full flex-col items-center justify-center gap-4 bg-white/20 backdrop-blur-xl'>
          <Image
            src='/static/images/loading.png'
            alt=''
            width={50}
            height={50}
            className='animate-spin'
          />
        </div>
      ) : (
        <label
          className={`relative flex w-full cursor-pointer items-center justify-center gap-6 overflow-hidden rounded-md border-white bg-border p-6 text-center desktop:p-8 ${height}  ${
            isDragover
              ? 'border-brightGreen bg-red-400 bg-opacity-5'
              : 'bg-black '
          }`}
          htmlFor='traits'
          onDrag={preventingDefaultForDragEvents}
          onDragStart={preventingDefaultForDragEvents}
          onDragEnter={onDragOverAndDragEnter}
          onDragOver={onDragOverAndDragEnter}
          onDragLeave={onDragLeaveAndDragEnd}
          onDragEnd={onDragLeaveAndDragEnd}
          onDrop={onDropHandler}
          ref={dropElementRef}>
          {icon === 'music' ? (
            <FiMusic className='h-6 w-6 desktop:h-8 desktop:w-8' />
          ) : (
            <FiUpload className='h-6 w-6 desktop:h-8 desktop:w-8' />
          )}
          <h1 className='text-sm font-medium xl:text-base desktop:text-xl'>
            Drop or Click to Upload Tracks
          </h1>
          <input
            id='traits'
            name='traits'
            onChange={onChangehandler}
            className='hidden'
            type='file'
            // webkitdirectory="true"
            accept='audio/*'
          />
        </label>
      )}
    </>
  );
};

export default CardUpload;
