import { Metadata } from 'next';

import ForgotPasswordClient from '../components/clients/ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Mot de passe oublié – Nqbral Games',
  description:
    'Demandez la réinitialisation de votre mot de passe pour accéder à votre compte Nqbral Games et continuer à jouer à vos jeux de société en ligne.',
  robots: 'noindex, nofollow',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
