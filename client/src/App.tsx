import './App.css'
import CustomDate from './components/date/CustomDate'
import PersonName from './components/PersonName'
import Shift from './components/Shift'

function App() {
  const shift = {
    startTime: new Date(2024, 2, 22, 8, 0, 0),
    endTime: new Date(2024, 2, 22, 14, 0, 0),
    person: { firstName: 'John', lastName: 'Doe' },
  }

  return (
    <>
      <CustomDate date={new Date()} />
      <PersonName person={{ firstName: 'John', lastName: 'Doe' }} />
      <Shift shift={shift} />
    </>
  )
}

export default App
