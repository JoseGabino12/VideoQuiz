import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import routes from './routes/routes'

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  )
}

export default App
