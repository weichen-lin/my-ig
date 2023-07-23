import clsx from 'clsx'
import { FormatProp, ListMethod, SelectionValue, SelectionStringList } from 'hooks/disk'
import { FileData } from 'context/type'
import { FcFolder } from 'react-icons/fc'
import { ListBackBone } from 'components/disk/files/listbackbone'
import { useState } from 'react'
interface FilesProps extends FormatProp, SelectionStringList {
  files: FileData[]
  handleImageDisplay: (e: string) => void
}

interface FileProps extends FormatProp, SelectionValue {
  fileInfo: FileData
  handleImageDisplay: (e: string) => void
}

export default function Files(props: any) {
  const { listMethod, files, handleImageDisplay, selected, dragged } = props

  return (
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full gap-x-4 mx-auto items-center'>
      {files?.map((e: FileData) => (
        <FileElement
          listMethod={listMethod}
          fileInfo={e}
          // isSelected={selected.has(`selectable-file-${e.id}`)}
          // isDragged={dragged.has(`selectable-file-${e.id}`)}
          handleImageDisplay={handleImageDisplay}
          key={`file_${e.file_id}`}
        />
      ))}
    </div>
  )
}

export function FileElement(props: FileProps) {
  const { fileInfo, listMethod, handleImageDisplay, isSelected, isDragged } = props
  const { file_id, url, file_name, last_modified_at } = fileInfo

  return (
    <div
      className={clsx(
        'flex',
        'transition-all duration-100 ease-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] mb-4'
            : 'w-full flex-col'
        }`
      )}
    >
      {listMethod === ListMethod.Lattice ? (
        <LatticeFile file_id={file_id} file_name={file_name} />
      ) : (
        <ListFile file_id={file_id} file_name={file_name} />
      )}
    </div>
  )
}

const LatticeFile = (props: Partial<FileData>) => {
  const { file_id, file_name } = props
  return (
    <div
      className={clsx(
        'flex flex-col w-full h-[200px] justify-between rounded-lg items-center',
        'border-2',
        `${false ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${false ? 'opacity-50' : 'opacity-100'}`,
        'selectable'
      )}
    >
      <div className={clsx('overflow-hidden', 'h-full')}>
        <img className='min-h-[160px] min-w-full' src={`http://localhost:8080/file/${file_id}`} draggable={false}></img>
      </div>
      <div className='truncate px-2 w-[200px] text-center h-8 my-2'>{file_name}</div>
    </div>
  )
}

const ListFile = (props: Partial<FileData>) => {
  const { file_id, file_name } = props
  const date = new Date()
  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center border-b-2',
        'w-full h-12',
        `${false ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${false ? 'opacity-50' : 'opacity-100'}`,
        'selectable'
      )}
    >
      <div className={clsx('overflow-hidden', 'h-6')}>
        <img
          className='h-6 w-6 mx-2'
          src={`http://localhost:8080/file/${file_id}`}
          draggable={false}
          onError={() => {
            console.log('error image')
          }}
        ></img>
      </div>
      <div className='truncate flex-1 px-4'>{file_name}</div>
      <div className='w-[200px] px-2 text-gray-400 text-right hidden md:block'>{handleTime(date.toISOString())}</div>
    </div>
  )
}

const CustomImage = (props: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const { src } = props
  return (
    <img
      src={src}
      loading='lazy'
      onError={() => {
        console.log('error image')
      }}
    />
  )
}

// import React from "react";
// const ImgProfile = ({ path, placeholder, loadError, ...props }) => {
//   const [img, initImg] = React.useState(placeholder || path);
//   const onLoad = React.useCallback(() => {
//     initImg(path);
//   }, [path]);
//   const onError = React.useCallback(() => {
//     initImg(loadError || placeholder);
//   }, [loadError, placeholder]);
//   React.useEffect(() => {
//     const imageObjt = new Image();
//     imageObjt.src = path;
//     imageObjt.addEventListener("load", onLoad);
//     imageObjt.addEventListener("error", onError);
//     return () => {
//       imageObjt.removeEventListener("load", onLoad);
//       imageObjt.removeEventListener("error", onError);
//     };
//   }, [path, onLoad, onError]);
//   return <img {...props} alt={img} src={img} />;
// };
// export default ImgProfile;

export const LatticeFileBackbone = () => {
  return (
    <div
      className={clsx(
        'flex flex-col w-full h-[200px] justify-between rounded-lg items-center',
        'border-2 animate-pulse border-slate-100 cursor-wait'
      )}
    >
      <div className='h-full w-full bg-slate-100'></div>
      <div className='truncate px-2 w-[180px] text-center h-8 my-2 bg-slate-100 rounded-xl'></div>
    </div>
  )
}

const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}
