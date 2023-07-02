import {
  createContext,
  useState,
  useEffect,
  createRef,
  useCallback,
} from 'react'
import Router from 'next/router'
import axios from 'axios'
import { useHints, Action, Hint } from 'hooks/disk'
import { AddFolder } from 'components/utils'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface IgType {
  userProfile?: User
  handleUserProfile: (key: keyof User, value: any) => void
  isAuth: boolean
  current: string | undefined
  hints: Hint[]
  handleHints: (status: Action, message: string) => void
  openDialog: boolean
  currentDialog: JSX.Element | null
  handleCurrentDialog: (e: JSX.Element) => void
  handleCloseDialog: () => void
}

interface TokenCheckerProps {
  children: JSX.Element
  token: string | null
  current: string
}

export const IgContext = createContext<IgType | null>(null)

export const IgProvider = (props: TokenCheckerProps) => {
  const { children, token, current } = props
  const { hints, AddHints } = useHints()

  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  const [isAuth, setIsAuth] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentDialog, setCurrentDialog] = useState<JSX.Element | null>(null)

  const handleUserProfile = (key: keyof User, value: any) => {
    setUserProfile((prev) => {
      if (prev) {
        return { ...prev, [key]: value }
      } else {
        return undefined
      }
    })
  }

  const handleHints = (status: Action, message: string) => {
    AddHints(message, status)
  }

  const handleCurrentDialog = (children: JSX.Element) => {
    setOpenDialog(true)
    setCurrentDialog(children)
  }

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
    setCurrentDialog(null)
  }, [])

  useEffect(() => {
    const authUser = () => {
      if (!token) {
        return Router.push('/login')
      }

      return axios
        .get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setIsAuth(true)
          setUserProfile(res.data)
        })
        .catch(() => {
          Router.push('/login')
          return
        })
    }
    authUser()
  }, [])

  return (
    <IgContext.Provider
      value={{
        userProfile,
        handleUserProfile,
        isAuth,
        current,
        hints,
        handleHints,
        openDialog,
        currentDialog,
        handleCurrentDialog,
        handleCloseDialog,
      }}
    >
      {children}
    </IgContext.Provider>
  )
}
