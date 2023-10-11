import { Hinter } from './hint'
import { HintState } from 'store'
import { useRecoilValue } from 'recoil'

export default function HintContainer() {
  const hints = useRecoilValue(HintState)

  return (
    <div className='fixed bottom-0 left-0 w-[150px] h-[400px] z-30'>
      <div className='relative w-full h-full'>
        <ul
          className='w-full h-full gap-2 flex flex-col justify-end px-6 py-4'
          style={{ perspective: '300px', transformStyle: 'preserve-3d' }}
        >
          {hints.map(e => (
            <Hinter
              message={`${e.message}`}
              status={e.status}
              key={e.id}
              isPromise={e.isPromise}
              id={e.id}
              createAt={e.createAt}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
