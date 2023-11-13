// Loading user from db and also loading their images from fs
// component to testing

import { ImageContext } from '@renderer/context/ImageContex'
import { UserContext } from '@renderer/context/UserContext'
import { Image, ImageContextType } from '@renderer/types/Image'
import { User, UserContextType } from '@renderer/types/User'
import { useContext, useEffect, useRef, useState } from 'react'

const ImageView = () => {
  const imageRef = useRef<HTMLImageElement>(null)
  const { users, addUsers } = useContext(UserContext) as UserContextType
  const { images, addImages } = useContext(ImageContext) as ImageContextType
  const [selected, setSelected] = useState<User>()

  useEffect(() => {
    const loadUsers = async () => {
      const users = await window.api.loadUsers()
      addUsers(users)
      console.log(users)
    }

    loadUsers()
  }, [])

  useEffect(() => {
    if (users.length) setSelected(users[0])
  }, [users])

  useEffect(() => {
    const setImage = (user: User) => {
      const userImages = images.filter((image) => image.userId == user.id)

      if (imageRef.current && userImages.length) {
        const blob = userImages[0].blob
        imageRef.current.src = URL.createObjectURL(blob)
      }
    }
    if (selected != undefined) setImage(selected)
  }, [selected])

  useEffect(() => {
    const loadImages = async (user: User): Promise<Image[]> => {
      const buffers = await window.api.loadImages(user)
      const newImages = buffers?.map((buffer, index) => {
        const content = new Uint8Array(buffer.buffer)
        // const src = URL.createObjectURL(
        //   new Blob([content.buffer], { type: `image/${buffer.filetype}` })
        // )

        const blob = new Blob([content.buffer], { type: `image/${buffer.filetype}` })

        const image: Image = { id: user.id + index, blob: blob, userId: user.id }
        return image
      })
      return newImages || []
    }

    const loadAllUserImages = async () => {
      users.forEach(async (user) => {
        const newImages = await loadImages(user)
        addImages(newImages)
      })
    }
    if (users.length) {
      loadAllUserImages()
    }
  }, [users])

  useEffect(() => {
    console.log('imagesi', images)
  }, [images])
  return (
    <>
      <div className="flex border-2 border-indigo-200">
        <div className="overflow-y-auto h-72 w-48 ">
          {users.map((user) => (
            <div
              className={`border-solid border-z border-b-2 hover:bg-blue-50 ${
                selected?.id == user.id ? 'bg-red-150' : ''
              }`}
            >
              <button className="p-2 w-full" onClick={() => setSelected(user)}>
                {user.name}
              </button>
            </div>
          ))}
        </div>
        <div className="border-l-2  border-indigo-200 w-full h-72">
          <img ref={imageRef} alt="Flowers in Chania" className="w-72" />
        </div>
      </div>

      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="grid sm:grid-cols-10 md:grid-cols-10 gap-8 sm:px-5">
          {images.map(({ blob, id }) => (
            <div key={id} className="shadow-md shadow-gray-600 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(blob)}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ImageView
