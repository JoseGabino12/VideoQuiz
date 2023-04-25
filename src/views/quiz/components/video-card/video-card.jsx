import { useRef, useState, useEffect } from 'react'
import { useRecorder } from '../../../../hooks/useRecorder'

import Loader from '../../../../components/loader'
import Controls from '../controls-div/controls'
import './video-card.css'

const VideoCard = ({ quiz }) => {
  const videoRef = useRef()
  const videoRecorderRef = useRef()

  const [isLoading, setIsLoading] = useState(true)
  const [isRecorded, setIsRecorded] = useState(false)
  const [isRecordingStopped, setIsRecordingStopped] = useState(false)

  const { startRecording, stopRecording, startPlay, resetRecording, initial } =
    useRecorder(quiz)

  const handlePlay = () => {
    startPlay(videoRecorderRef, isRecordingStopped)
  }

  useEffect(() => {
    if (quiz.completed === true) {
      setIsRecorded(true)
    } else {
      resetRecording(setIsRecorded, videoRef, setIsLoading)
    }

    initial(videoRef, setIsLoading)
  }, [quiz])

  return (
    <>
      {isLoading ? (
        <div className='loader-div'>
          <Loader />
        </div>
      ) : (
        <div className='video-div'>
          {isRecorded ? (
            <video playsInline loop ref={videoRecorderRef} className='video' />
          ) : (
            <video
              autoPlay
              playsInline
              ref={videoRef}
              className='video'
              muted
            />
          )}

          <Controls
            isRecorded={isRecorded}
            setIsRecorded={setIsRecorded}
            videoRef={videoRef}
            setIsLoading={setIsLoading}
            resetRecording={resetRecording}
            handlePlay={handlePlay}
            stopRecording={stopRecording}
            startRecording={startRecording}
            setIsRecordingStopped={setIsRecordingStopped}
          />
        </div>
      )}
    </>
  )
}

export default VideoCard
