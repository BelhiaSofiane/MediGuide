import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SymptomChecker from './pages/SymptomChecker';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
          <Routes>
            <Route path="/SymptomChecker" element={<SymptomChecker />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
  )
}

export default App
