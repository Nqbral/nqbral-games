import NavbarHomePage from '@/app/components/navbar/NavbarHomePage';
import LastHope from '@components/games/LastHope';
import LoveLetter from '@components/games/LoveLetter';

export default function Home() {
  return (
    <div className="mt-16 flex w-full flex-col items-center gap-16 py-8">
      <NavbarHomePage />
      <LoveLetter />
      <LastHope />
    </div>
  );
}
