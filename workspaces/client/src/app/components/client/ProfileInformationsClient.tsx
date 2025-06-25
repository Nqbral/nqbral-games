'use client';

import ModalDeleteAccount from '@/app/components/modals/ModalDeleteAccount';
import NavigationProfile from '@/app/components/profile/NavigationProfile';
import NavbarBlack from '@components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import axios from '@lib/axiosInstance';
import { Modal } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

import { Profile } from '../../types/user';

type EditPasswordFormValues = {
  password: string;
};

export default function ProfileInformationsClient() {
  const { accessToken, logout, isLogged } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const [openModalDeleteAccount, setOpenModalDeleteAccount] = useState(false);
  const handleOpenModalDeleteAccount = () => {
    setOpenModalDeleteAccount(true);
  };

  const handleCloseModalDeleteAccount = () => {
    setOpenModalDeleteAccount(false);
  };

  const {
    register: editPasswordForm,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPasswordFormValues>();

  const onEditPassword = async (data: EditPasswordFormValues) => {
    await axios.put('/user/edit_password', data).then((res) => {
      if (res.status == 200) {
        setPasswordMessage('Mot de passe changé avec succès !');
      }
      reset();
    });
  };

  useEffect(() => {
    if (!accessToken) return;

    axios.get('/user/profile').then((res) => setProfile(res.data));
  }, [accessToken]);

  useEffect(() => {
    if (isLogged != null && !isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  if (!profile)
    return (
      <>
        <NavbarBlack />
        <div className="flex flex-col md:min-h-screen md:flex-row">
          <NavigationProfile />
          <div className="flex w-full flex-col items-center justify-center py-8 md:min-h-screen">
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
      <Modal
        open={openModalDeleteAccount}
        onClose={handleCloseModalDeleteAccount}
        aria-labelledby="modal-delete-account"
      >
        <ModalDeleteAccount handleClose={handleCloseModalDeleteAccount} />
      </Modal>
      <div className="flex flex-col md:min-h-screen md:flex-row">
        <NavigationProfile />
        <div className="flex w-full flex-col items-center py-8 md:pt-24">
          <h1 className="mb-8 text-xl font-bold">Votre profil</h1>
          <div className="mb-4 flex w-80 flex-col gap-4 rounded-lg border-1 border-neutral-100 p-4 text-center md:w-96">
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
          <div className="mb-4 flex w-80 flex-col gap-4 rounded-lg border-1 border-neutral-100 p-4 text-center md:w-96">
            <h2 className="w-full text-center text-lg font-semibold">
              Changer le mot de passe
            </h2>
            <div className="flex flex-col gap-2">
              <form onSubmit={handleSubmit(onEditPassword)}>
                <input
                  type="password"
                  {...editPasswordForm('password', {
                    required: 'Mot de passe requis',
                  })}
                  placeholder="Mot de passe"
                  className="w-full rounded-lg border px-4 py-2 text-center outline-none focus:border-blue-300"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700"
                >
                  Changer le mot de passe
                </button>
                {passwordMessage && (
                  <p className="mt-4 text-center text-sm">{passwordMessage}</p>
                )}
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
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
                handleOpenModalDeleteAccount();
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
