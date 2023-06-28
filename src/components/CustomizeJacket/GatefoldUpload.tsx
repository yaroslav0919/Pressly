import FileUpload from '@components/FileUpload/FileUpload';
import { TImage } from '@common/definitions';

const GatefoldUpload: React.FC<{
  gatefoldArray: TImage[];
  setGatefoldArray: (arg0: TImage[]) => void;
}> = ({ gatefoldArray, setGatefoldArray }) => {
  const handleChange = (file: any, asset: string, id: string) => {
    const val = gatefoldArray.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          value: file[0],
          asset: asset,
        };
      } else {
        return item;
      }
    });
    setGatefoldArray(val);
  };

  return (
    <div className='space-y-5'>
      {gatefoldArray.map((item) => (
        <FileUpload
          title={item.title}
          id={item.id}
          assetVal={item.asset}
          onHandleChange={handleChange}
          size='small'
          hidden={false}
          key={item.id}
        />
      ))}
    </div>
  );
};
export default GatefoldUpload;
