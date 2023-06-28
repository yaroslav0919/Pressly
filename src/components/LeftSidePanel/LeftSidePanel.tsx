import { BsFillCheckCircleFill } from 'react-icons/bs';

import { ECreateVinylSteps } from '@common/definitions';

// TODO:ANDREW - THIS COMPONENT NEEDS TO BE REWRITTEN

const LeftPanel: React.FC<{ step: ECreateVinylSteps; className?: string }> = ({
  step,
  className,
}) => {
  const panelItems = ['vinyl', 'tracks', 'quantity', 'artist'];

  return (
    <aside
      className={`flex flex-col gap-10 text-base uppercase xl:text-lg desktop:text-xl ${className}`}>
      {panelItems.map((item, index) => {
        // if (step <= 1) {
        //   return (
        //     <div
        //       key={item}
        //       className={`// flex items-center
        //       gap-3 ${index <= 1 ? 'text-white' : 'text-white/30'}`}>
        //       {/* {step >= index && <BsFillCheckCircleFill />}  */}
        //       {item}
        //     </div>
        //   );
        // }
        return (
          <div
            key={item}
            className={`flex items-center gap-3  ${
              step < index
                ? 'text-white'
                : step >= index
                ? 'text-greenish'
                : 'text-white/30'
            }`}>
            {step >= index && <BsFillCheckCircleFill />} {item}
          </div>
        );
      })}
    </aside>
  );
};

export default LeftPanel;
