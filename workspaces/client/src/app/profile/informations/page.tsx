'use client';

import NavigationProfile from '@/app/components/profile/NavigationProfile';
import NavbarBlack from '@components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Profile } from '../../types/user';

export default function ProfilePageInformations() {
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
        <div className="flex min-h-screen flex-row">
          <NavigationProfile />
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
        </div>
      </>
    );

  return (
    <>
      <NavbarBlack />
      <div className="flex min-h-screen flex-row">
        <NavigationProfile />
        <div className="flex w-full flex-col items-center pt-24">
          <h1 className="mb-8 text-xl font-bold">Votre profil</h1>
          <div className="mb-4 flex flex-col gap-4 rounded-lg border-1 border-neutral-100 p-4">
            <h2 className="w-full text-center text-lg font-semibold">
              Informations
            </h2>
            <div className="flex flex-col gap-2">
              <div>Nom d&apos;utilisateur : {profile.username}</div>
              <div>Email : {profile.email}</div>
              <div>
                Inscrit le : {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="w-48 rounded-lg border-1 border-blue-400 px-4 py-2 text-blue-400 transition-colors hover:border-blue-500 hover:text-blue-500"
              onClick={() => {
                logout();
              }}
            >
              Se déconnecter
            </button>
            <button
              className="w-48 rounded-lg border-1 border-red-400 px-4 py-2 text-red-400 transition-colors hover:border-red-500 hover:text-red-500"
              onClick={() => {
                logout();
              }}
            >
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
