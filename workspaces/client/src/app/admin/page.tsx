import ErrorMessageForm from '../components/admin/ErrorMessageForm';
import NavbarHomePage from '../components/navbar/NavbarHomePage';
import TypePageAdmin from '../components/type_page/TypePageAdmin';

export default function AdminPage() {
  return (
    <TypePageAdmin>
      <NavbarHomePage />
      <div className="flex w-full flex-col items-center pt-20">
        <ErrorMessageForm />
      </div>
    </TypePageAdmin>
  );
}
