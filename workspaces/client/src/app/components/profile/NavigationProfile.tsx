import LinkButton from '@components/buttons/LinkButton';

export default function NavigationProfile() {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 border-r-0 border-b-1 border-neutral-500 px-4 pt-20 pb-4 text-center md:min-h-screen md:w-60 md:flex-col md:justify-normal md:border-r-1 md:border-b-0 md:pt-24">
      <LinkButton href="/profile/informations" buttonText="Informations" />
      <LinkButton href="/profile/stats" buttonText="Statistiques de jeu" />
    </div>
  );
}
