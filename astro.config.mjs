// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://jessart02.github.io',
  base: '/jessart02.io/',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },
});
