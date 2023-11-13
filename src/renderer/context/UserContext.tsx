import { User, UserContextType } from '@renderer/types/User'
import { FC, ReactNode, createContext, useState } from 'react'

export const UserContext = createContext<UserContextType | null>(null)

interface IUserProviderProps {
  children: ReactNode
}

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])

  const addUsers = (users: User[]) => setUsers([...users])

  return <UserContext.Provider value={{ users, addUsers }}>{children}</UserContext.Provider>
}

export default UserProvider
