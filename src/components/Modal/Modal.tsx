import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

import Button from '@components/Button/Button';
import DeleteIcon from '@components/Icons/DeleteIcon';

import { modalVariant } from './modal.animate';
import styles from './Modal.module.scss';

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleClass?: string;
  modalWrapperClass?: string;
  modalDescriptionClass?: string;
  modalContentClass?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onClickPrimaryButton?: () => any;
  onClickSecondaryButton?: () => any;
  loadingPrimaryButton?: boolean;
  loadingSecondaryButton?: boolean;
  useDeleteIcon?: boolean;
  deleteIconClass?: string;
};

const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    children,
    title,
    titleClass,
    modalWrapperClass,
    useDeleteIcon = true,
    deleteIconClass,
    primaryButtonLabel,
    secondaryButtonLabel,
    onClickPrimaryButton,
    onClickSecondaryButton,
    loadingPrimaryButton,
    loadingSecondaryButton,
    modalDescriptionClass,
    modalContentClass,
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      overlayRef.current &&
      event.target === overlayRef.current
    )
      onClose();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const modalClasses = classNames(styles.modal, modalWrapperClass);
  const modalDescriptionClasses = classNames(
    styles.description,
    modalDescriptionClass
  );
  const modalContentClasses = classNames(
    styles.modalContent,
    modalContentClass
  );
  const deleteIconClasses = classNames(styles.deleteIconRoot, deleteIconClass);
  const titleClasses = classNames(styles.title, titleClass);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className={styles.modalOverlay} ref={overlayRef}>
          <motion.div
            className={modalClasses}
            ref={modalRef}
            variants={modalVariant}
            initial='modalHidden'
            animate='modalVisible'
            exit='modalHidden'
            transition={{
              y: { type: 'spring', mass: 0.4, damping: 8, stiffness: 100 },
            }}>
            {useDeleteIcon && (
              <div className={styles.deleteIconWrapper} onClick={onClose}>
                <DeleteIcon className={deleteIconClasses} />
              </div>
            )}
            <div className={modalContentClasses}>
              <h4 className={titleClasses}>{title}</h4>
              <div className={modalDescriptionClasses}>
                {children || 'Your description here'}
              </div>

              <div className='flex flex-row justify-between'>
                {secondaryButtonLabel && (
                  <Button
                    className={styles.modalBtn}
                    variant='text'
                    onClick={onClickSecondaryButton}
                    isLoading={loadingSecondaryButton}>
                    {secondaryButtonLabel}
                  </Button>
                )}
                {primaryButtonLabel && (
                  <Button
                    className={styles.modalBtn}
                    variant='primary'
                    onClick={onClickPrimaryButton}
                    isLoading={loadingPrimaryButton}>
                    {primaryButtonLabel}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
