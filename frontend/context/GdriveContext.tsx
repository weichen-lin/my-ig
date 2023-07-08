import { createContext, useState, useEffect, useCallback } from 'react'
import Router from 'next/router'
import fetcher from 'api/fetcher'
import { useFetch, getDiskData } from 'api'
import { useRouter } from 'next/router'
import { ro } from 'date-fns/locale'
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
  refresh: () => void
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
  refresh: () => {},
})

export const GdriveProvider = ({ children }: { children: JSX.Element }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentDialog, setCurrentDialog] = useState<JSX.Element | null>(null)
  const [dialogLoading, setDialogLoading] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)
  const router = useRouter()

  const { isLoading, data, run } = useFetch(getDiskData, {
    onError: () => {
      localStorage.clear()
      router.push('/login')
    },
  })

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

  const refresh = useCallback(() => {
    setNeedRefresh((prev) => !prev)
  }, [])

  useEffect(() => {
    const locate_at = (router.query.f ?? null) as string | null
    run(locate_at)
  }, [needRefresh])

  return (
    <GdriveContext.Provider
      value={{
        openDialog,
        currentDialog,
        handleCurrentDialog,
        handleCloseDialog,
        isFetching: isLoading,
        dialogLoading,
        handleDialogLoading,
        diskData: data ?? { files: [], folders: [] },
        refresh,
      }}
    >
      {children}
    </GdriveContext.Provider>
  )
}
