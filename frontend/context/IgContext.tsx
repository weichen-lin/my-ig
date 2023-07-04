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
import fetcher from 'api/fetcher'

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
  isFetching: boolean
  diskData: DiskData
}

interface TokenCheckerProps {
  children: JSX.Element
  token: string | null
  current: string
  folder: string | null
}

export interface FileData {
  name: string
  url: string
  last_modified_at: string
  id: string
  tags: string[]
  description: string | null
}

export interface FolderData {
  name: string
  last_modified_at: string
  id: string
}

interface DiskData {
  files: FileData[]
  folders: FolderData[]
}

export const IgContext = createContext<IgType | null>(null)

export const IgProvider = (props: TokenCheckerProps) => {
  const { children, token, current, folder } = props
  const { hints, AddHints } = useHints()

  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  const [isAuth, setIsAuth] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentDialog, setCurrentDialog] = useState<JSX.Element | null>(null)
  const [diskData, setDiskData] = useState<DiskData>({ files: [], folders: [] })
  const [isFetching, setIsFetching] = useState(true)

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
    const authUser = async () => {
      if (!token) {
        return Router.push('/login')
      }

      try {
        const res = await axios.get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (res.status === 200) {
          setIsAuth(true)
          setUserProfile(res.data)
        }
      } catch {
        localStorage.clear()
        return Router.push('/login')
      }
    }

    const getDiskData = async () => {
      try {
        const res = await fetcher.get('http://localhost:8080/disk')
        if (res.status === 200) {
          const data = res.data
          setIsFetching(false)
          setDiskData(data)
        }
      } catch {
        localStorage.clear()
        return Router.push('/login')
      }
    }

    authUser()
    getDiskData()
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
        isFetching,
        diskData,
      }}
    >
      {children}
    </IgContext.Provider>
  )
}
