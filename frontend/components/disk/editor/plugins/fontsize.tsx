import DropDownList from './dropdown'
import { useState } from 'react'

const FontSizeOptions = [
  { title: '10px' },
  { title: '11px' },
  { title: '12px' },
  { title: '13px' },
  { title: '14px' },
  { title: '15px' },
  { title: '16px' },
  { title: '17px' },
  { title: '18px' },
  { title: '19px' },
  { title: '20px' },
]

export default function FontSize() {
  const [currentOption, setCurrentOption] = useState(FontSizeOptions[0])

  const handleSelect = (option: string) => {
    const index = FontSizeOptions.findIndex(item => item.title === option)
    setCurrentOption(FontSizeOptions[index])
  }

  return <DropDownList title={currentOption.title} onSelect={handleSelect} options={FontSizeOptions} />
}
