import Home from '../views/home/Home'
import Quiz from '../views/quiz/Quiz'

const routes = [
  {
    name: 'home',
    path: '/',
    Component: Home
  },
  {
    name: 'quizes',
    path: '/quizes',
    Component: Quiz
  }
]

export default routes
