import { useNavigate } from 'react-router-dom'

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const ButtonsPrevNext = ({ id, quizes }) => {
  const navigate = useNavigate()
  const completed = quizes.filter((quiz) => quiz.completed === false)

  const handleNext = () => {
    const currentQuizIndex = quizes.findIndex(
      (quiz) => quiz.id === parseInt(id)
    )
    const nextQuiz = quizes.find(
      (quiz, index) => index > currentQuizIndex && !quiz.completed
    )

    if (currentQuizIndex === quizes.length - 1)
      return navigate(`/quiz/${completed[0].id}`)

    if (nextQuiz) return navigate(`/quiz/${nextQuiz.id}`)
  }

  const handleFinish = () => {
    alert('¡Felicidades! Has terminado las preguntas')
    quizes.forEach((quiz) => {
      quiz.completed = false
    })
    navigate('/')
  }

  const handlePrev = () => {
    if (parseInt(id) === 1) return navigate(`/quiz/${quizes.length}`)
    navigate(`/quiz/${parseInt(id) - 1}`)
  }

  return (
    <div className='next-prev'>
      <button className='prev-btn' onClick={handlePrev}>
        <BiChevronLeft /> Anterior
      </button>
      {completed.length === 0 ? (
        <button className='finish-btn' onClick={handleFinish}>
          Terminar
        </button>
      ) : (
        <button className='next-btn' onClick={handleNext}>
          Siguiente <BiChevronRight />
        </button>
      )}
    </div>
  )
}

export default ButtonsPrevNext
