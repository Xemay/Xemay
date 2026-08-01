export type CaseGalleryImage = {
  src: string
  alt: string
}

type CaseWithImages = {
  title?: string
  image?: string
  alt?: string
  images?: Array<{
    src?: string
    alt?: string
  }>
}

export function getCaseImages(caseItem: CaseWithImages): CaseGalleryImage[] {
  const fallbackAlt = caseItem.title ? `Изображение проекта ${caseItem.title}` : 'Изображение проекта'
  const images: CaseGalleryImage[] = []

  if (typeof caseItem.image === 'string' && caseItem.image.trim()) {
    images.push({
      src: caseItem.image,
      alt: typeof caseItem.alt === 'string' && caseItem.alt.trim() ? caseItem.alt : fallbackAlt,
    })
  }

  for (const image of caseItem.images ?? []) {
    if (typeof image?.src !== 'string' || !image.src.trim()) continue
    images.push({
      src: image.src,
      alt: typeof image.alt === 'string' && image.alt.trim() ? image.alt : fallbackAlt,
    })
  }

  return images
}
