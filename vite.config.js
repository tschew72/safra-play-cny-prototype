import { defineConfig } from 'vite';
import { resolve } from 'path';

const pages = [
  'index',
  'campaigns',
  'leaderboard',
  'profile',
  'faq',
  'signin',
  'campaign-join',
  'campaign-joined',
  'campaign-ended',
  'wave-1',
  'quiz',
  'game-intro',
  'round-briefing',
  'memory-match',
  'design-system',
];

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((p) => [p, resolve(__dirname, `${p}.html`)])
      ),
    },
  },
});
