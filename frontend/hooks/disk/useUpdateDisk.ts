import { useRecoilState, useRecoilValue } from 'recoil'
import { diskStatusInitState } from 'context'
import { diskInitState } from 'context'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
export default function useUpdateDisk() {
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const diskStatus = useRecoilValue(diskStatusInitState)

  const getFolders = (startDate: Date, endDate: Date) => {
    const { current_folder } = diskStatus
    const current_folder_to_api = current_folder.pop() ?? ''

    fethcher
      .get(
        `${APIS.FOLDER}?${new URLSearchParams({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          current_folder: current_folder_to_api
        })}`
      )
      .then((e) => console.log(e))
      .catch((e) => console.log(e))
  }

  return { getFolders }
}
