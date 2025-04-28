import LastHope from '@components/games/LastHope';
import LoveLetter from '@components/games/LoveLetter';
import Navbar from '@components/navbar/Navbar';

export default function Home() {
  return (
    <div className="mt-16 flex w-full flex-col items-center gap-16 py-8">
      <Navbar />
      <LoveLetter />
      <LastHope />
    </div>
  );
}
