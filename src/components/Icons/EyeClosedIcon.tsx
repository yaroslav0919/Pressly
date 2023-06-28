type TEyeClosedIconProps = {
  className?: string;
};

const EyeClosedIcon: React.FC<TEyeClosedIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.5 3.75L19.5 20.25' stroke='white' strokeWidth='1.5' />
      <path
        d='M14.522 14.775C13.8338 15.4054 12.9334 15.7535 12.0001 15.75C11.2432 15.7499 10.5041 15.5208 9.87984 15.0928C9.25561 14.6647 8.77551 14.0579 8.50265 13.3519C8.22979 12.6459 8.17695 11.8739 8.35107 11.1373C8.52519 10.4007 8.91812 9.73406 9.47821 9.22498'
        stroke='white'
        strokeWidth='1.5'
      />
      <path
        d='M6.9375 6.43127C3.1125 8.36252 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C13.7574 18.7643 15.4929 18.3594 17.0625 17.5688'
        stroke='white'
        strokeWidth='1.5'
      />
      <path
        d='M19.5562 15.8531C21.6 14.025 22.5 12 22.5 12C22.5 12 19.5 5.24999 12 5.24999C11.3498 5.24871 10.7006 5.30202 10.0593 5.40937'
        stroke='white'
        strokeWidth='1.5'
      />
      <path
        d='M12.7031 8.31561C13.5006 8.46671 14.2273 8.87311 14.7735 9.47347C15.3198 10.0738 15.6559 10.8356 15.7313 11.6437'
        stroke='white'
        strokeWidth='1.5'
      />
    </svg>
  );
};

export default EyeClosedIcon;
