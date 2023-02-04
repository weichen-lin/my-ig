import { useState, ChangeEvent } from 'react'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
import { FolderResponse, FolderStatus } from 'api/errors'

export default function useOperator() {
  const [creatFolderOpen, setCreateFolderOpen] = useState(false)
  const [operatorOpen, setOperatorOpen] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const toogleCreateFolder = () => {
    setFolderName('')
    setErrorMsg('')
    setCreateFolderOpen((prev) => !prev)
  }
  const toogleOperatorOpen = () => {
    setOperatorOpen((prev) => !prev)
  }

  const createFolder = (folder_name: string) => {
    setIsRequesting(true)

    fethcher
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}${APIS.FOLDER}`,
        { folder_name }
      )
      .then((res) => {
        if (res.status === 200) {
          setErrorMsg('')
          setFolderName('')
          setCreateFolderOpen(false)
        }
      })
      .catch((res) => {
        console.log(res)

        const errorStatus = res?.response?.data?.status as FolderStatus
        console.log(FolderResponse[errorStatus])

        if (errorStatus) {
          setErrorMsg(FolderResponse[errorStatus])
        }
      })

    setIsRequesting(false)
  }

  const handleFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value)
  }

  return {
    creatFolderOpen,
    operatorOpen,
    toogleCreateFolder,
    toogleOperatorOpen,
    isRequesting,
    createFolder,
    folderName,
    handleFolderName,
    errorMsg
  }
}
