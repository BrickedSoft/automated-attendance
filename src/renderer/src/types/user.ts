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
  addUsers: (user: User[]) => void
}
