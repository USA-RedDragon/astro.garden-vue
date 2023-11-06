import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import istanbul from 'vite-plugin-istanbul';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules'],
      requireEnv: false,
      cypress: true,
      forceBuildInstrument: process.env.NODE_ENV === 'test',
    }),
  ],
  test: {
    reporter: ['junit', 'html', 'default'],
    outputFile: {
      junit: 'reports/unit/junit.xml',
      html: 'reports/unit/index.html',
    },
  },
});
