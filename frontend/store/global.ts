import { atom } from 'recoil'

export type Action = 'success' | 'failed' | 'progressing'

export interface Hint {
  id: string
  message: string
  status: Action
  createAt: Date
  isPromise: boolean
}

export const HintState = atom<Hint[]>({
  key: 'HintState',
  default: []
})
