import Recorder from '../../../assets/recorder.jpeg'
import Completed from '../../../assets/completed.png'

import { useNavigate } from 'react-router-dom'

import './quiz-card.css'

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/quiz/${quiz.id}`)
  }

  return (
    <div className='card' onClick={handleClick}>
      <div className='circle'>
        {quiz.completed ? <img src={Completed} /> : <img src={Recorder} />}
      </div>

      <p>{quiz.title}</p>
    </div>
  )
}

export default QuizCard
