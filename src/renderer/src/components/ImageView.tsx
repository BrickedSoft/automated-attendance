// Loading user from db and also loading their images from fs
// component to testing

import { ImageContext } from '@renderer/context/ImageContex'
import { UserContext } from '@renderer/context/UserContext'
import { ImageContextType } from '@renderer/types/Image'
import { User, UserContextType } from '@renderer/types/User'
import { useContext, useEffect, useRef, useState } from 'react'

const ImageView = () => {
  const imageRef = useRef<HTMLImageElement>(null)
  const { users } = useContext(UserContext) as UserContextType
  const { images } = useContext(ImageContext) as ImageContextType
  const [selected, setSelected] = useState<User>()

  // const blobToImage = (blob) => {
  //   return new Promise(resolve => {
  //     const url = URL.createObjectURL(blob)
  //     let img = new Image()
  //     img.onload = () => {
  //       URL.revokeObjectURL(url)
  //       resolve(img)
  //     }
  //     img.src = url
  //   })
  // }

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

  return (
    <>
      <div className="flex border-2 border-indigo-200">
        <div className="overflow-y-auto h-72 w-48 ">
          {users.map((user) => (
            <div
              key={user.id}
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
