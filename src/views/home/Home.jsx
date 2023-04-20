import { useNavigate } from 'react-router-dom'
import './home.css'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/quizes')
  }
  return (
    <div className='home-div'>
      <h1>Video Cuestionario</h1>
      <button onClick={handleClick}>Grabar video</button>
      <div className='button-div'>
        <button>Envíar respuestas</button>
      </div>
    </div>
  )
}

export default Home
