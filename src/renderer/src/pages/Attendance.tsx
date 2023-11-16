import { FC, SyntheticEvent, useContext, useState } from 'react'

import { data } from '@renderer/assets/data/attendance'
import { button } from '@renderer/assets/data/userList'
import Banner from '@renderer/components/Banner'
import { ImageContext } from '@renderer/context/ImageContext'
import { UserContext } from '@renderer/context/UserContext'
import { ImageContextType } from '@renderer/types/image'
import { User, UserContextType } from '@renderer/types/user'

type ExtendedUser = User & { image: string | undefined }

const Attendance = () => {
  const [isScrollTop, setIsScrollTop] = useState(true)
  const { presentUsers, removePresentUser } = useContext(UserContext) as UserContextType
  const { images } = useContext(ImageContext) as ImageContextType

  const UserCard: FC<ExtendedUser> = (user) => {
    const { name, studentId, image } = user

    return (
      <div className="flex items-center justify-between gap-24 w-full max-w-3xl">
        <div className="flex items-center gap-6 px-6 py-4 rounded-lg">
          <img src={image} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm font-medium">{studentId}</p>
          </div>
        </div>
        <div
          className="p-2 text-white text-xl bg-light-blue-ff rounded-full hover:bg-light-blue-b3 transition duration-300 cursor-pointer"
          onClick={() => removePresentUser(user)}
        >
          {button.remove.icon}
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-full flex flex-col gap-12 px-16 pb-9 overflow-y-scroll"
      onScroll={(e: SyntheticEvent) => {
        const target = e.target as HTMLTextAreaElement
        setIsScrollTop(target.scrollTop === 0)
      }}
    >
      <Banner name={data.name} isScrollTop={isScrollTop} />
      <div className="flex flex-col items-center divide-y-[1.5px] overflow-scroll">
        {presentUsers &&
          images &&
          Object.values(presentUsers).map(({ id, name, studentId }) => {
            const image = images[id] ? URL.createObjectURL(images[id][0].blob) : undefined
            return <UserCard key={id} id={id} name={name} image={image} studentId={studentId} />
          })}
      </div>
    </div>
  )
}

export default Attendance
