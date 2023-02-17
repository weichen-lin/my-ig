import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { diskInitState, diskStatusInitState } from 'context'
import fetcher from 'api/fetcher'
import { APIS } from 'api/apis'

export type ImageDisplayProps = ReturnType<typeof useImageDisplay>

export default function useImageDisplay() {
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const [, setDiskStatus] = useRecoilState(diskStatusInitState)

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isEdit, setIsEdit] = useState(false)

  const [text, setText] = useState('')

  const [tag, setTag] = useState('')
  const [isAddTag, setIsAddTag] = useState(false)

  const onEditTag = (e: string) => {
    setTag(e)
  }

  const handleIsAddTag = () => {
    setIsAddTag((prev) => !prev)
  }

  const handleAddTag = () => {
    const id = diskData.files[currentIndex]?.id ?? ''
    setIsAddTag((prev) => !prev)

    fetcher
      .patch(APIS.UPDATE_TAG, { id, tag })
      .then((res) => {
        if (res.status === 200) {
          const tags = diskData.files[currentIndex]?.tags ?? []

          setDiskData((prev) => ({
            ...prev,
            files: [
              ...prev.files.slice(0, currentIndex),
              { ...prev.files[currentIndex], tags: [...tags, tag] },
              ...prev.files.slice(currentIndex + 1)
            ]
          }))
        }
      })
      .catch(() => console.log('tag is already got 5'))
    setTag('')
  }

  const onEdit = (e: string) => {
    setText(e)
  }

  const handleEdit = () => {
    const id = diskData.files[currentIndex]?.id ?? ''
    setIsEdit((prev) => !prev)

    if (!isEdit) return
    fetcher
      .patch(APIS.UPDATE_DESCRIPTION, { id, description: text })
      .then((res) => {
        if (res.status === 200) {
          setDiskData((prev) => ({
            ...prev,
            files: [
              ...prev.files.slice(0, currentIndex),
              { ...prev.files[currentIndex], description: text },
              ...prev.files.slice(currentIndex + 1)
            ]
          }))
        }
      })
  }

  const handleEscape = () => {
    setIsOpen(false)
    setIsEdit(false)
    setDiskStatus((prev) => ({ ...prev, canSelect: true }))
  }

  const handleImageDisplay = (id: string) => {
    const index = diskData.files.map((e) => e.id).indexOf(id)
    if (index < 0) return
    setCurrentIndex(index)
    setIsOpen(true)
    setText(diskData.files[index].description ?? '')
    setDiskStatus((prev) => ({ ...prev, canSelect: false }))
  }

  const handleInfo = (index: number) => {
    setCurrentIndex(index)
    setText(diskData.files[currentIndex]?.description ?? '')
  }

  return {
    infoProps: {
      isOpen,
      currentIndex,
      handleEscape,
      handleImageDisplay,
      handleInfo,
      isEdit,
      onEdit,
      handleEdit,
      text
    },
    tagProps: {
      tag,
      isAddTag,
      handleIsAddTag,
      handleAddTag,
      onEditTag
    }
  }
}
