import { Metadata } from 'next';

import ResetPasswordClient from '../components/client/ResetPasswordClient';

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe – Nqbral Games',
  description:
    'Réinitialisez votre mot de passe pour accéder à votre compte Nqbral Games et continuer à jouer à vos jeux de société en ligne.',
  robots: 'noindex, nofollow',
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
