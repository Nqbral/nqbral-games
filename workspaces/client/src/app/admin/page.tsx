import ErrorMessageForm from '../components/admin/ErrorMessageForm';
import NavAndSideBar from '../components/navbar/NavAndSideBar';
import TypePageAdmin from '../components/type_page/TypePageAdmin';

export const metadata = {
  title: 'Administration - Nqbral Games',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <>
      <TypePageAdmin>
        <NavAndSideBar />
        <div className="flex w-full flex-col items-center pt-20">
          <ErrorMessageForm />
        </div>
      </TypePageAdmin>
    </>
  );
}
