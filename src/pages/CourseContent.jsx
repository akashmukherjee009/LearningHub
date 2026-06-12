import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { PlayCircle, CheckCircle, HelpCircle, ArrowLeft } from 'lucide-react';

function CourseContent() {
  const { id } = useParams();

  return (
    <div>
      <div className="mb-4">
        <Link to={`/courses/${id}`} className="neu-btn neu-btn-secondary" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Overview
        </Link>
      </div>

      <Row>
        {/* Sidebar */}
        <Col lg={4} className="mb-4">
          <div className="neu-card h-100">
            <div className="card-body p-0">
              <h4 className="neu-title p-4 mb-0 border-bottom" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                Course Modules
              </h4>
              <ListGroup variant="flush" style={{ backgroundColor: 'transparent' }}>
                <ListGroup.Item className="py-3 px-4 d-flex align-items-center gap-3" style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <CheckCircle size={20} color="#28a745" />
                  <div>
                    <h6 className="mb-0">1. The Golden Ratio in Colors</h6>
                    <small className="text-muted">15 min</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="py-3 px-4 d-flex align-items-center gap-3" style={{ backgroundColor: '#e0e5ec', boxShadow: 'inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.7)', borderLeft: '4px solid #ffd700', cursor: 'pointer' }}>
                  <PlayCircle size={20} color="#ccac00" />
                  <div>
                    <h6 className="mb-0 fw-bold text-dark">2. Understanding Neumorphism</h6>
                    <small className="text-muted">25 min</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="py-3 px-4 d-flex align-items-center gap-3" style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <PlayCircle size={20} className="text-muted" />
                  <div>
                    <h6 className="mb-0 text-muted">3. Building Soft Shadows</h6>
                    <small className="text-muted">30 min</small>
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <div className="p-4 mt-auto">
                <div className="neu-progress mb-2">
                  <div className="neu-progress-bar" style={{ width: '40%' }}></div>
                </div>
                <small className="text-muted d-block text-center">40% Completed</small>
              </div>
            </div>
          </div>
        </Col>

        {/* Main Content Area */}
        <Col lg={8}>
          <div className="neu-box h-100 d-flex flex-column">
            <h2 className="neu-title mb-4">Understanding Neumorphism</h2>
            
            {/* Video Placeholder */}
            <div className="neu-card flex-grow-1 mb-4 d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '400px', backgroundColor: '#d0d5dc' }}>
              <PlayCircle size={64} color="#ccac00" className="mb-3" style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))', cursor: 'pointer' }} />
              <h4 className="text-muted">Click to Play Video</h4>
            </div>

            <div className="d-flex justify-content-between mt-auto pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
              <button className="neu-btn neu-btn-secondary">Previous</button>
              <Link to={`/courses/${id}/quiz`} className="neu-btn neu-btn-primary">
                <HelpCircle size={18} /> Take Quiz
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CourseContent;
