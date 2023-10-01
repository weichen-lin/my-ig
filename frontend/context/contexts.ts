import { createContext, useEffect, useState, useContext } from 'react'
import Router from 'next/router'
import { useHints, Action, Hint } from 'hooks/disk'
import { getUserInfo, useFetch } from 'api/'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface AuthContextType {
  userProfile: User | null
  refresh: () => void
  isAuth: boolean
  hints: Hint[]
  handleHints: (status: Action, message: string) => void
  handleUserProfile: (key: keyof User, data: string) => void
}


export const IgContext = createContext<AuthContextType>({
  userProfile: null,
  refresh: () => {},
  isAuth: false,
  hints: [],
  handleHints: (status, message) => {},
  handleUserProfile: (key, data) => {},
})