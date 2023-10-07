import { createContext } from 'react'

export interface User {
  user_id: string
  email: string
  user_name: string
  avatar_url: string
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
