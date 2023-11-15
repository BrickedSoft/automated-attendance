import theme from '../../../../tailwind.config'
import { FC, useContext } from 'react'
import { UserContext } from '@renderer/context/UserContext'
import { User, UserContextType } from '@renderer/types/user'
import { ImageContext } from '@renderer/context/ImageContext'
import { ImageContextType } from '@renderer/types/image'
import { button } from '@renderer/assets/data/userList'

type ExtendedUser = User & { image: string | undefined }

const Attendance = () => {
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
          onClick={() => button.remove.onClick(user).then((user) => removePresentUser(user))}
        >
          {button.remove.icon}
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col gap-12 px-16 pb-9 overflow-hidden"
      style={{
        marginLeft: theme.theme.extend.width.sidebar
      }}
    >
      <div className="flex flex-col items-center divide-y-[1.5px] overflow-scroll">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl my-6"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Present</span> Student List.</h1>

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
