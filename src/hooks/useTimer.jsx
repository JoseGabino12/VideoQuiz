import { useState, useEffect } from 'react'

export const useTimer = () => {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let intervalId = null

    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [running])

  const startTimer = (duration = 0, handleStop) => {
    setTime(0)
    setRunning(true)

    if (duration > 0) {
      setTimeout(() => {
        setRunning(false)
        handleStop()
      }, duration * 1000)
    }
  }

  const stopTimer = () => {
    setRunning(false)
  }

  const resetTimer = () => {
    setTime(0)
    setRunning(false)
  }

  const formattedTime = `${Math.floor(time / 60)}:${(time % 60)
    .toString()
    .padStart(2, '0')}`

  return {
    time,
    formattedTime,
    startTimer,
    stopTimer,
    resetTimer
  }
}
