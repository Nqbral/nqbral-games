'use client';

import NqbralGamesLogo from '@public/nqbral-games-logo-black.png';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

import NavbarWhite from '../components/navbar/NavbarWhite';
import { useAuth } from '../context/AuthProvider';

type TempTokenPayload = {
  email: string;
  googleId: string;
};

type GoogleSignUpValues = {
  username: string;
};

export default function GoogleUsernamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { registerGoogle, loading, isLogged, setError, error } = useAuth();

  const [email, setEmail] = useState<string | null>(null);

  const {
    register: googleSignUpForm,
    handleSubmit,
    formState: { errors },
  } = useForm<GoogleSignUpValues>();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Token manquant.');
      return;
    }

    try {
      const decoded = jwtDecode<TempTokenPayload>(token);
      if (!decoded.email) {
        setError('Token invalide.');
        return;
      }
      setEmail(decoded.email);
    } catch {
      setError('Token invalide.');
    }
  }, [token, setError]);

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  if (!email) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-200 text-neutral-950">
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  const onRegister = async (data: GoogleSignUpValues) => {
    await registerGoogle(data.username, token);
  };

  return (
    <>
      <NavbarWhite />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-neutral-200 text-neutral-950 sm:gap-8">
        <div className="flex w-72 flex-col items-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-2 sm:w-96 sm:py-4">
          <Image
            src={NqbralGamesLogo}
            className="w-24 sm:w-36 md:w-48"
            alt="nqbral-games-logo"
          />
          <h1 className="mb-2 text-base underline sm:mb-4 sm:text-lg md:text-xl">
            INSCRIPTION
          </h1>
          <p className="mb-4 text-center">
            Adresse email liée à Google : <strong>{email}</strong>
          </p>
          <form
            onSubmit={handleSubmit(onRegister)}
            className="flex w-full flex-col items-center gap-2 text-sm sm:gap-4 sm:text-base"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <input
                type="text"
                {...googleSignUpForm('username', {
                  required: "Nom d'utilisateur requis",
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message:
                      'Utilisez uniquement des lettres, chiffres, - ou _',
                  },
                  minLength: { value: 3, message: 'Minimum 3 caractères' },
                  maxLength: { value: 16, message: 'Maximum 16 caractères' },
                })}
                placeholder="Nom d'utilisateur"
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {loading ? (
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#000"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="mt-4 mb-2 w-full rounded-lg bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700"
              >
                Créer un compte
              </button>
            )}

            {error && (
              <p className="mt-2 mb-2 text-center text-sm text-red-500">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
