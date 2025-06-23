'use client';

import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

import HeadDescription from '../components/head/Head';
import NavbarBlack from '../components/navbar/NavbarBlack';
import { useAuth } from '../context/AuthProvider';

type RegisterFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const [myError, setMyError] = useState<string | null>(null);
  const [myMessage, setMyMessage] = useState<string | null>(null);

  const { forgotPassword, error, message, loading } = useAuth();

  const onForgetPassword = async (data: RegisterFormValues) => {
    await forgotPassword(data.email);
  };

  useEffect(() => {
    setMyError(error);
  }, [error]);

  useEffect(() => {
    setMyMessage(message);
  }, [message]);

  return (
    <>
      <HeadDescription />
      <NavbarBlack />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16">
        <div className="flex w-96 flex-col items-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-4">
          <Image
            src={NqbralGamesLogo}
            className="w-48"
            alt="nqbral-games-logo"
          />
          <h1 className="mb-4 text-xl underline">MOT DE PASSE OUBLIÉ</h1>
          <form
            onSubmit={handleSubmit(onForgetPassword)}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <label>Adresse email</label>
              <input
                type="email"
                {...registerForm('email', {
                  required: 'Email requis',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Adresse email invalide',
                  },
                })}
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {loading ? (
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700"
              >
                Envoyer le mail
              </button>
            )}

            {myMessage && (
              <p className="mt-4 text-center text-sm text-green-500">
                {myMessage}
              </p>
            )}
            {myError && (
              <p className="mt-4 text-center text-sm text-red-500">{myError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
