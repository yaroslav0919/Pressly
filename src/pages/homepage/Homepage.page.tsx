import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Homepage = () => {
  const router = useRouter();

  const handleClick = async () => {
    router.push('/create');
  };

  return (
    <div className='relative z-10 flex h-full w-full flex-col gap-19 pl-20 pt-16 xl:pl-40 2xl:pl-60 '>
      <span className='fixed bottom-[-10vw] left-[-10vw] z-[-1] h-[35vw] w-[35vw] rounded-full border-[60px] border-solid border-[#7a53f1] bg-gradient-to-br from-[#1056df] to-[#45fec4] blur-[130px] filter' />
      <span className='fixed top-[-10vw] right-[-10vw] z-[-1] h-[35vw] w-[35vw] rounded-full border-[60px] border-solid border-[#7a53f1] bg-gradient-to-br from-[#1056df] to-[#45fec4] blur-[130px] filter ' />
      <span className='' />
      <div className='flex h-full'>
        <div className='flex w-full flex-1 flex-col justify-center gap-6'>
          <h1 className='w-[1001px] text-5xl font-black leading-[105px] xl:text-6xl 2xl:text-7xl desktop:text-8xl '>
            Launch a record vinyl collection in{' '}
            <span className='animate-gradient bg-gradient-to-l from-gradient-orange via-gradient-pink to-gradient-blue bg-clip-text text-transparent'>
              minutes.
            </span>
          </h1>
          <p className='text-lg xl:text-xl desktop:text-3xl'>
            Design, create, launch, sell. With Pressly you can build the vinyl
            of your dreams.
          </p>
          <div className='mt-11 hidden lg:block'>
            <button
              className='gradient-button flex animate-gradient items-center gap-4 rounded-md px-6 py-4 text-lg xl:text-xl desktop:px-10 desktop:py-6 desktop:text-3xl'
              onClick={handleClick}>
              Get Started <BsArrowRight />
            </button>
          </div>
        </div>
        <div className='flex h-full justify-end'>
          <Image
            src='/static/images/vinyl.png'
            alt='vinyl'
            className='hidden desktop:block'
            width={1200}
            height={500}
          />
          <Image
            src='/static/images/vinyl.png'
            alt='vinyl'
            className='block desktop:hidden'
            width={600}
            height={500}
          />
        </div>
      </div>
      <div className='flex items-end gap-12 text-base font-light desktop:text-xl'>
        <span>© 2023 Pressly. All rights reserved.</span>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
      </div>
    </div>
  );
};

export default Homepage;
