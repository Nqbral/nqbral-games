import ProfileInformationsClient from '@/app/components/client/ProfileInformationsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil – Nqbral Games',
  description:
    'Consultez et modifiez les informations de votre compte Nqbral Games, changez votre mot de passe ou déconnectez-vous.',
  robots: 'noindex, nofollow',
};

export default function ProfileInformationsPage() {
  return <ProfileInformationsClient />;
}
