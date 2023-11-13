import { Image, ImageContextType } from '@renderer/types/Image'
import { FC, ReactNode, createContext, useState } from 'react'

export const ImageContext = createContext<ImageContextType | null>(null)

interface IImageProviderProps {
  children: ReactNode
}

const ImageProvider: FC<IImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<Image[]>([])

  const addImages = (newImages: Image[]) => setImages((state) => [...state, ...newImages])

  return <ImageContext.Provider value={{ images, addImages }}>{children}</ImageContext.Provider>
}

export default ImageProvider
