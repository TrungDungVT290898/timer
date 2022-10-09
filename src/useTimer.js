import { useState, useRef, useEffect } from 'react'
import { formatTime } from './formatTime'
const useTimer = (ini = 0) => {
  const [time, setTime] = useState(() => formatTime(0))
  const isStart = useRef(false)
  const active = useRef(false)
  const refInterval = useRef(ini)
  useEffect(() => {
    const timerId = setInterval(() => {
      if (isStart.current) {
        setTime(formatTime(++refInterval.current))
      }
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  const startTimer = () => {
    isStart.current = true
    active.current.disabled = true
  }
  const stopTimer = () => {
    isStart.current = false
    active.current.disabled = false
  }
  const resetTimer = () => {
    isStart.current = false
    setTime(() => formatTime(0))
    refInterval.current = 0
    active.current.disabled = false
  }

  return { time, startTimer, stopTimer, resetTimer, active }
}
export default useTimer
