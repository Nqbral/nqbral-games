'use client';

import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

import HeadDescription from '../components/head/Head';
import NavbarBlack from '../components/navbar/NavbarBlack';
import { useAuth } from '../context/AuthProvider';

type RegisterFormValues = {
  password: string;
  passwordConfirmation: string;
};

export default function ResetPasswordPage() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const [token, setToken] = useState<string | null>(null);
  const [myError, setMyError] = useState<string | null>(null);
  const [myMessage, setMyMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const { resetPassword, error, message, loading } = useAuth();

  const onResetPassword = async (data: RegisterFormValues) => {
    if (data.password != data.passwordConfirmation) {
      setMyError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (token) {
      await resetPassword(token, data.password);
    }
  };

  useEffect(() => {
    const myToken = searchParams.get('token');

    if (myToken) {
      setToken(myToken);
      return;
    }

    setMyError('Token absent.');
  }, [searchParams]);

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
          <h1 className="mb-4 text-xl underline">
            RÉINITIALISATION MOT DE PASSE
          </h1>
          <form
            onSubmit={handleSubmit(onResetPassword)}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <label>Mot de passe</label>
              <input
                type="password"
                {...registerForm('password', {
                  required: 'Mot de passe requis',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/,
                    message:
                      'Mot de passe invalide : 1 majuscule, 1 chiffre, 1 spécial, 6 caractères minimum',
                  },
                })}
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-2">
              <label>Confirmation</label>
              <input
                type="password"
                {...registerForm('passwordConfirmation', {
                  required: 'Mot de passe requis',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/,
                    message:
                      'Mot de passe invalide : 1 majuscule, 1 chiffre, 1 spécial, 6 caractères minimum',
                  },
                })}
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              {errors.passwordConfirmation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passwordConfirmation.message}
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
                Réinitialiser
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
