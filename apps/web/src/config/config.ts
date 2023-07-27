import { SiteConfig } from './types/config.types';

export const siteConfig: SiteConfig = {
  name: 'Doodle Together',
  description: 'Draw with friends online.',
  keywords: ['Doodles', 'Draw', 'Online', ' Draw Together'],
  url: process.env.NEXT_PUBLIC_URL as string,
};
