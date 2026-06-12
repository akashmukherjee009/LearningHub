import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CourseMenu from './pages/CourseMenu';
import CourseInfo from './pages/CourseInfo';
import CourseContent from './pages/CourseContent';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <Container className="page-container flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/courses" element={<CourseMenu />} />
            <Route path="/courses/:id" element={<CourseInfo />} />
            <Route path="/courses/:id/content" element={<CourseContent />} />
            <Route path="/courses/:id/quiz" element={<Quiz />} />
          </Routes>
        </Container>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
