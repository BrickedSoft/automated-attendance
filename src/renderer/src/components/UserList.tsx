import { FC, useContext, useEffect, useState } from 'react'
import _ from 'lodash'

import { ImageContext } from '@renderer/context/ImageContext'
import { UserContext } from '@renderer/context/UserContext'
import { ImageContextType } from '@renderer/types/image'
import { User, UserContextType } from '@renderer/types/user'

type ExtendedUser = User & { image: string | undefined }

const UserList = () => {
  const { users } = useContext(UserContext) as UserContextType
  const { images } = useContext(ImageContext) as ImageContextType
  const [, setSelected] = useState<User>()

  useEffect(() => {
    if (users.length) setSelected(users[0])
  }, [users])

  const UserCard: FC<ExtendedUser> = ({ name, studentId, image }) => {
    return (
      <div className="flex items-center gap-6 px-6 py-4 rounded-lg">
        <img src={image} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm font-medium">{studentId}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y-[1.5px] overflow-scroll">
      {users &&
        images &&
        Object.values(users).map(({ id, name, studentId }) => {
          const image = images[id] ? URL.createObjectURL(images[id][0].blob) : undefined
          return <UserCard key={id} id={id} name={name} image={image} studentId={studentId} />
        })}
    </div>
  )
}

export default UserList
