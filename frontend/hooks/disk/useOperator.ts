import { useState, ChangeEvent } from 'react'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
import { FolderResponse, FolderStatus } from 'api/errors'
import { useRecoilState } from 'recoil'
import { diskInitState } from 'context/diskData'

export type UploadType = 'FileOnly' | 'FilesInFolder'

export interface useOperatorInterface {
  creatFolderOpen: boolean
  operatorOpen: boolean
  toogleCreateFolder: () => void
  toogleOperatorOpen: () => void
  isRequesting: boolean
  createFolder: (e: string) => void
  folderName: string
  handleFolderName: (e: ChangeEvent<HTMLInputElement>) => void
  errorMsg: string
  handleFileUpload: (type: UploadType) => void
}

export default function useOperator() {
  const [, setDiskData] = useRecoilState(diskInitState)
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
        { folder_name, test: new Date() }
      )
      .then((res) => {
        if (res.status === 200) {
          setErrorMsg('')
          setFolderName('')
          setCreateFolderOpen(false)
          setDiskData((prev) => ({
            ...prev,
            folders: [
              ...prev.folders,
              {
                id: 0,
                name: folderName,
                last_modified_at: '2022/12/10'
              }
            ]
          }))
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
      const FileHandlers = await window?.showOpenFilePicker({ multiple: true })
      const AllContents = await Promise.all(
        FileHandlers.map(async (filehandle, index) => {
          const file = await filehandle.getFile()
          const imgReader = new FileReader()
          imgReader.readAsDataURL(file)
          imgReader.onloadend = () => {
            const img = new Image()
            img.src = imgReader.result as string
            img.onload = () => {
              const formData = new FormData()
              formData.append('myfile', file, file.name)
              fethcher
                .post('/file', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((res) =>
                  setDiskData((prev) => ({
                    ...prev,
                    files: [
                      ...prev.files,
                      {
                        name: file.name,
                        url: res.data.url,
                        last_modified_at: '',
                        index: index + 1,
                        id: Math.random(),
                        tags: ['']
                      }
                    ]
                  }))
                )
                .catch((e) => console.log(e))
            }
            img.onerror = () => {
              console.log('this is not an image')
            }
          }
        })
      )
      // const test = await window?.showDirectoryPicker({ recursive: true })
      // for await (const entry of test.values()) {
      //   console.log(entry)
      // }
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
