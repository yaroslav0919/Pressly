import React from 'react';

const ConcentricText: React.FC<{
  text: string;
  radius: number;
  rotation: number;
}> = ({ text, radius, rotation }) => {
  const letters = text.split('');

  return (
    <div
      className='width-[100%] height-[100%] transform-origin-center absolute left-[50%] top-[50%]'
      style={{
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        borderRadius: `${radius}px`,

        transform: `translate(${
          -radius * 1
        }px,${-radius}px) rotateZ(${rotation}deg)`,
      }}>
      {letters.map((letter, index) => (
        <div
          key={index}
          className='absolute'
          style={{
            left: `${radius}px`,
            top: `${radius}px`,
            transform: `rotate(${
              (index / letters.length) * 360.0
            }deg) rotateZ(-30.0deg) translate(${-radius}px, -${radius}px)`,
          }}>
          <div
            style={{ transform: `rotateZ(${rotation - 45}deg)` }}
            className='absolute'>
            {letter}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConcentricText;
