import { FC, useContext } from 'react'

import { button, data } from '@renderer/assets/data/userList'
import { ImageContext } from '@renderer/context/ImageContext'
import { UserContext } from '@renderer/context/UserContext'
import { ImageContextType } from '@renderer/types/image'
import { User, UserContextType } from '@renderer/types/user'

type ExtendedUser = User & { image: string | undefined }

const UserList = () => {
  const { users } = useContext(UserContext) as UserContextType
  const { images } = useContext(ImageContext) as ImageContextType
  const { removeUser } = useContext(UserContext) as UserContextType

  const UserCard: FC<ExtendedUser> = (user) => {
    const { name, studentId, image } = user

    return (
      <div className="w-full flex items-center justify-between gap-24">
        <div className="flex items-center gap-6 px-6 py-4 rounded-lg">
          <img src={image} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm font-medium">{studentId}</p>
          </div>
        </div>
        <div
          className="p-2 text-white text-xl bg-light-blue-ff rounded-full hover:bg-light-blue-b3 transition duration-300 cursor-pointer"
          onClick={() => button.remove.onClick(user).then((user) => removeUser(user))}
        >
          {button.remove.icon}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 mt-6">
      <h1 className="text-3xl pb-1 font-semibold text-light-blue-b3 text-center border-b-2 border-light-blue-ff/50">
        {data.title}
      </h1>
      <div className="max-w-3xl w-full flex flex-col items-center divide-y-[1.5px] overflow-scroll">
        {users &&
          images &&
          Object.values(users).map(({ id, name, studentId }) => {
            const image = images[id] ? URL.createObjectURL(images[id][0].blob) : undefined
            return <UserCard key={id} id={id} name={name} image={image} studentId={studentId} />
          })}
      </div>
    </div>
  )
}

export default UserList
