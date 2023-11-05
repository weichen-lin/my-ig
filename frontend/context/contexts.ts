import { createContext } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatarUrl: string
}

interface KushareAuthProps {
  user: User | null
  isAuth: boolean
  handleUser: (key: keyof User, data: string) => void
}

export const KushareAuth = createContext<KushareAuthProps>({
  user: null,
  isAuth: false,
  handleUser: (key, data) => {},
})
