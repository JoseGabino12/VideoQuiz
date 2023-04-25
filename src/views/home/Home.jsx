import QuizCard from './components/quiz-card'
import { quizes } from '../../data/quizes'
import './home.css'

const Home = () => {
  const completed = quizes.filter((quiz) => quiz.completed === false)
  return (
    <div className='home-div'>
      <h1>Video Cuestionario</h1>
      <div className='card-div'>
        {quizes.map((quiz, index) => (
          <QuizCard key={index} quiz={quiz} />
        ))}
      </div>

      {completed.length === 0 && (
        <div className='button-div'>
          <button className='finish-home-btn'>Envíar respuestas</button>
        </div>
      )}
    </div>
  )
}

export default Home
