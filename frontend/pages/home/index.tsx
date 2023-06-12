import {
  Sort,
  GdriveLikeDisk,
  Operator,
  ImagePlayground,
  UploadTasks,
  BreadCrumbs,
  Hinter,
} from 'components/disk'

import { LayoutAuth } from 'components/layout'
import { Loading } from 'components/utils'

import {
  useDisk,
  useGdrive,
  useImageDisplay,
  useDatetime,
  useOperator,
} from 'hooks/disk'
import { useScroll } from 'hooks/utils'

const date = new Date()

const fakeData = {
  folders: [
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-1',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-2',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-3',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-4',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-5',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-6',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-7',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-8',
    },
  ],
  files: [
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-9',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-10',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-11',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-12',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-13',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-9',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-10',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-11',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-12',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-13',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-9',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-10',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-11',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-12',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-13',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-9',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-10',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-11',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-12',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-13',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-9',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-10',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-11',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-12',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-13',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-9',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-10',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-11',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-12',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
    {
      name: 'test',
      url: 'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png',
      last_modified_at: date.toISOString(),
      id: 'test-id-13',
      tags: ['asdasd', 'asdasd', 'asdasd', 'asdasd', 'asdasd'],
      description: 'test',
    },
  ],
}

export default function DiskPage() {
  const { sortProps, diskProps } = useDisk()

  const { isFetching, diskData, handleCurrentFolder } = diskProps

  const { root, selected, dragged, hoverHandler } = useGdrive()

  const { infoProps, tagProps } = useImageDisplay()

  const { isScrollDown, handleOnScroll } = useScroll()

  const customDatePickerProps = useDatetime()

  const operatorProps = useOperator()

  return (
    <div className='relative w-full h-screen flex flex-col'>
      <div className='flex flex-wrap w-[92%] items-center mx-auto mt-1'>
        <Operator sortProps={sortProps} />
        <BreadCrumbs sortProps={sortProps} />
      </div>
      <div
        className='flex-1 overflow-y-auto'
        onScroll={handleOnScroll}
        ref={root}
      >
        {isFetching || hoverHandler.isMoving ? (
          <div className='flex items-center justify-center w-full h-full'>
            <Loading />
          </div>
        ) : (
          <GdriveLikeDisk
            listMethod={sortProps.listMethod}
            selected={selected}
            dragged={dragged}
            handleImageDisplay={infoProps.handleImageDisplay}
            data={fakeData}
            handleCurrentFolder={handleCurrentFolder}
            hoverHandler={hoverHandler}
          />
        )}
      </div>
      <UploadTasks uploaderProps={operatorProps.uploaderProps} />
      <ImagePlayground
        data={diskData?.files ?? []}
        infoProps={infoProps}
        tagProps={tagProps}
      />
    </div>
  )
}

DiskPage.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutAuth>{page}</LayoutAuth>
}