import { useState, useRef } from 'react'

const RecordingButtons = ({
  setIsRecorded,
  startRecording,
  stopRecording,
  setIsRecordingStopped,
  startTimer,
  stopTimer
}) => {
  const mediaRecorderRef = useRef(null)

  const [isRecording, setIsRecording] = useState(false)

  const handleRecord = () => {
    startTimer(5)
    startRecording(mediaRecorderRef)
    setIsRecording(true)
  }

  const handleStop = () => {
    stopRecording(mediaRecorderRef)

    stopTimer()
    setIsRecorded(true)
    setIsRecording(false)
    setIsRecordingStopped(true)
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
