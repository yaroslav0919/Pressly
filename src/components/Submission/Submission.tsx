import Image from 'next/image';
import Link from 'next/link';

const Submit = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center space-y-10'>
      <div className='relative w-80 bg-white/10'>
        <Image
          src='/static/images/Wrap.png'
          alt='overlay'
          width={320}
          height={320}
          className='absolute z-20'
        />
        <Image
          src='/static/images/Rectangle3.png'
          alt='image'
          className='z-10'
          width={320}
          height={320}
        />
      </div>
      <div className='text-center'>
        <h1 className='text-5xl font-extrabold'>
          Your vinyl has been submitted!
        </h1>
      </div>
      <p>
        Thanks for submitting! We&apos;ll be reviewing your <br /> submission
        and will reach out with a quote shortly.
      </p>
      <Link href='/dashboard'>
        <button className='gradient-button animate-gradient rounded-md px-6 py-4 text-xl'>
          View Dashboard
        </button>
      </Link>
      <div className='flex items-end gap-20 pt-10 font-light'>
        <span>© 2023 Pressly. All rights reserved.</span>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
      </div>
    </div>
  );
};

export default Submit;
