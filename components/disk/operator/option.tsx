import clsx from 'clsx';
import { AddFile } from 'public/icon/disk';

interface OptionProps {
  isOpen: boolean;
  angle: string;
  icon?: JSX.Element;
  onClick: () => void;
}

export default function Option({ isOpen, angle, icon, onClick }: OptionProps) {
  return (
    <li>
      <label
        className={clsx(
          'bg-white border-2 border-gray-500 w-full h-full absolute top-0 left-0',
          'origin-[210%] rounded-full cursor-pointer',
          'transition-all duration-300 ease-in-out',
          'active:top-2',
          `${isOpen ? angle : ''}`
        )}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <input className='w-full h-full hidden' type='file' />
        {icon}
      </label>
    </li>
  );
}
