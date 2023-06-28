import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { ROUTES } from '@common/routes';
import Avatar from '@components/Avatar/Avatar';
import Dropdown from '@components/Dropdown/Dropdown';
import Modal from '@components/Modal/Modal';
import { useNextAuthSession } from '@hooks/useNextAuthSession';

import styles from './UserProfileDropdown.module.scss';

const UserProfileDropdown: React.FC = () => {
  const { session } = useNextAuthSession();

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);

  const [logoutInProgress, setLogoutInProgress] = useState(false);

  const onCloseLogOutModal = () => setIsOpenLogoutModal(false);
  const onOpenLogOutModal = () => setIsOpenLogoutModal(true);

  const onClickSeeProfile = () => console.log('see profile click');
  const onClickLogoutOption = () => onOpenLogOutModal();

  const onConfirmLogout = async () => {
    setLogoutInProgress(true);
    const signOutStatus = (await signOut({
      callbackUrl: ROUTES.landingPage,
      redirect: false,
    })) as unknown;

    if (
      !signOutStatus ||
      typeof signOutStatus !== 'object' ||
      !('url' in signOutStatus)
    )
      return;

    setLogoutInProgress(false);
    window.location.replace(signOutStatus.url as string);
  };

  const links = [
    {
      label: 'see profile',
      handler: onClickSeeProfile,
    },
    {
      label: 'log out',
      handler: onClickLogoutOption,
    },
  ];

  return (
    <>
      <div className='flex flex-row'>
        <Avatar
          src={session?.user?.image || '/static/images/defaultAvatar.png'}
        />
        <Dropdown
          options={links}
          placeholder={session?.user?.name || ''}
          className={styles.root}
          dropdownControllClassName={styles.transparentBg}
          menuClassName={styles.menuClass}
          replacePlaceholderAfterSelected={false}
        />
      </div>
      <Modal
        isOpen={isOpenLogoutModal}
        onClose={onCloseLogOutModal}
        title='Log out'
        primaryButtonLabel='Confirm'
        secondaryButtonLabel='Cancel'
        onClickPrimaryButton={onConfirmLogout}
        onClickSecondaryButton={onCloseLogOutModal}
        loadingPrimaryButton={logoutInProgress}>
        <p className='text-FAFAFA'>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default UserProfileDropdown;
