import { createContext, useState } from 'react'

interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
}

interface IgType {
  userProfile?: User
  handleUserProfile: (user: User) => void
}

const IgContext = createContext<IgType | null>(null)

export const IgProvider = ({ children }: { children: JSX.Element }) => {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)

  const handleUserProfile = (user: User) => {
    setUserProfile(user)
  }

  return (
    <IgContext.Provider
      value={{ userProfile, handleUserProfile }}
    ></IgContext.Provider>
  )
}
