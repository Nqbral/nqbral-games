'use client';

import plainAxios from '@/app/lib/plainAxios';
import { useState } from 'react';

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [okMessage, setOkMessage] = useState<string | null>(null);
  const [nameContact, setNameContact] = useState<string>('');
  const [emailContact, setEmailContact] = useState<string>('');
  const [messageContact, setMessageContact] = useState<string>('');

  const sendContactMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setOkMessage(null);

    if (nameContact == '' || emailContact == '' || messageContact == '') {
      setError('Veuillez remplir correctement le formulaire');
      return;
    }

    const data = {
      name: nameContact,
      email: emailContact,
      message: messageContact,
    };
    try {
      await plainAxios.post(
        process.env.NEXT_PUBLIC_WS_API_URL + '/mail/contact',
        data,
        { withCredentials: true },
      );

      setOkMessage('Message envoyé avec succès');
      setNameContact('');
      setEmailContact('');
      setMessageContact('');
    } catch (err) {
      console.log(err);
      setError('Erreur serveur');
    }
  };

  return (
    <form className="space-y-6" onSubmit={sendContactMail}>
      <div>
        <label className="mb-1 block text-sm">Nom</label>
        <input
          id="nom"
          name="nom"
          type="text"
          className="w-full rounded bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={nameContact}
          onChange={(e) => setNameContact(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm">Adresse email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={emailContact}
          onChange={(e) => setEmailContact(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={messageContact}
          onChange={(e) => setMessageContact(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="submit"
          className="rounded bg-blue-500 px-6 py-2 font-semibold text-black hover:bg-blue-700"
        >
          Envoyer
        </button>
        {okMessage && <div className="text-sm text-green-500">{okMessage}</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    </form>
  );
}
