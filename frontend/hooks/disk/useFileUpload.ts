import { toast } from 'react-toastify'
import { uploadFile } from 'api'
import { useRouter } from 'next/router'

enum FileUploadStatus {
  SUCCESS,
  FAILED,
}

export default function useFileUpload() {
  const router = useRouter()

  const filehandle = (handler: FileSystemFileHandle) => {
    return new Promise<number>(async (resolve, reject) => {
      const file = await handler.getFile()

      const imgReader = new FileReader()
      imgReader.readAsDataURL(file)
      imgReader.onloadend = () => {
        const img = new Image()
        img.src = imgReader.result as string
        img.onload = () => {
          const formData = new FormData()
          formData.append('file', file, file.name)
          formData.append('name', file.name)
          formData.append('locateAt', (router.query.f as string) ?? '')
          uploadFile(formData)
          resolve(FileUploadStatus.SUCCESS)
        }
        img.onerror = () => {
          reject(FileUploadStatus.FAILED)
        }
      }
    })
  }

  const handleFileUpload = async (multiple: boolean) => {
    try {
      const FileHandlers = await window?.showOpenFilePicker({
        multiple: multiple,
      })

      const toastId = toast.loading(`正在上傳 ${FileHandlers.length} 份檔案`, { position: 'bottom-left' })
      const results = await Promise.all(FileHandlers.map(e => filehandle(e).catch(err => err)))
      const successFile = results.filter(e => e === FileUploadStatus.SUCCESS)
      toast.update(toastId, {
        render: successFile.length > 0 ? `成功上傳 ${successFile.length}份檔案` : `上傳所有檔案失敗`,
        type: successFile.length > 0 ? 'success' : 'error',
        isLoading: false,
        autoClose: 2000,
      })
    } catch {
      console.log('Cancel select!')
    }
  }

  return { handleFileUpload }
}
