'use client';

import axios from '@lib/axiosInstance';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type ErrorMessageFormValues = {
  title: string;
  message: string;
};

export default function ErrorMessageForm() {
  const {
    register: messageErrorForm,
    handleSubmit,
    formState: { errors },
  } = useForm<ErrorMessageFormValues>();

  const [error, setError] = useState<string | null>(null);
  const [okMessage, setOkMessage] = useState<string | null>(null);

  const onCreateMessageError = async (data: ErrorMessageFormValues) => {
    setError(null);
    setOkMessage(null);

    if (data.title && data.message) {
      try {
        await axios.post(
          process.env.NEXT_PUBLIC_WS_API_URL +
            '/message_error/edit_message_error',
          { title: data.title, message: data.message },
          { withCredentials: true },
        );

        setOkMessage("Message d'erreur mis à jour");
      } catch (err) {
        console.log(err);
        setError('Erreur serveur');
      }
    }
  };

  const onDeleteMessageError = async () => {
    setError(null);
    setOkMessage(null);

    try {
      await axios.delete(
        process.env.NEXT_PUBLIC_WS_API_URL + '/message_error/delete',
        { withCredentials: true },
      );

      setOkMessage("Message d'erreur supprimé");
    } catch (err) {
      console.log(err);
      setError('Erreur serveur');
    }
  };

  return (
    <div className="flex w-72 flex-col items-center gap-2 rounded-sm border-1 border-neutral-600 p-4 text-sm sm:w-xl sm:gap-4 sm:text-base md:w-2xl">
      <form
        onSubmit={handleSubmit(onCreateMessageError)}
        className="flex w-full flex-col items-center gap-2 rounded-sm text-sm sm:gap-4 sm:text-base"
      >
        <h2 className="text-lg font-bold sm:text-xl">Message d&apos;erreur</h2>
        <div className="flex w-full flex-col items-center gap-2">
          <label>Titre</label>
          <input
            type="text"
            {...messageErrorForm('title', {
              required: 'Titre requis',
            })}
            placeholder="Titre"
            className="w-64 rounded-lg border px-4 py-2 text-center outline-none focus:border-blue-300 sm:w-72"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <label>Message</label>
          <textarea
            {...messageErrorForm('message', {
              required: 'Message requis',
              maxLength: { value: 256, message: 'Maximum 256 caractères' },
            })}
            placeholder="Message"
            className="h-[200px] w-full rounded-lg border px-4 py-2 text-center outline-none focus:border-blue-300"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {okMessage && (
          <p className="text-center text-sm text-green-500">{okMessage}</p>
        )}

        <button
          type="submit"
          className="w-64 rounded-lg bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700 sm:w-72"
        >
          Créer un message d&apos;erreur
        </button>
      </form>
      <button
        className="w-64 rounded-lg border-1 border-red-400 px-4 py-2 text-red-400 transition-colors hover:border-red-500 hover:text-red-500 sm:w-72"
        onClick={onDeleteMessageError}
      >
        Supprimer le message d&apos;erreur
      </button>
    </div>
  );
}
