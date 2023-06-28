import ConcentricText from './ConcentricText';

const VinylText: React.FC<{
  texts: string[];
  vinylsize: number;
  innerRadius: number;
  labeltext: string;
}> = ({ texts, vinylsize, innerRadius, labeltext }) => {
  const radiusDecrement = vinylsize / texts.length;
  return (
    <div>
      {/* Every other circle will get 0 or 90 degree*/}
      {texts.map((text: string, index: number) => (
        <ConcentricText
          key={index}
          text={text}
          radius={innerRadius + vinylsize - index * radiusDecrement}
          rotation={-90 * (index % 2)}
        />
      ))}
      <ConcentricText text={labeltext} radius={innerRadius - 4} rotation={0} />
    </div>
  );
};
export default VinylText;
