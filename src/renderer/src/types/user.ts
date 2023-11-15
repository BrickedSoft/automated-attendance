import { Dispatch } from "react"

export type User = {
  id: string
  name: string
  studentId: number
}

export type UserStore = {
  name: string
  studentId: number
  images: string[]
}

export type UserCollection = {
  [key: string]: User
}

export type UserContextType = {
  users: UserCollection
  presentUsers: UserCollection
  addUsers: (user: User[]) => void
  removeUser: (user: User) => void
  removePresentUser: (user: User) => void
  setPresentUsers: Dispatch<React.SetStateAction<UserCollection>>
}
