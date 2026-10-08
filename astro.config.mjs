import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  site: 'https://www.prettynicestudio.com',
  trailingSlash: 'always',
  // Prefetch visible links (pages are tiny) so a click or tap swaps immediately, like Gatsby did;
  // the page transitions only start once the new page has been swapped in.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [react(), sitemap()],
  vite: {
    // `import Logo from './logo.svg?react'` gives a React component.
    plugins: [svgr({ include: '**/*.svg?react', svgrOptions: { exportType: 'default' } })],
  },
})
