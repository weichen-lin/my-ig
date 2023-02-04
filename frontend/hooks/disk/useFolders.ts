import { useRecoilState } from 'recoil'
import { folderInitState } from 'context/folder'

export default function useFile() {
  const [files, setFiles] = useRecoilState(folderInitState)

  return {}
}
