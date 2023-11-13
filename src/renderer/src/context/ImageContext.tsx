import { FC, ReactNode, createContext, useState } from 'react'
import _ from 'lodash'

import { Image, ImageContextType, ImageCollection } from '@renderer/types/image'

export const ImageContext = createContext<ImageContextType | null>(null)

interface ImageProviderProps {
  children: ReactNode
}

const ImageProvider: FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<ImageCollection>({})

  const addImages = (newImages: Image[]) => {
    const imageObj = _.groupBy(newImages, 'userId')
    setImages((state) => ({ ...state, ...(imageObj as ImageCollection) }))
  }

  return <ImageContext.Provider value={{ images, addImages }}>{children}</ImageContext.Provider>
}

export default ImageProvider
