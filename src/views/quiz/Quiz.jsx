import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

import { quizes } from '../../data/quizes'

import './quiz.css'
import VideCard from '../../components/VideoCard/video-card'

const Quiz = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const quiz = quizes.find((quiz) => quiz.id === parseInt(id))

  const handleBack = () => {
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

        <VideCard />
      </div>
    </div>
  )
}

export default Quiz
