'use client';

import LinkButton from '@components/buttons/LinkButton';
import NqbralGamesLogo from '@public/nqbral-games-logo-black.png';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';

import NavbarSignUp from '../components/navbar/NavbarSignUp';

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(process.env.API_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Compte créé avec succès 🎉');
      } else {
        setMessage(result.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setMessage('Erreur serveur');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarSignUp />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 bg-neutral-200 text-neutral-950">
        <div className="flex w-96 flex-col items-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-4">
          <Image
            src={NqbralGamesLogo}
            className="w-48"
            alt="nqbral-games-logo"
          />
          <h1 className="mb-4 text-xl underline">INSCRIPTION</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <label>Nom d&apos;utilisateur</label>
              <input
                type="text"
                {...register('username', {
                  required: "Nom d'utilisateur requis",
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message:
                      'Utilisez uniquement des lettres, chiffres, - ou _',
                  },
                  minLength: { value: 3, message: 'Minimum 3 caractères' },
                  maxLength: { value: 20, message: 'Maximum 20 caractères' },
                })}
                className="w-full rounded-lg border border-neutral-500 px-4 py-2 text-center outline-none focus:border-blue-400"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-2">
              <label>Adresse email</label>
              <input
                type="email"
                {...register('email', {
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

            <div className="flex w-full flex-col items-center gap-2">
              <label>Mot de passe</label>
              <input
                type="password"
                {...register('password', {
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
                Créer un compte
              </button>
            )}

            {message && <p className="mt-4 text-center text-sm">{message}</p>}
          </form>
        </div>

        <div className="flex w-96 flex-row items-center justify-center gap-2 rounded-sm border-1 border-neutral-600 px-8 py-4">
          <div>Vous avez déjà un compte ?</div>
          <LinkButton
            href="/signin"
            buttonText="Se connecter"
            className="underline"
          />
        </div>
      </div>
    </>
  );
}
