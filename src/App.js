import { useState, useRef } from 'react'
import useTimer from './useTimer'

function App () {
  const { time, startTimer, stopTimer, resetTimer, active } = useTimer(0)
  const [listTime, setListTime] = useState([])
  const isSplitting = useRef(false)
  const handleSplitClick = () => {
    setListTime([time, ...listTime])
  }
  const generateTableSplit = () => {
    let count = listTime.length + 1
    return isSplitting.current ? (
      <table key='table-striped' class='table table-striped'>
        <thead>
          <tr>
            <th>STT</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {listTime.map(t => (
            <tr>
              <td>{`#${--count}`}</td>
              <td>{t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      ''
    )
  }
  return (
    <div className='App container'>
      <h1>React Timer</h1>
      <div className='timer__wrapper'>
        <div className='timer__display'>
          <p>{time}</p>
        </div>
        {generateTableSplit()}
        <div className='button__wrapper'>
          <button className='button btn-stop' onClick={stopTimer}>
            Stop
          </button>
          <button
            className='button btn-start'
            ref={active}
            onClick={startTimer}
          >
            Start
          </button>
          <button
            className='button btn-reset'
            onClick={() => {
              isSplitting.current = false
              setListTime([])
              resetTimer()
            }}
          >
            Reset
          </button>
          <button
            className='button btn-split'
            onClick={() => {
              isSplitting.current = true
              handleSplitClick()
            }}
          >
            Split
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
