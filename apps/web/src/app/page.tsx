import { Button } from '@modules/ui/components/button/button';
import Navbar from '@modules/navbar/components/navbar';

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold">Doodle Together</h1>

          <div className="flex gap-2 my-4">
            <Button>Button</Button>
            <Button variant="ghost">Button</Button>
            <Button variant="outline">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="destructive">Button</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
