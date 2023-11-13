import { Image, ImageContextType } from '@renderer/types/image'
import { FC, ReactNode, createContext, useState } from 'react'

export const ImageContext = createContext<ImageContextType | null>(null)

interface ImageProviderProps {
  children: ReactNode
}

const ImageProvider: FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<Image[]>([])

  const addImages = (newImages: Image[]) => setImages((state) => [...state, ...newImages])

  return <ImageContext.Provider value={{ images, addImages }}>{children}</ImageContext.Provider>
}

export default ImageProvider
