import LinkButton from '@components/buttons/LinkButton';

export default function NavigationProfile() {
  return (
    <div className="flex min-h-screen w-52 flex-col gap-4 border-r-1 border-neutral-500 px-4 pt-24 text-center">
      <LinkButton href="/profile/informations" buttonText="Informations" />
      <LinkButton href="/profile/stats" buttonText="Stastistiques de jeu" />
    </div>
  );
}
