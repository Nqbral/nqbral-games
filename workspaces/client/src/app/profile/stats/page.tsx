import ProfileStatsClient from '@/app/components/clients/ProfileStatsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistiques du profil – Nqbral Games',
  description:
    'Consultez vos statistiques de jeu sur Nqbral Games : parties jouées, victoires, performances et progression sur la plateforme.',
  robots: 'noindex, nofollow',
};

export default function ProfileStatsPage() {
  return <ProfileStatsClient />;
}
