'use client';

import NavbarBlack from '@/app/components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

type SignInFormValues = {
  username: string;
  password: string;
};

export default function SignIn() {
  const {
    register: loginForm,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const { login, resetError, resetMessage, error, loading, isLogged } =
    useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onLogin = async (data: SignInFormValues) => {
    await login(data.username, data.password);
  };

  const toSignup = () => {
    resetError();
    resetMessage();
    const redirectTo = searchParams.get('redirect_to');

    if (redirectTo != undefined) {
      router.push('/signup?redirect_to=' + redirectTo);
      return;
    }
    router.push('/signup');
  };

  const toForgotPassword = () => {
    resetError();
    resetMessage();
    router.push('/forgot-password');
  };

  useEffect(() => {
    const redirectTo = searchParams.get('redirect_to');
    if (isLogged) {
      if (redirectTo != undefined) {
        router.push(redirectTo);
        return;
      }
      router.push('/');
    }
  }, [isLogged, router, searchParams]);

  return (
    <>
      <NavbarBlack />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16">
        <div className="flex w-96 flex-col items-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-4">
          <Image
            src={NqbralGamesLogo}
            className="w-48"
            alt="nqbral-games-logo"
          />
          <h1 className="mb-4 text-xl underline">CONNEXION</h1>
          <form
            onSubmit={handleSubmit(onLogin)}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <label>Nom d&apos;utilisateur</label>
              <input
                type="text"
                {...loginForm('username', {
                  required: "Nom d'utilisateur requis",
                })}
                placeholder="Nom d'utilisateur"
                className="w-full rounded-lg border px-4 py-2 text-center outline-none focus:border-blue-300"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-2">
              <label>Mot de passe</label>
              <input
                type="password"
                {...loginForm('password', {
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
                Se connecter
              </button>
            )}

            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}
          </form>
          <button
            className="pt-4 italic underline transition-colors hover:text-neutral-300"
            onClick={toForgotPassword}
          >
            Mot de passe oublié ?
          </button>
        </div>

        <div className="flex w-96 flex-row items-center justify-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-4">
          <div>Pas de compte ?</div>
          <button
            className="underline transition-colors hover:text-neutral-300"
            onClick={toSignup}
          >
            S&apos;inscrire
          </button>
        </div>
      </div>
    </>
  );
}
