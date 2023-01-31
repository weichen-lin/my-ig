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
      <div className='border-b-2 w-[200px] xs:w-[250px] text-gray-500 cursor-pointer hover:border-red-100 relative mr-1 md:mr-4'>
        <div
          className='flex justify-evenly'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CalendarIcon className='w-6 h-4 mt-[2px] xs:w-8 xs:h-6' />
          <div className='whitespace-nowrap text-sm xs:text-base my-[1px] xs:my-[2px]'>
            {format(startDate, 'yyyy-MM-dd', { locale: zhTW })}
          </div>
          {endDate ? (
            <>
              <div className='text-sm mx-[2px] xs:text-base my-[1px] xs:my-[2px]'>
                -
              </div>
              <div className='whitespace-nowrap text-sm xs:text-base my-[1px] xs:my-[2px] mr-1'>
                {format(endDate, 'yyyy-MM-dd', { locale: zhTW })}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        {isOpen && (
          <div
            className={`absolute top-8 z-[999] -left-16 xs:-left-0`}
            ref={ref}
          >
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
