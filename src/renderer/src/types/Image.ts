export type Image = {
  id: string
  blob: Blob
  userId: string
}

export type ImageStore = {
  name: string
  images: string[]
}

export type ImageContextType = {
  images: Image[]
  addImages: (images: Image[]) => void
}
