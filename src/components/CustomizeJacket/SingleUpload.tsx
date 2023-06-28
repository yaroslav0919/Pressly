import FileUpload from '@components/FileUpload/FileUpload';
import { TImage } from '@common/definitions';

const SingleUpload: React.FC<{
  jacketType: boolean;
  spineType: boolean;
  singleArray: TImage[];
  setSingleArray: (arg0: TImage[]) => void;
}> = ({ spineType, singleArray, setSingleArray }) => {
  const handleChange = (file: any, asset: string, id: string) => {
    const val = singleArray.map((item) => {
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
    setSingleArray(val);
  };

  return (
    <div className='space-y-5'>
      {singleArray.map((item) => {
        if (item.id === 'single_spine' && !spineType) return null;
        return (
          <FileUpload
            title={item.title}
            id={item.id}
            assetVal={item.asset}
            onHandleChange={handleChange}
            size='small'
            hidden={false}
            // Set hidden to true initially for Spine, as we will default to a simple colored
            // spine, and let user Opt in for more complicated
            key={item.id}
          />
        );
      })}
    </div>
  );
};
export default SingleUpload;
