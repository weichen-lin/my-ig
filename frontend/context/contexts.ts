import { createContext } from 'react'
import { Action, Hint } from 'hooks/disk'

export interface User {
  user_id: string
  email: string
  user_name: string
  avatar_url: string
}

interface KushareRoot {
  userProfile: User | null
  refresh: () => void
  isAuth: boolean
  hints: Hint[]
  handleHints: (status: Action, message: string) => void
  handleUserProfile: (key: keyof User, data: string) => void
}

export const IgContext = createContext<KushareRoot>({
  userProfile: null,
  refresh: () => {},
  isAuth: false,
  hints: [],
  handleHints: (status, message) => {},
  handleUserProfile: (key, data) => {}
})

export const KushareRoot = createContext<KushareRoot>({
  userProfile: null,
  refresh: () => {},
  isAuth: false,
  hints: [],
  handleHints: (status, message) => {},
  handleUserProfile: (key, data) => {}
})

interface SidebarContext {
  user: User | null
}

export const Sidebar = createContext<SidebarContext>({
  user: null
})

interface OperatorContext {
  openDialog: boolean
}

export const Operator = createContext<OperatorContext>({
  openDialog: false
})

interface HintsContext {
  hints: Hint[]
}

export const Hints = createContext<HintsContext>({
  hints: []
})
