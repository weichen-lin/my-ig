import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { addMonths, format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

import { useState } from 'react'

import clsx from 'clsx'

export default function CustomDatePicker() {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <div className='z-[999]'>
      <DatePicker
        locale={zhTW}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        // showPopperArrow={true}selectsRange
        startDate={startDate}
        endDate={addMonths(startDate, 1)}
        inline
        nextMonthButtonLabel='>'
        previousMonthButtonLabel='<'
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
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
                    prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
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
                    nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
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
  )
}
