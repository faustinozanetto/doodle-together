import { Button } from '@doodle-together/ui';
import ThemeToggler from '@modules/theme/components/theme-toggler';

export default async function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>Doodle Together</h1>
      <Button>Test Button</Button>
      <ThemeToggler />
    </div>
  );
}
