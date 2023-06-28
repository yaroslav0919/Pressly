import { useRouter } from 'next/router';

import Button, { IButtonProps } from '@components/Button/Button';

const BackButton: React.FC<IButtonProps> = ({
  variant = 'primary',
  className,
}) => {
  const router = useRouter();
  const onBack = () => router.back();

  return (
    <Button
      data-testId='back-btn'
      variant={variant}
      onClick={onBack}
      className={className}>
      Go Back
    </Button>
  );
};

export default BackButton;
