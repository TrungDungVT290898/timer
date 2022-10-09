import { useState, useRef, useEffect } from 'react'
const useTimer = (ini = 0) => {
  const addingHeaderForNumber = number => {
    return number >= 10 ? number : '0' + number
  }
  const convertSecondsToTimeString = interval => {
    let hours = Math.floor(interval / 3600)
    interval = interval - hours * 3600
    let minutes = Math.floor(interval / 60)
    interval -= minutes * 60

    return `${addingHeaderForNumber(hours)} :  ${addingHeaderForNumber(
      minutes
    )} :  ${addingHeaderForNumber(interval)} `
  }
  const [time, setTime] = useState(() => convertSecondsToTimeString(0))
  const isStart = useRef(false)
  const active = useRef(false)
  const refInterval = useRef(ini)
  useEffect(() => {
    const timerId = setInterval(() => {
      if (isStart.current) {
        setTime(convertSecondsToTimeString(++refInterval.current))
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
    setTime(() => convertSecondsToTimeString(0))
    refInterval.current = 0
    active.current.disabled = false
  }

  return { time, startTimer, stopTimer, resetTimer, active }
}
export default useTimer
