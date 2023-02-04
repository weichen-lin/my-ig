import { useState, ChangeEvent } from 'react'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
import { FolderResponse, FolderStatus } from 'api/errors'
import { useRecoilState } from 'recoil'
import { folderInitState } from 'context/folder'

export type UploadType = 'FileOnly' | 'FilesInFolder'

export default function useOperator() {
  const [, setFolders] = useRecoilState(folderInitState)
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
          setFolders((prev) => [
            ...prev,
            {
              type: 0,
              id: Math.random(),
              name: folder_name,
              last_modified_data: '2022/12/10',
              index: 1,
              isDragHovered: false,
              isBeingDragged: false,
              before: null,
              next: 2
            }
          ])
        }
      })
      .catch((res) => {
        const errorStatus = res?.response?.data?.status as FolderStatus
        if (errorStatus) {
          setErrorMsg(FolderResponse[errorStatus])
        }
      })

    setIsRequesting(false)
  }

  const handleFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value)
  }

  const handleFileUpload = async (type: UploadType) => {
    try {
      // const FileHandlers = await window?.showOpenFilePicker({ multiple: true })
      // const AllContents = await Promise.all(
      //   FileHandlers.map(async (filehandle) => {
      //     const file = await filehandle.getFile()
      //     const imgReader = new FileReader()
      //     imgReader.readAsDataURL(file)
      //     imgReader.onloadend = () => {
      //       console.log('uploading')
      //     }
      //   })
      // )
      const test = await window?.showDirectoryPicker({ recursive: true })
      for await (const entry of test.values()) {
        console.log(entry)
      }
    } catch {
      console.log('cancel select')
    }
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
    errorMsg,
    handleFileUpload
  }
}
