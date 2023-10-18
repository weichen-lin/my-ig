import { toast } from 'react-toastify'
import { uploadFile } from 'api'

export default function useFileUpload() {
  const handleFileUpload = async (multiple: boolean) => {
    try {
      const FileHandlers = await window?.showOpenFilePicker({
        multiple: multiple,
      })

      await Promise.all(
        FileHandlers.map(async (filehandle, index) => {
          const file = await filehandle.getFile()

          const imgReader = new FileReader()
          imgReader.readAsDataURL(file)
          imgReader.onloadend = () => {
            toast.loading('上傳中...', { position: 'bottom-right' })
            const img = new Image()
            img.src = imgReader.result as string
            img.onload = () => {
              //   const formData = new FormData()
              //   formData.append('myfile', file, file.name)
              //   uploadFile(formData)
            }
            img.onerror = e => {
              toast.error('上傳格式錯誤')
            }
          }
        }),
      )
    } catch (e) {
      console.log('cancel select')
    }
  }

  return { handleFileUpload }
}
