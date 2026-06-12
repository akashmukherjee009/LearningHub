import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BookOpen, Globe, Mail, MessageCircle } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-5 py-5" style={{ 
      boxShadow: 'inset 0 10px 15px -10px rgba(163,177,198,0.5)', 
      backgroundColor: 'var(--bg-color)' 
    }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h4 className="neu-title d-flex align-items-center gap-2 mb-3">
              <BookOpen size={24} color="#ccac00" />
              LearnGold
            </h4>
            <p className="text-muted">
              Master new skills with our premium micro-learning platform. Bite-sized lessons for a golden learning experience.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="neu-title mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">About Us</a></li>
              <li className="mb-2"><a href="/courses" className="text-muted text-decoration-none">All Courses</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="neu-title mb-3">Connect With Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="neu-btn" style={{ padding: '10px', borderRadius: '50%' }}>
                <Globe size={20} color="#ccac00" />
              </a>
              <a href="#" className="neu-btn" style={{ padding: '10px', borderRadius: '50%' }}>
                <Mail size={20} color="#ccac00" />
              </a>
              <a href="#" className="neu-btn" style={{ padding: '10px', borderRadius: '50%' }}>
                <MessageCircle size={20} color="#ccac00" />
              </a>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-4 pt-4 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          <p className="text-muted mb-0">© {new Date().getFullYear()} LearnGold. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
