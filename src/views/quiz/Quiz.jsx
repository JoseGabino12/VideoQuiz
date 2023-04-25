import { useNavigate, useParams } from 'react-router-dom'

import { BiArrowBack } from 'react-icons/bi'
import { quizes } from '../../data/quizes'

import VideoCard from './components/video-card/video-card'
import ButtonsPrevNext from './components/next-prev/buttons'

import './quiz.css'

const Quiz = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const quiz = quizes.find((quiz) => quiz.id === parseInt(id))

  const handleBack = () => {
    const tracks = window.stream.getTracks()

    tracks.forEach((track) => {
      track.stop()
    })

    navigate('/')
  }

  return (
    <div className='quiz-card-div'>
      <button onClick={handleBack} className='btn-arrowBack'>
        <BiArrowBack />
        Atrás
      </button>

      <div className='quiz-div'>
        <h1>{quiz?.title}</h1>

        <VideoCard quiz={quiz} />
      </div>

      <ButtonsPrevNext id={id} quizes={quizes} />
    </div>
  )
}

export default Quiz
