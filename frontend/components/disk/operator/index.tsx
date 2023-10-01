import clsx from 'clsx'
import { ListMethod, listMethodState } from 'store'
import { useIsMobile } from 'hooks/disk'
import { Loading, Dialog } from 'components/utils'
import fetcher from 'api/fetcher'
import { PCButton, MobileButton } from './buttons'
import { useRef, useEffect, useState, useCallback } from 'react'
import { useGdrive } from 'context'
import { AddFolder } from 'components/utils'
import { useRecoilValue } from 'recoil'

export default function Operator() {
  const { isMobile } = useIsMobile()
  const [openDialog, setOpenDialog] = useState(false)
  const listMethod = useRecoilValue(listMethodState)

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const handlOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

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
            const img = new Image()
            img.src = imgReader.result as string
            img.onload = () => {
              const formData = new FormData()
              formData.append('myfile', file, file.name)
              fetcher
                .post('http://localhost:8080/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then((res) => {})
                .catch((err) => console.log(err))
            }
            img.onerror = (e) => {
              // handleHints('success', '上傳格式錯誤')
            }
          }
        })
      )
    } catch (e) {
      console.log('cancel select')
    }
  }

  useEffect(() => {
    inputRef.current?.select()
    inputRef.current?.focus()
  }, [openDialog])

  const Buttons = [
    {
      name: 'bx:plus',
      message: '建立',
      onClick: handlOpenDialog,
    },
    {
      name: 'basil:upload-solid',
      message: '上傳',
      onClick: () => handleFileUpload(true),
    },
    // {
    //   name: 'majesticons:filter-line',
    //   message: '設定過濾',
    //   onClick: () => console.log('press button'),
    // },
    {
      name: listMethod > ListMethod.Lattice ? 'mi:list' : 'humbleicons:dashboard',
      message: '調整檢視',
      onClick: () => console.log('press button'),
    },
  ]

  return (
    <div
      className={clsx('flex ml-3 mt-2 gap-x-4', `${isMobile ? 'order-last ml-auto' : 'w-full justify-start gap-x-4'}`)}
    >
      {Buttons.map((e, index) =>
        isMobile ? (
          <MobileButton name={e.name} onClick={e.onClick} key={`button_${index}`} />
        ) : (
          <PCButton name={e.name} onClick={e.onClick} message={e.message} key={`button_${index}`} />
        )
      )}
      {openDialog && (
        <Dialog component={<AddFolder ref={inputRef} close={handleCloseDialog} />} close={handleCloseDialog} />
      )}
    </div>
  )
}
