import QuizCard from '../../components/QuizCard/quiz-card'
import { quizes } from '../../data/quizes'
import './home.css'

const Home = () => {
  return (
    <div className='home-div'>
      <h1>Video Cuestionario</h1>
      <div className='card-div'>
        {quizes.map((quiz, index) => (
          <QuizCard key={index} quiz={quiz} />
        ))}
      </div>
      <div className='button-div'>
        <button disabled>Envíar respuestas</button>
      </div>
    </div>
  )
}

export default Home
