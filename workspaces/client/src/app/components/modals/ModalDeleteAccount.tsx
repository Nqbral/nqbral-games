import { useAuth } from '@/app/context/AuthProvider';

import ModalTemplate from './ModalTemplate';

type ModalDeleteAccountProps = {
  handleClose: () => void;
};

export default function ModalDeleteAccount({
  handleClose,
}: ModalDeleteAccountProps) {
  const { accessToken, logout } = useAuth();

  const onDeleteAccount = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WS_API_URL + '/user/delete_account',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        logout();
      } else {
        console.log('erreur');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="pb-2 text-2xl text-red-400">Supprimer son compte</h2>
        <p>
          Vous êtes sur le point de supprimer votre compte. En êtes-vous sûr ?
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <button
            className="w-48 rounded-lg border-1 border-red-400 px-4 py-2 text-red-400 transition-colors hover:border-red-500 hover:text-red-500"
            onClick={() => {
              onDeleteAccount();
            }}
          >
            Supprimer le compte
          </button>
          <button
            className="w-48 rounded-lg border-1 border-blue-400 px-4 py-2 text-blue-400 transition-colors hover:border-blue-500 hover:text-blue-500"
            onClick={() => {
              handleClose();
            }}
          >
            Retour
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
}
