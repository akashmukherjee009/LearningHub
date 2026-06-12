import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, TrendingUp } from 'lucide-react';

function Home() {
  return (
    <div className="py-5">
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h1 className="neu-title display-4 mb-3">Learn Gold</h1>
          <p className="lead mb-4">
            Master new skills with our micro-learning platform. Bite-sized lessons, engaging content, and a golden experience.
          </p>
          <div className="d-flex gap-3">
            <Link to="/courses" className="neu-btn neu-btn-primary">
              <PlayCircle size={20} /> Start Learning
            </Link>
            <Link to="/auth" className="neu-btn">
              Join Now
            </Link>
          </div>
        </Col>
        <Col md={6}>
          <div className="neu-box text-center p-5">
            <img 
              src="https://cdn3d.iconscout.com/3d/premium/thumb/graduation-cap-4996160-4159516.png" 
              alt="Learning" 
              className="img-fluid"
              style={{ maxHeight: '300px', filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.1))' }}
            />
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <div className="neu-card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <TrendingUp size={40} color="#ccac00" />
              </div>
              <h3 className="neu-title h5">Bite-sized Lessons</h3>
              <p>Learn at your own pace with 5-10 minute micro-lessons designed for maximum retention.</p>
            </div>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="neu-card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <PlayCircle size={40} color="#ccac00" />
              </div>
              <h3 className="neu-title h5">Interactive Content</h3>
              <p>Engage with videos, quizzes, and interactive assignments to reinforce your knowledge.</p>
            </div>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="neu-card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <ShieldCheck size={40} color="#ccac00" />
              </div>
              <h3 className="neu-title h5">Earn Certificates</h3>
              <p>Complete courses and earn golden certificates to showcase your new skills.</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
