import { FC } from 'react'

export type CustomDateProps = {
  date: Date
}

const CustomDate: FC<CustomDateProps> = ({ date }) => {
  return (
    <>
      {/* <p>Date formats</p> */}
      <span>{date.toLocaleString()}</span>
      {/* <span>toLocaleString: {date.toLocaleString()}</span> */}
      {/* <div>toLocaleDateString: {date.toLocaleDateString()}</div>
      <div>toLocaleTimeString: {date.toLocaleTimeString()}</div>
      <div>
        getDay:{' '}
        {
          [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ][date.getDay()]
        }
      </div>
      <div>toString: {date.toString()}</div> */}
    </>
  )
}

export default CustomDate
