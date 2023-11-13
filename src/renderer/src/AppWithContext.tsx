import { useContext, useEffect } from 'react'
import * as faceApi from 'face-api.js'
import { HashRouter, Route, Routes } from 'react-router-dom'
import _ from 'lodash'

import { nav } from './assets/data/routes'
import Header from './components/Header'
import { ImageContext } from './context/ImageContext'
import { UserContext } from './context/UserContext'
import Settings from './pages/Settings'
import VideoFrame from './pages/VideoFrame'
import { Image, ImageContextType } from './types/image'
import { User, UserContextType } from './types/user'

const AppWithContext = (): JSX.Element => {
  const { users, addUsers } = useContext(UserContext) as UserContextType
  const { images, addImages } = useContext(ImageContext) as ImageContextType

  const getLabeledFaceDescriptions = () => {
    return Promise.all(
      Object.values(users).map(async (user) => {
        const descriptions: (Float32Array | undefined)[] = []
        if (images[user.id])
          images[user.id].forEach(async (thisImage) => {
            const img = await faceApi.fetchImage(URL.createObjectURL(thisImage.blob))
            const detections = await faceApi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor()
            descriptions.push(detections?.descriptor)
          })

        return new faceApi.LabeledFaceDescriptors(user.name, descriptions as Float32Array[])
      })
    )
  }

  /* ---------------------------- loading all users --------------------------- */
  useEffect(() => {
    const loadUsers = async () => {
      const users = await window.api.loadUsers()
      addUsers(users)
    }
    loadUsers()
  }, [])

  /* --------------------------- loading all images --------------------------- */
  useEffect(() => {
    const loadImages = async (user: User): Promise<Image[]> => {
      const buffers = await window.api.loadImages(user)
      const newImages = buffers?.map((buffer, index) => {
        const content = new Uint8Array(buffer.buffer)
        const blob = new Blob([content.buffer], { type: `image/${buffer.filetype}` })

        const image: Image = { id: user.id + index, blob: blob, userId: user.id }
        return image
      })
      return newImages || []
    }

    const loadAllUserImages = async () => {
      Object.values(users).map(async (user) => {
        const newImages = await loadImages(user)
        addImages(newImages)
      })
    }
    if (users) loadAllUserImages()
  }, [users])

  /* --------------------------- making descriptors --------------------------- */
  useEffect(() => {
    const generate = async () => {
      await faceApi.nets.ssdMobilenetv1.loadFromUri('/models')
      await faceApi.nets.faceRecognitionNet.loadFromUri('/models')
      await faceApi.nets.faceLandmark68Net.loadFromUri('/models')
      const data = await getLabeledFaceDescriptions()
      // console.log('labeledFaceDescriptions', data)
    }
    if (images && users) generate()
  }, [images, users])

  return (
    <div className="w-full">
      <Header />
      <HashRouter>
        <Routes>
          <Route index element={<VideoFrame />} />
          <Route path={nav.settings} element={<Settings />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default AppWithContext
