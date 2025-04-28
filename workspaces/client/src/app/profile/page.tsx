'use client';

import NavbarBlack from '@components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Profile } from '../types/user';

export default function ProfilePage() {
  const { user, logout, isLogged } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_WS_API_URL + '/user/profile',
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      console.log(res);
      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  if (!profile)
    return (
      <>
        <NavbarBlack />
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
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

  return (
    <>
      <NavbarBlack />
      <div className="flex w-full flex-col items-center pt-24">
        <h1 className="mb-4 text-xl font-bold">Profil</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Informations</h2>
          <p>Nom d&apos;utilisateur : {profile.username}</p>
          <p>Email : {profile.email}</p>
          <p>Inscrit le : {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          className="rounded-lg border-1 border-red-400 p-4 text-red-400 transition-colors hover:border-red-500 hover:text-red-500"
          onClick={() => {
            logout();
          }}
        >
          Se déconnecter
        </button>
      </div>
    </>
  );
}
