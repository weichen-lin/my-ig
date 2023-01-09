import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { addMonths, format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

import { useState } from 'react'

import clsx from 'clsx'

import { CalendarIcon } from 'public/icon/disk'

export default function CustomDatePicker() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates

    setStartDate(start || new Date())
    if (endDate && startDate.getTime() < endDate?.getTime()) {
      setEndDate(null)
    }
    if (end) {
      setEndDate(end)
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className='border-2 border-transparent px-3 flex mr-20 text-gray-500 text-lg rounded-lg cursor-pointer hover:border-red-300 relative'>
        <div className='flex' onClick={() => setIsOpen((prev) => !prev)}>
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
          <div className={`absolute top-16 z-[999] left-12`}>
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
                <div className='flex items-center justify-between px-2 py-2'>
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
                        'rounded border border-gray-300 bg-white shadow-sm',
                        'text-sm font-medium text-gray-700',
                        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0'
                      )}
                    ></button>

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
                        'rounded border border-gray-300 bg-white shadow-sm',
                        'text-sm font-medium text-gray-700',
                        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0'
                      )}
                    ></button>
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
