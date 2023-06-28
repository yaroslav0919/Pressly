const ColorPicker: React.FC<{
  colorValue: string | number;
  setColorValue: (args: any) => void;
}> = ({ colorValue, setColorValue }) => {
  return (
    <div className='flex w-fit items-center gap-4 rounded-lg bg-white/10 px-3 py-2 font-medium'>
      <div
        className={`relative h-12 w-12 cursor-pointer rounded-lg p-2 text-center`}
        style={{ background: colorValue }}>
        <input
          type='color'
          value={colorValue}
          onChange={(e) => setColorValue(e.target?.value)}
          className='absolute top-0 bottom-0 right-0 left-0 z-10 h-full cursor-pointer opacity-0'
        />
      </div>
      <div className='w-20 cursor-pointer rounded-lg py-4 pr-10 text-center'>
        {colorValue}
      </div>
    </div>
  );
};

export default ColorPicker;
