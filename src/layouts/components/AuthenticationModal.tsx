import { useState } from 'react';

import Modal from '@components/Modal/Modal';

import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';
import styles from './AuthenticationModal.module.scss';

type AuthenticationModalType = {
  isOpen: boolean;
  onCloseModal: () => void;
};

const AuthenticationModal: React.FC<AuthenticationModalType> = ({
  isOpen,
  onCloseModal,
}) => {
  const [shouldUseLoginForm, setShouldUseLoginForm] = useState(true);

  const handleSwitchForm = () => setShouldUseLoginForm(!shouldUseLoginForm);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      title='Hello there'
      modalWrapperClass={styles.modalWrapper}
      modalContentClass={styles.fullContent}>
      <p>
        Before you continue, please login to your account that we can save your
        status
      </p>
      {shouldUseLoginForm ? (
        <FormLogin
          switchToOtherForm={handleSwitchForm}
          closeModal={onCloseModal}
        />
      ) : (
        <FormSignUp
          switchToOtherForm={handleSwitchForm}
          closeModal={onCloseModal}
        />
      )}
    </Modal>
  );
};

export default AuthenticationModal;
