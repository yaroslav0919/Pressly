import { useSession } from 'next-auth/react';

export const useNextAuthSession = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  return {
    isLoading,
    isAuthenticated,
    session,
  };
};
