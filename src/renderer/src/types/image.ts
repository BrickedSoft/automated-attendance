export type Image = {
  id: string
  blob: Blob
  userId: string
}

export type ImageStore = {
  name: string
  images: string[]
}

export type ImageCollection = {
  [key: string]: Image[]
}

export type ImageContextType = {
  images: ImageCollection
  addImages: (images: Image[]) => void
}
