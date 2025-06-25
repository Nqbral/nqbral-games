import { Metadata } from 'next';

import SignInClient from '../components/client/SigninClient';

export const metadata: Metadata = {
  title: 'Connexion – Nqbral Games',
  description:
    'Connectez-vous à votre compte Nqbral Games pour accéder à vos jeux de société en ligne.',
  robots: 'noindex, nofollow',
};

export default function SignInPage() {
  return <SignInClient />;
}
