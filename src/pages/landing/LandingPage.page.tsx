import { Canvas } from '@react-three/fiber';
import Image from 'next/image';
import SoundMintLogo from 'public/static/images/SoundMintLogoMint.svg';
import { lazy, Suspense } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Color } from 'three';

import { useSubscribeEmailMutation } from '@services/api/subscriberAPI';

import styles from './LandingPage.module.scss';
import SubscribeEmailForm, {
  TSubscribeFormValues,
} from './components/SubscribeEmailForm';

const CircleRecords = lazy(
  () => import('@components/CircleRecords/CircleRecords')
);

const LandingPage = () => {
  const [subscribeEmailFn, { isLoading, isSuccess, error }] =
    useSubscribeEmailMutation();

  const onSubmit = async (values: TSubscribeFormValues) => {
    try {
      await subscribeEmailFn(values).unwrap();

      toast('Thank you for registering your interest', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error: any) {
      toast.error(
        error?.data.error ?? 'Internal error please try again later',
        {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        }
      );
    }
  };

  return (
    <div className='fixed top-0 h-screen w-full'>
      <div className='top-50 absolute right-0 z-0 h-[100%] w-full md:w-[60%]'>
        <Suspense>
          <Canvas
            onCreated={({ gl }) => {
              gl.setClearColor(new Color('#ffffff'), 0);
            }}>
            <CircleRecords />
          </Canvas>
        </Suspense>
      </div>

      <div className='mx-auto flex h-full w-3/4 items-center space-x-10'>
        <section className='z-10 flex w-fit max-w-lg flex-col space-y-6 font-favoritStd font-extralight md:ml-0'>
          <div className='flex flex-col space-y-3'>
            <span className='flex items-center text-sm'>
              Powered by
              <Image
                src={SoundMintLogo}
                alt='logo'
                className='ml-2 w-28'
                priority
              />
            </span>
            <h2 className='font-drukWide text-5xl'>
              Pressing vinyl,{' '}
              <div className={styles.textGradient + ' animate-textgradient'}>
                made easy.
              </div>
            </h2>
            <p>Your one-stop-shop for all your vinyl needs.</p>
          </div>

          {isSuccess ? (
            <div className='font-lg mt-20 w-fit rounded-lg border-gray-700 py-2 font-favoritStd font-bold'>
              Thank you for registering your interest, we&apos;ll be in touch
              soon!
            </div>
          ) : (
            <SubscribeEmailForm onSubmit={onSubmit} loading={isLoading} />
          )}
        </section>

        <div className='relative z-[-2]'>
          {/* Background Gradients */}
          <span className='fixed top-[-10vw] right-[-10vw] z-[-10] h-[35vw] w-[35vw] rounded-full border-[5vw] border-solid border-[#7a53f1] bg-gradient-to-br from-[#1056df] to-[#45fec4] opacity-[90%] blur-[50px] sm:blur-[100px]' />
          <span className='fixed bottom-[-20vw] left-[-30vw] z-[-10] h-[50vw] w-[50vw] rounded-full border-[5vw] border-solid border-[#7a53f1] bg-gradient-to-tl from-[#1056df] to-[#45fec4] opacity-[90%] blur-[50px] filter sm:blur-[100px]' />
        </div>
      </div>
      <footer className='fixed bottom-10 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap'>
        <div className='flex items-end gap-8 text-[10px] font-light sm:text-base md:gap-10'>
          <span>© 2023 Pressly. All rights reserved.</span>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
        </div>
      </footer>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};
export default LandingPage;
