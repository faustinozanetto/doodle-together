import ThemeToggler from '@modules/theme/components/theme-toggler';
import { Button } from '@modules/ui/components/button/button';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>Doodle Together</h1>
      <Button>Test Button</Button>
      <ThemeToggler />
      <Link href="/room/join">Join Room</Link>
    </div>
  );
}
