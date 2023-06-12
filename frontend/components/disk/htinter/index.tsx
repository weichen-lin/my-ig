import { CheckMark } from 'components/disk/htinter/checkmark'
import { useHints } from 'hooks/disk'

export default function Hinter() {
  const { hints, AddHints } = useHints()

  return (
    <div className='fixed bottom-0 left-0 w-[300px] h-[400px]'>
      <div className='relative w-full h-full'>
        <ul
          className='w-full h-full gap-2 flex flex-col justify-end p-4'
          style={{ perspective: '300px', transformStyle: 'preserve-3d' }}
          onClick={() => AddHints('test')}
        >
          {hints.map((e) => (
            <CheckMark message={`${e.message}`} key={e.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}
