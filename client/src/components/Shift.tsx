import { FC } from 'react'
import { Shift } from '../models/Shift'
import PersonName from './PersonName'
import CustomDate from './date/CustomDate'

type ShiftProps = {
  shift: Shift
}

const Shift: FC<ShiftProps> = ({ shift }) => {
  if (!shift) return <div>No shift</div>

  const { startTime, endTime, person } = shift

  return (
    <div>
      <h3>Shift</h3>
      <p>
        <PersonName person={person} /> Start time:{' '}
        <CustomDate date={startTime} /> End time: <CustomDate date={endTime} />
      </p>
    </div>
  )
}

export default Shift
