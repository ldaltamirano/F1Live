// @ts-check
import { defineConfig } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
});


// import { defineConfig } from 'astro/config';
// import node from '@astrojs/node'; // o vercel, netlify, etc.

// export default defineConfig({
//   output: 'server', // o 'hybrid'
//   adapter: node({
//     mode: 'standalone',
//   }),
// });