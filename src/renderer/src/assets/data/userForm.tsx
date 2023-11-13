import { UserStore } from '@renderer/types/User'
import { MdAdd } from 'react-icons/md'

export const button = {
  add: {
    title: 'Add Student',
    icon: <MdAdd size={16} className="text-light-blue-ff" />,
    onSubmit: (userStore: UserStore) => window.api.storeUser(userStore)
  }
}
