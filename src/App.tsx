import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Careers from './pages/Careers'
import CareerDetail from './pages/CareerDetail'
import Quiz from './pages/Quiz'
import Resources from './pages/Resources'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/career/:id" element={<CareerDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  )
}

export default App
