import React, { useRef } from 'react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

type TFileUpload = {
  title: string;
  id: string;
  assetVal: string;
  onHandleChange: (event: any, values: any, id: string) => void;
  size: string;
  hidden: boolean;
};

const FileUpload: React.FC<TFileUpload> = ({
  title,
  id,
  assetVal,
  onHandleChange,
  size,
  hidden,
}) => {
  const [isDragover, setIsDragover] = React.useState(false);
  const dropElementRef = useRef(null);

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

    onHandleChange(
      e.target.files,
      URL.createObjectURL(e.dataTransfer.files[0]),
      id
    );
  };

  const onChangeHandler = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      onHandleChange(
        e.target.files,
        URL.createObjectURL(e.target.files[0]),
        id
      );
    }
  };

  return (
    <>
      <label
        className={`
          relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-white bg-border text-center 
          ${
            size === 'big'
              ? 'h-40 w-40 gap-4 px-4 py-6 text-base'
              : 'h-28 w-28 gap-2 px-2 py-4 text-sm'
          }
          ${hidden ? 'invisible' : 'visible'}
        `}
        htmlFor={title.toString()}
        onDrag={preventingDefaultForDragEvents}
        onDragStart={preventingDefaultForDragEvents}
        onDragEnter={onDragOverAndDragEnter}
        onDragOver={onDragOverAndDragEnter}
        onDragLeave={onDragLeaveAndDragEnd}
        onDragEnd={onDragLeaveAndDragEnd}
        onDrop={onDropHandler}
        ref={dropElementRef}>
        {assetVal && (
          <Image
            src={assetVal}
            alt=''
            fill
            className='absolute h-full w-full'
          />
        )}
        <FiUpload
          className={`${
            size === 'big' ? 'h-6 w-6 desktop:h-8 desktop:w-8' : 'h-5 w-5'
          } ${assetVal && 'opacity-0'}`}
        />
        <h1 className={`font-medium ${assetVal && 'opacity-0'}`}>
          Upload {title}
        </h1>
        <input
          id={title.toString()}
          name={title.toString()}
          onChange={onChangeHandler}
          className='hidden'
          type='file'
          accept='image/png, image/jpg'
        />
      </label>
    </>
  );
};

export default FileUpload;
