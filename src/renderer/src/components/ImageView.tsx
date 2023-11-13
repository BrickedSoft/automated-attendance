// Loading user from db and also loading their images from fs
// component to testing

import { UserContext } from '@renderer/context/UserContext'
import { User, UserContextType } from '@renderer/types/User'
import { useContext, useEffect, useRef, useState } from 'react'

const ImageView = () => {
  const imageRef = useRef<HTMLImageElement>(null)
  const { users, addUsers } = useContext(UserContext) as UserContextType
  const [selected, setSelected] = useState<number>()

  useEffect(() => {
    const loadUsers = async () => {
      const users = await window.api.loadUsers()
      addUsers(users)
      console.log(users)
    }

    loadUsers()
  }, [])

  useEffect(() => {
    if (users.length) setSelected(0)
  }, [users])

  useEffect(() => {
    const loadImage = async (index: number) => {
      const buffers = await window.api.loadImages(users[index] as User)
      console.log(buffers)

      const content = new Uint8Array(buffers[0]?.buffer || [])
      if (imageRef.current) {
        const src = URL.createObjectURL(
          new Blob([content.buffer], { type: `image/${buffers[0]?.filetype}` })
        )
        imageRef.current.src = src
        console.log(src)
      }
    }
    if (selected != undefined) loadImage(selected)
  }, [selected])
  return (
    <>
      <div className="flex border-2 border-indigo-200">
        <div className="overflow-y-auto h-72 w-48 ">
          {users.map((user, index) => (
            <div
              className={`border-solid border-z border-b-2 hover:bg-blue-50 ${
                selected == index ? 'bg-red-150' : ''
              }`}
            >
              <button className="p-2 w-full" onClick={() => setSelected(index)}>
                {user.name}{' '}
              </button>
            </div>
          ))}
        </div>
        <div className="border-l-2  border-indigo-200 w-full h-72">
          <img ref={imageRef} alt="Flowers in Chania" className="object-contain	" />
        </div>
      </div>
    </>
  )
}

export default ImageView