import { Metadata } from 'next';

import SignupClient from '../components/client/SignupClient';

export const metadata: Metadata = {
  title: 'Inscription – Nqbral Games',
  description:
    'Créez votre compte Nqbral Games pour jouer à des jeux de société en ligne comme Last Hope et Shadow Network.',
  robots: 'noindex, nofollow',
};

export default function SignUpPage() {
  return <SignupClient />;
}
