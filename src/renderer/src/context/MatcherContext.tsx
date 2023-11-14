import { FC, ReactNode, createContext, useState } from 'react'
import {  LabeledFaceDescriptors } from 'face-api.js'

export type MatcherContextType = {
  descriptors: LabeledFaceDescriptors[] | undefined
  setDescriptors: (matcher: LabeledFaceDescriptors[]) => void
}

export const MatcherContext = createContext<MatcherContextType | null>(null)

interface MatcherProviderProps {
  children: ReactNode
}

const MatcherProvider: FC<MatcherProviderProps> = ({ children }) => {
  const [descriptors, setDescriptor] = useState<LabeledFaceDescriptors[]>()
  const setDescriptors = (matcher: LabeledFaceDescriptors[]) => setDescriptor(matcher)

  return (
    <MatcherContext.Provider value={{ descriptors, setDescriptors }}>
      {children}
    </MatcherContext.Provider>
  )
}

export default MatcherProvider
