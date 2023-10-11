import clsx from 'clsx'
import { ListMethod, listMethodState } from 'store'
import { useIsMobile } from 'hooks/disk'
import { Dialog } from 'components/utils'
import fetcher from 'api/fetcher'
import { PCButton, MobileButton } from './buttons'
import { useRef, useEffect, useState, useCallback } from 'react'
import { AddFolder } from 'components/utils'
import { useRecoilState } from 'recoil'
import { useHints } from 'hooks/disk'

export default function Operator() {
  const { isMobile } = useIsMobile()
  const [openDialog, setOpenDialog] = useState(false)
  const [method, setMethod] = useRecoilState(listMethodState)
  const { AddHints } = useHints()

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
                .then(res => {})
                .catch(err => console.log(err))
            }
            img.onerror = e => {
              // handleHints('success', '上傳格式錯誤')
            }
          }
        }),
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
    {
      name: 'ic:outline-filter-alt',
      message: '設定過濾',
      onClick: () => AddHints('設定過濾', 'progressing', true),
    },
    {
      name: 'ic:outline-filter-alt',
      message: '設定過濾-2',
      onClick: () => AddHints('設定過濾', 'success', false),
    },
    {
      name: method > ListMethod.Lattice ? 'mi:list' : 'humbleicons:dashboard',
      message: '調整檢視',
      onClick: () => setMethod(prev => (prev === ListMethod.Lattice ? ListMethod.List : ListMethod.Lattice)),
    },
  ]

  return (
    <div className={clsx('flex ml-3 gap-x-4', `${isMobile ? 'order-last ml-auto' : 'w-full justify-start gap-x-4'}`)}>
      {Buttons.map((e, index) =>
        isMobile ? (
          <MobileButton name={e.name} onClick={e.onClick} key={`button_${index}`} />
        ) : (
          <PCButton name={e.name} onClick={e.onClick} message={e.message} key={`button_${index}`} />
        ),
      )}
      {openDialog && (
        <Dialog component={<AddFolder ref={inputRef} close={handleCloseDialog} />} close={handleCloseDialog} />
      )}
    </div>
  )
}
