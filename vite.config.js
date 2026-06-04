import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scientists: resolve(__dirname, 'scientists.html'),
        programmers: resolve(__dirname, 'programmers.html'),
        artists: resolve(__dirname, 'artists.html'),
        writers: resolve(__dirname, 'writers.html'),
      },
    },
  },
})
