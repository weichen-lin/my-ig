import { CheckMark } from 'components/disk/hinter/checkmark'
import { useContext } from 'react'
import { IgContext } from 'context'

export default function Hinter() {
  const kushareContext = useContext(IgContext)

  return (
    <div className='fixed bottom-0 left-0 w-[150px] h-[400px] z-30'>
      <div className='relative w-full h-full'>
        <ul
          className='w-full h-full gap-2 flex flex-col justify-end px-6 py-8'
          style={{ perspective: '300px', transformStyle: 'preserve-3d' }}
        >
          {kushareContext?.hints.map((e) => (
            <CheckMark message={`${e.message}`} key={e.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}
