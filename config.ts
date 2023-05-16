import { fileURLToPath, URL } from 'node:url'

interface appPath {
  src: string
  pages: string
  components: string
  images: string
  build: string
  icons: string
  fonts: string
  types: string
  [key: string]: string | boolean | number
}
export const appPath: appPath = {
  src: fileURLToPath(new URL('./src', import.meta.url)),
  pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
  components: fileURLToPath(new URL('./src/components', import.meta.url)),
  // images: fileURLToPath(new URL('./src/assets/images', import.meta.url)),
  images: 'src/assets/images',
  assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
  build: 'build',
  icons: `src/app/icons/`,
  fonts: fileURLToPath(new URL('./src/app/fonts', import.meta.url)),
  types: `src/types/`
}
