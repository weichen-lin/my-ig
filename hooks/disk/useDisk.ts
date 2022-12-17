import { useState } from 'react'

export enum ListMethod {
  Lattice,
  List
}

type listMethodState = 0 | 1

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(
    ListMethod.Lattice
  )

  return { listMethod, setListMethod }
}
