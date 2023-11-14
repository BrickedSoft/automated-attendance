import { MdAdd } from 'react-icons/md'

import { UserStore } from '@renderer/types/user'

export const fields = {
  name: {
    name: 'name',
    type: 'text',
    label: 'Enter Name',
    placeholder: 'John Wick',
    required: true
  },
  id: {
    name: 'studentId',
    type: 'number',
    label: 'Enter ID',
    placeholder: '20XX',
    required: true
  }
}

export const button = {
  add: {
    title: 'Add Student',
    icon: <MdAdd size={16} className="text-light-blue-ff" />,
    onClick: (userStore: UserStore) => window.api.storeUser(userStore)
  }
}
