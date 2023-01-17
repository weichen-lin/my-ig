import DatePicker from 'react-datepicker'

import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

import clsx from 'clsx'

import { CalendarIcon, ArrowNoLineIcon } from 'public/icon/disk'

import useDatetime from 'hooks/disk/useDatetime'

export default function CustomDatePicker() {
  const { startDate, endDate, isOpen, setIsOpen, ref, handleChange } =
    useDatetime()
  return (
    <>
      <div className='border-2 border-transparent px-3 flex mr-2 text-gray-500 text-lg rounded-lg cursor-pointer hover:border-red-100 relative'>
        <div
          className='flex w-[300px]'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CalendarIcon className='w-[40px] h-[40px] my-[2px] mr-4' />
          <span className='whitespace-nowrap py-2 mx-2'>
            {format(startDate, 'yyyy-MM-dd', { locale: zhTW })}
          </span>
          {endDate ? (
            <>
              <span className='py-2'> - </span>
              <span className='whitespace-nowrap py-2 mx-2'>
                {format(endDate, 'yyyy-MM-dd', { locale: zhTW })}
              </span>
            </>
          ) : (
            ''
          )}
        </div>
        {isOpen && (
          <div className={`absolute top-16 z-[999] left-4`} ref={ref}>
            <DatePicker
              locale={zhTW}
              selected={startDate}
              onChange={(e) => handleChange(e)}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              inline
              nextMonthButtonLabel='>'
              previousMonthButtonLabel='<'
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => (
                <div className='flex items-center justify-between px-4 py-4'>
                  <span className='text-lg text-gray-700'>
                    {format(date, 'yyyy MMMM', { locale: zhTW })}
                  </span>

                  <div className='space-x-2'>
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      type='button'
                      className={clsx(
                        `${
                          prevMonthButtonDisabled &&
                          'cursor-not-allowed opacity-50'
                        }`,
                        'inline-flex',
                        'p-1',
                        'w-8 h-8',
                        'rounded border border-gray-300 bg-white shadow-sm',
                        'text-sm font-medium text-gray-700',
                        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0'
                      )}
                    >
                      <ArrowNoLineIcon className='rotate-180' />
                    </button>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      type='button'
                      className={clsx(
                        `${
                          nextMonthButtonDisabled &&
                          'cursor-not-allowed opacity-50'
                        }`,
                        'inline-flex',
                        'p-1',
                        'w-8 h-8',
                        'rounded border border-gray-300 bg-white shadow-sm',
                        'text-sm font-medium text-gray-700',
                        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0'
                      )}
                    >
                      <ArrowNoLineIcon />
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </div>
    </>
  )
}
