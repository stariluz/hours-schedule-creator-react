import { fileURLToPath, URL } from 'node:url'
import { defineConfig, transformWithEsbuild, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'environment');
  return {
    plugins: [
      {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null

          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          })
        },
      },
      react()
    ],
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    resolve: {
      alias: {
        'src': fileURLToPath(new URL('./src', import.meta.url)),
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      },
    },
    base: process.env.NODE_ENV === 'production'
      ? env.VITE_REPO_NAME || '/'
      : '/',
    envDir: 'environment',
  }
})