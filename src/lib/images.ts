import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'

// Builds the `{ photos: [{ photo: { relativePath, childImageSharp: { fluid } } }] }`
// shape that the Gatsby GraphQL queries returned, so the React pages are unchanged.

const files = import.meta.glob<ImageMetadata>('../assets/sessions/*/*.jpg', { eager: true, import: 'default' })

const WIDTHS = [432, 864, 1728]
const SIZES = '(max-width: 1728px) 100vw, 1728px'
const QUALITY = { avif: 65, webp: 85, jpg: 85 }

const relativePath = (path: string) => path.split('/assets/sessions/')[1]

async function srcSet (meta: ImageMetadata, format: 'avif' | 'webp' | 'jpg') {
  return getImage({ src: meta, widths: WIDTHS, format, quality: QUALITY[format] })
}

async function fluid (meta: ImageMetadata) {
  const [avif, webp, jpg] = await Promise.all([srcSet(meta, 'avif'), srcSet(meta, 'webp'), srcSet(meta, 'jpg')])

  return {
    aspectRatio: meta.width / meta.height,
    src: jpg.src,
    srcSet: jpg.srcSet.attribute,
    srcSetWebp: webp.srcSet.attribute,
    srcSetAvif: avif.srcSet.attribute,
    sizes: SIZES,
    presentationWidth: meta.width,
  }
}

export async function photos (filter: (relativePath: string) => boolean = () => true) {
  const entries = Object.entries(files).filter(([path]) => filter(relativePath(path)))

  return {
    photos: await Promise.all(entries.map(async ([path, meta]) => ({
      photo: { relativePath: relativePath(path), childImageSharp: { fluid: await fluid(meta) } },
    }))),
  }
}
