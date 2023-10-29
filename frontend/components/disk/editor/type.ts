export enum ParagraphType {
  Paragraph = 'paragraph',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  BULLET_LIST = 'bulletList',
  NUMBERED_LIST = 'numberedList',
  CHECK_LIST = 'checkList',
  QUOTE = 'quote',
  CODE_BLOCK = 'codeBlock',
}

export const ParagraphOptions = [
  { icon: 'subway:paragraph', title: 'Normal', value: ParagraphType.Paragraph },
  { icon: 'material-symbols:format-h1-rounded', title: 'Heading 1', value: ParagraphType.H1 },
  { icon: 'material-symbols:format-h2-rounded', title: 'Heading 2', value: ParagraphType.H2 },
  { icon: 'material-symbols:format-h3-rounded', title: 'Heading 3', value: ParagraphType.H3 },
  { icon: 'material-symbols:list', title: 'Bullet List', value: ParagraphType.BULLET_LIST },
  { icon: 'material-symbols:format-list-numbered', title: 'Numbered List', value: ParagraphType.NUMBERED_LIST },
  { icon: 'material-symbols:check-box-outline-rounded', title: 'Check List', value: ParagraphType.CHECK_LIST },
  { icon: 'ri:chat-quote-line', title: 'Quote', value: ParagraphType.QUOTE },
  { icon: 'ph:code-block', title: 'Code Block', value: ParagraphType.CODE_BLOCK },
]
