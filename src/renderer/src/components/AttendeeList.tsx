import { FC, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ImageContext } from '@renderer/context/ImageContext'
import { UserContext } from '@renderer/context/UserContext'
import { ImageContextType } from '@renderer/types/image'
import { UserContextType } from '@renderer/types/user'

const MAX_ATTENDEE_PREVIEW = 5
type AttendeeCardProps = { id: number; name: string; image: string }

const AttendeeCard: FC<AttendeeCardProps> = ({ id, name, image }) => {
  const [show, setShow] = useState(true)
  setTimeout(() => setShow(false), 5000)

  return (
    <motion.li
      className="w-28 flex flex-col items-center gap-2 p-2 rounded-md"
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(6.3px)',
        display: show ? 'flex' : 'none'
      }}
      initial={{ x: 64, height: 0, opacity: 0 }}
      animate={{
        x: 0,
        height: 'auto',
        opacity: 1,
        transition: { type: 'spring', bounce: 0.3, opacity: { delay: 0.1 } }
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: { x: 64, type: 'spring', bounce: 0, opacity: { duration: 1.2 } }
      }}
    >
      <img src={image} alt="student photo" className="h-12 w-12 rounded-full" />
      <p className="text-xs text-light-blue-b3 font-medium text-ellipsis line-clamp-1">
        {id}&mdash;{name}
      </p>
    </motion.li>
  )
}

const AttendeeList = () => {
  const { presentUsers } = useContext(UserContext) as UserContextType
  const { images } = useContext(ImageContext) as ImageContextType

  return (
    <ul className="list-none absolute top-2/4 -translate-y-2/4 right-4 flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {Object.values(presentUsers)
          .slice(-MAX_ATTENDEE_PREVIEW)
          .map(({ id, name, studentId }) => {
            const image = images[id] ? URL.createObjectURL(images[id][0].blob) : ''
            return <AttendeeCard key={id} id={studentId} name={name} image={image} />
          })}
      </AnimatePresence>
    </ul>
  )
}

export default AttendeeList
