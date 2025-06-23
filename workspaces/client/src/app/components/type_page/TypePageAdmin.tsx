'use client';

import { useAuth } from '@/app/context/AuthProvider';
import NotFound from '@/app/not-found';
import { ThreeDots } from 'react-loader-spinner';

export default function TypePageAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, isLogged, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (!isLogged || !isAdmin) {
    return <NotFound />;
  }

  return children;
}
