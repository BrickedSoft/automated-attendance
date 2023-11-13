export type User = {
  id: string
  name: string
}

export type UserStore = {
  name: string
  images: string[]
}

export type UserContextType = {
  users: User[]
  addUsers: (user: User[]) => void
}
