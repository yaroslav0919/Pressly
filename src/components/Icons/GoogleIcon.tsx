type TGoogleIconProps = {
  className?: string;
};

const GoogleIcon: React.FC<TGoogleIconProps> = ({ className }) => {
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
        d='M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z'
        fill='white'
      />
      <path
        d='M11.9999 23C14.9699 23 17.4599 22.015 19.2799 20.335L15.7249 17.575C14.7399 18.235 13.4799 18.625 11.9999 18.625C9.13492 18.625 6.70992 16.69 5.84492 14.09H2.16992V16.94C3.97992 20.535 7.69992 23 11.9999 23Z'
        fill='white'
      />
      <path
        d='M5.845 14.0901C5.625 13.4301 5.5 12.7251 5.5 12.0001C5.5 11.2751 5.625 10.5701 5.845 9.91006V7.06006H2.17C1.4 8.59292 0.999321 10.2847 1 12.0001C1 13.7751 1.425 15.4551 2.17 16.9401L5.845 14.0901Z'
        fill='white'
      />
      <path
        d='M11.9999 5.375C13.6149 5.375 15.0649 5.93 16.2049 7.02L19.3599 3.865C17.4549 2.09 14.9649 1 11.9999 1C7.69992 1 3.97992 3.465 2.16992 7.06L5.84492 9.91C6.70992 7.31 9.13492 5.375 11.9999 5.375Z'
        fill='white'
      />
    </svg>
  );
};

export default GoogleIcon;
