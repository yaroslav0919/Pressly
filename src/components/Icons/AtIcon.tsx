type TAtIconProps = {
  className?: string;
};

const AtIcon: React.FC<TAtIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.0002 15.7495C14.0713 15.7495 15.7502 14.0706 15.7502 11.9995C15.7502 9.92847 14.0713 8.24954 12.0002 8.24954C9.92918 8.24954 8.25024 9.92847 8.25024 11.9995C8.25024 14.0706 9.92918 15.7495 12.0002 15.7495Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.9767 19.4997C15.3058 20.6087 13.3125 21.1278 11.313 20.9748C9.31346 20.8219 7.42229 20.0055 5.93954 18.6554C4.4568 17.3052 3.46741 15.4985 3.12837 13.5221C2.78932 11.5456 3.12004 9.51245 4.06805 7.74532C5.01606 5.97819 6.52705 4.57825 8.36128 3.76765C10.1955 2.95705 12.2479 2.7822 14.1928 3.27086C16.1377 3.75952 17.8638 4.88369 19.097 6.465C20.3303 8.04631 21.0001 9.99419 21.0003 11.9995C21.0003 14.0706 20.2503 15.7495 18.3753 15.7495C16.5003 15.7495 15.7503 14.0706 15.7503 11.9995V8.24955'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default AtIcon;
