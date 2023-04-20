import { ReactMediaRecorder } from 'react-media-recorder'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

import './quiz.css'

const Quiz = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }
  return (
    <div className='quiz-div'>
      <button onClick={handleBack} className='btn-arrowBack'>
        <BiArrowBack />
        Atrás
      </button>
      <h1>Video Cuestionario</h1>
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <button onClick={startRecording}>Start</button>
            <button onClick={stopRecording}>Stop</button>
            <p>{status}</p>
            <video src={mediaBlobUrl} controls autoPlay loop />
          </div>
        )}
      />
    </div>
  )
}

export default Quiz
