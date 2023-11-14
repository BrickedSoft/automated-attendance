import { IoTrashOutline } from 'react-icons/io5'

import { User } from '@renderer/types/user'

export const button = {
  remove: {
    title: 'Remove Student',
    icon: <IoTrashOutline />,
    onClick: (user: User) => window.api.deleteUser(user)
  }
}
