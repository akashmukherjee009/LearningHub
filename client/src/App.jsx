import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <section className="page">
      <h1>LearningHub</h1>
      <p>Vite React is ready with React Router.</p>
      <Link to="/about">Open about page</Link>
    </section>
  )
}

function About() {
  return (
    <section className="page">
      <h1>About</h1>
      <p>This route is powered by react-router-dom.</p>
      <Link to="/">Back home</Link>
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
