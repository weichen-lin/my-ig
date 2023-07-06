import { createContext, useState, useEffect, useCallback, FC } from 'react'
import Router from 'next/router'
import fetcher from 'api/fetcher'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

export interface GdriveContextType {
  openDialog: boolean
  currentDialog: JSX.Element | null
  handleCurrentDialog: (e: JSX.Element) => void
  handleCloseDialog: () => void
  isFetching: boolean
  dialogLoading: boolean
  handleDialogLoading: (e: boolean) => void
  diskData: DiskData
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

export const GdriveContext = createContext<GdriveContextType>({
  openDialog: false,
  currentDialog: null,
  handleCurrentDialog: (e: JSX.Element) => {},
  handleCloseDialog: () => {},
  isFetching: false,
  dialogLoading: false,
  handleDialogLoading: (e) => {},
  diskData: {
    files: [],
    folders: [],
  },
})

export const GdriveProvider = ({ children }: { children: JSX.Element }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentDialog, setCurrentDialog] = useState<JSX.Element | null>(null)
  const [diskData, setDiskData] = useState<DiskData>({ files: [], folders: [] })
  const [isFetching, setIsFetching] = useState(true)
  const [dialogLoading, setDialogLoading] = useState(false)

  const handleCurrentDialog = (children: JSX.Element) => {
    setOpenDialog(true)
    setCurrentDialog(children)
  }

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
    setCurrentDialog(null)
  }, [])

  const handleDialogLoading = (e: boolean) => {
    setDialogLoading(e)
  }

  useEffect(() => {
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
    getDiskData()
  }, [])

  return (
    <GdriveContext.Provider
      value={{
        openDialog,
        currentDialog,
        handleCurrentDialog,
        handleCloseDialog,
        isFetching,
        dialogLoading,
        handleDialogLoading,
        diskData,
      }}
    >
      {children}
    </GdriveContext.Provider>
  )
}
