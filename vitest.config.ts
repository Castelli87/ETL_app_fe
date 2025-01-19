import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'; // Import the Vue plugin
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [vue()], // Add the Vue plugin here
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)), // Alias @ to the project root
    },
  },
  test: {
    environment: 'happy-dom', // Use happy-dom for testing
  },
});
