import { useState, useRef } from 'react'

const RecordingButtons = ({
  setIsRecorded,
  startRecording,
  stopRecording,
  setIsRecordingStopped,
  startTimer,
  stopTimer
}) => {
  const [isRecording, setIsRecording] = useState(false)

  const handleStop = () => {
    stopRecording()
    stopTimer()
    setIsRecorded(true)
    setIsRecording(false)
    setIsRecordingStopped(true)
  }

  const handleRecord = () => {
    startTimer(5, handleStop)
    startRecording()
    setIsRecording(true)
  }

  return (
    <>
      {isRecording ? (
        <button className='btn-stop' onClick={handleStop}>
          <span>Detener</span>
        </button>
      ) : (
        <button className='btn-record' onClick={handleRecord}>
          <span>Grabar</span>
        </button>
      )}
    </>
  )
}

export default RecordingButtons
