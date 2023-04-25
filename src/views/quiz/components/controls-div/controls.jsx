import { BsRecordFill, BsPlayBtn } from 'react-icons/bs'
import { useTimer } from '../../../../hooks/useTimer'

import RecordingButtons from '../../../../components/recording-buttons'
import RecordedButtons from '../../../../components/recorded-buttons'

const Controls = ({
  isRecorded,
  setIsRecorded,
  videoRef,
  setIsLoading,
  resetRecording,
  handlePlay,
  stopRecording,
  startRecording,
  setIsRecordingStopped
}) => {
  const { formattedTime, startTimer, stopTimer, resetTimer } = useTimer()

  return (
    <div className='controls-div'>
      {isRecorded ? (
        <>
          <RecordedButtons
            resetTimer={resetTimer}
            resetRecording={resetRecording}
            setIsRecorded={setIsRecorded}
            videoRef={videoRef}
            setIsLoading={setIsLoading}
          />
          <button className='btn-play' onClick={handlePlay}>
            <BsPlayBtn />
          </button>
        </>
      ) : (
        <RecordingButtons
          startTimer={startTimer}
          stopTimer={stopTimer}
          setIsRecorded={setIsRecorded}
          startRecording={startRecording}
          stopRecording={stopRecording}
          setIsRecordingStopped={setIsRecordingStopped}
        />
      )}
      <div className='status-recorder'>
        <BsRecordFill color='red' />
        <p>{formattedTime}/2:00</p>
      </div>
    </div>
  )
}

export default Controls
