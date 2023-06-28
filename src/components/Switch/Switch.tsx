type propsType = {
  state: boolean;
  setState: (value: boolean) => void;
  label: string;
  values: string[];
  width?: string;
};

const Switch = ({ state, setState, label, values, width }: propsType) => {
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-sm font-medium desktop:text-lg'>{label}</h2>

      <div className='flex w-fit items-center rounded-lg bg-white/10 text-base font-medium'>
        <div
          className={`h-full cursor-pointer whitespace-nowrap py-4 text-center transition-all duration-700 ${
            !state && 'rounded-lg bg-white text-black'
          } ${width ? width : 'w-32'}`}
          onClick={() => setState(false)}>
          {values?.[0]}
        </div>

        <div
          className={`h-full cursor-pointer items-center whitespace-nowrap py-4 text-center transition-all duration-700 ${
            state && 'rounded-lg bg-white text-black'
          } ${width ? width : 'w-32'}`}
          onClick={() => setState(true)}>
          {values?.[1]}
        </div>
      </div>
    </div>
  );
};

export default Switch;
