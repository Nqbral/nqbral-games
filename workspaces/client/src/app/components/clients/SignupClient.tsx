'use client';

import NavbarWhite from '@/app/components/navbar/NavbarWhite';
import { useAuth } from '@context/AuthProvider';
import NqbralGamesLogo from '@public/nqbral-games-logo-black.png';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

import GoogleSignInButton from '../buttons/GoogleSignInButton';

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupClient() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const { register, resetError, resetMessage, error, loading, isLogged } =
    useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onRegister = async (data: RegisterFormValues) => {
    await register(data.username, data.email, data.password);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toLogin = () => {
    resetError();
    resetMessage();
    const redirectTo = searchParams.get('redirect_to');

    if (redirectTo != undefined) {
      router.push('/signin?redirect_to=' + redirectTo);
      return;
    }
    router.push('/signin');
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
          <form
            onSubmit={handleSubmit(onRegister)}
            className="flex w-full flex-col items-center gap-2 text-sm sm:gap-4 sm:text-base"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <input
                type="text"
                {...registerForm('username', {
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

            <div className="flex w-full flex-col items-center gap-2">
              <input
                type="email"
                {...registerForm('email', {
                  required: 'Email requis',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Adresse email invalide',
                  },
                })}
                placeholder="Email"
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative flex w-full flex-col items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                {...registerForm('password', {
                  required: 'Mot de passe requis',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/,
                    message:
                      'Mot de passe invalide : 1 majuscule, 1 chiffre, 1 spécial, 6 caractères minimum',
                  },
                })}
                placeholder="Mot de passe"
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[10px] right-3 cursor-pointer text-neutral-500 hover:text-neutral-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative flex w-full flex-col items-center gap-2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...registerForm('confirmPassword', {
                  required: 'Confirmation requise',
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    'Les mots de passe ne correspondent pas',
                })}
                placeholder="Confirmer mot de passe"
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-[10px] right-3 cursor-pointer text-neutral-500 hover:text-neutral-800"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
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

        <GoogleSignInButton />

        <div className="flex w-72 flex-row items-center justify-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-4 text-sm sm:w-96 sm:text-base">
          <div className="text-center">Déjà un compte ?</div>
          <button
            className="underline transition-colors hover:text-neutral-300"
            onClick={toLogin}
          >
            Se connecter
          </button>
        </div>
      </div>
    </>
  );
}
