import Link from 'next/link';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { Button, buttonVariants } from '@modules/ui/components/button/button';

export default async function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold">Doodle Together</h1>
      <ThemeToggler />
      <Link href="/room/join" className={buttonVariants()}>
        Join Room
      </Link>

      <div className="flex gap-2 my-4">
        <Button>Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="outline">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="danger">Button</Button>
      </div>
    </div>
  );
}
