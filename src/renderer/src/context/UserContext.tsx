import { FC, ReactNode, createContext, useState } from 'react'
import _ from 'lodash'

import { User, UserCollection, UserContextType } from '@renderer/types/user'

export const UserContext = createContext<UserContextType | null>(null)

interface IUserProviderProps {
  children: ReactNode
}

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<UserCollection>({})
  const [presentUsers, setPresentUsers] = useState<UserCollection>({})

  const addUsers = (users: User[]) => setUsers((state) => ({ ...state, ..._.keyBy(users, 'id') }))
  const removeUser = (user: User) => setUsers((state) => _.omit(state, user.id))
  const removePresentUser = (present: User) => setPresentUsers((state) => _.omit(state, present.id))

  return (
    <UserContext.Provider
      value={{ users, presentUsers, addUsers, setPresentUsers, removeUser, removePresentUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
