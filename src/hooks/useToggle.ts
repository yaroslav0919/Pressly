import { useState } from 'react';

export default function useToggle() {
  const [isShow, setIsShow] = useState(false);

  const onToggle = () => setIsShow(!isShow);
  const onOpen = () => setIsShow(true);
  const onClose = () => setIsShow(false);

  return {
    isShow,
    setIsShow,
    onToggle,
    onOpen,
    onClose,
  };
}
