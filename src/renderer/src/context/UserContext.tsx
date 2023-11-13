import { FC, ReactNode, createContext, useState } from 'react'
import _ from 'lodash'

import { User, UserCollection, UserContextType } from '@renderer/types/user'

export const UserContext = createContext<UserContextType | null>(null)

interface IUserProviderProps {
  children: ReactNode
}

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<UserCollection>({})

  const addUsers = (users: User[]) => setUsers((state) => ({ ...state, ..._.keyBy(users, 'id') }))

  return <UserContext.Provider value={{ users, addUsers }}>{children}</UserContext.Provider>
}

export default UserProvider
