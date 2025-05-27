import LinkButton from '@components/buttons/LinkButton';

import NavbarBlack from './components/navbar/NavbarBlack';

export default function NotFound() {
  return (
    <>
      <NavbarBlack />
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-primary text-4xl">Page introuvable !</h1>
        <LinkButton buttonText="Retour à la page principale" href="/" />
      </div>
    </>
  );
}
