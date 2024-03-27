import { FC } from 'react'
import { Shift } from '../models/Shift'
import FullName from './FullName'
import CustomDate from './date/CustomDate'

type ShiftProps = {
  shift: Shift
}

const Shift: FC<ShiftProps> = ({ shift }) => {
  if (!shift) return <div>No shift</div>

  const { startTime, endTime, profile } = shift

  return (
    <div>
      <h3>Shift</h3>
      <p>
        <FullName profile={profile} /> Start time:{' '}
        <CustomDate date={startTime} /> End time: <CustomDate date={endTime} />
      </p>
    </div>
  )
}

export default Shift
