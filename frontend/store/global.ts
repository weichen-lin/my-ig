import { atom } from 'recoil'

type Action = 'success' | 'failed'

interface Hint {
  id: string
  message: string
  status: Action
  createAt: Date
}

export const HintState = atom<Hint[]>({
  key: 'HintState',
  default: [],
})
