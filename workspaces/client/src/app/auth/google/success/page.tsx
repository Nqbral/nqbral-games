'use client';

import NavbarBlack from '@/app/components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function GoogleSuccess() {
  const router = useRouter();
  const { isLogged, connectGoogle } = useAuth();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/signin');
      return;
    }

    connectGoogle(token);
  }, [connectGoogle, router, token]);

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  return (
    <>
      <NavbarBlack />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    </>
  );
}
