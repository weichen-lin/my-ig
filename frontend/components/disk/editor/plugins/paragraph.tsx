import DropDownList from './dropdown'
import { useState } from 'react'

const ParagraphOptions = [
  { icon: 'subway:paragraph', title: 'Normal' },
  { icon: 'material-symbols:format-h1-rounded', title: 'Heading 1' },
  { icon: 'material-symbols:format-h2-rounded', title: 'Heading 2' },
  { icon: 'material-symbols:format-h3-rounded', title: 'Heading 3' },
  { icon: 'material-symbols:list', title: 'Bullet List' },
  { icon: 'material-symbols:format-list-numbered', title: 'Numbered List' },
  { icon: 'material-symbols:check-box-outline-rounded', title: 'Check List' },
  { icon: 'ri:chat-quote-line', title: 'Quote' },
  { icon: 'ph:code-block', title: 'Code Block' },
]

export default function Paragraph() {
  const [currentOption, setCurrentOption] = useState(ParagraphOptions[0])

  const handleSelect = (option: string) => {
    const index = ParagraphOptions.findIndex(item => item.title === option)
    setCurrentOption(ParagraphOptions[index])
  }

  return (
    <DropDownList
      icon={currentOption.icon}
      title={currentOption.title}
      onSelect={handleSelect}
      options={ParagraphOptions}
    />
  )
}
