import { useState, ChangeEvent } from 'react'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
import { FolderResponse, FolderStatus } from 'api/errors'
import { useRecoilState, useRecoilValue } from 'recoil'
import { diskInitState, diskStatusInitState } from 'context'
import { FileUploadStatus } from 'components/disk/uploadTask/task'

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
  handleFileUpload: () => void
  uploader: Uploader
  handleUploaderClose: () => void
}

export interface Uploader {
  isOpen: boolean
  uploadfiles: Map<string, number>
}

export default function useOperator() {
  const [, setDiskData] = useRecoilState(diskInitState)
  const diskStatus = useRecoilValue(diskStatusInitState)
  const diskStatus_copy = JSON.parse(JSON.stringify(diskStatus))

  const [uploader, setUploader] = useState<Uploader>({
    isOpen: false,
    uploadfiles: new Map()
  })
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
    const current_folder = diskStatus_copy.current_folder.pop() ?? ''

    fethcher
      .post(APIS.FOLDER, { folder_name, current_folder })
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
                id: res.data.id,
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

  const handleFileUpload = async () => {
    try {
      const FileHandlers = await window?.showOpenFilePicker({ multiple: true })
      setUploader((prev) => ({
        ...prev,
        isOpen: true
      }))
      await Promise.all(
        FileHandlers.map(async (filehandle, index) => {
          const file = await filehandle.getFile()
          setUploader((prev) => ({
            ...prev,
            uploadfiles: new Map(
              Array.from(
                prev.uploadfiles.set(file.name, FileUploadStatus.LOADING)
              )
            )
          }))
          const imgReader = new FileReader()
          imgReader.readAsDataURL(file)
          imgReader.onloadend = () => {
            const img = new Image()
            img.src = imgReader.result as string
            img.onload = () => {
              const formData = new FormData()
              formData.append('myfile', file, file.name)
              formData.append(
                'current_folder',
                diskStatus_copy.current_folder.pop() ?? ''
              )
              fethcher
                .post(APIS.FILE, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((res) => {
                  setDiskData((prev) => ({
                    ...prev,
                    files: [
                      ...prev.files,
                      {
                        name: file.name,
                        url: res?.data?.url,
                        last_modified_at: '',
                        id: res?.data?.id,
                        tags: ['']
                      }
                    ]
                  }))
                  setUploader((prev) => ({
                    ...prev,
                    uploadfiles: new Map(
                      Array.from(
                        prev.uploadfiles.set(
                          file.name,
                          FileUploadStatus.SUCCESS
                        )
                      )
                    )
                  }))
                })
                .catch(() =>
                  setUploader((prev) => ({
                    ...prev,
                    uploadfiles: new Map(
                      Array.from(
                        prev.uploadfiles.set(file.name, FileUploadStatus.FAILED)
                      )
                    )
                  }))
                )
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

  const handleUploaderClose = () => {
    setUploader((prev) => ({ ...prev, isOpen: false }))
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
    handleFileUpload,
    uploader,
    handleUploaderClose
  }
}
