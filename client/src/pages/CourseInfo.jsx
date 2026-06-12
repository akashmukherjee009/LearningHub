import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Play, CheckCircle, Clock, BookOpen } from 'lucide-react';

function CourseInfo() {
  const { id } = useParams();

  const courseDatabase = {
    'aiml': {
      title: 'AI & Machine Learning',
      description: 'Master the fundamentals of Artificial Intelligence and Machine Learning. Learn how to build predictive models and neural networks.',
      instructor: 'Dr. Alan Turing',
      duration: '10 hours',
      level: 'Advanced',
      img: 'https://cdn3d.iconscout.com/3d/premium/thumb/artificial-intelligence-4996165-4159521.png',
      modules: [
        { id: 1, title: 'Introduction to AI', duration: '45 min' },
        { id: 2, title: 'Supervised Learning', duration: '60 min' },
        { id: 3, title: 'Neural Networks Basics', duration: '90 min' },
        { id: 4, title: 'Deep Learning', duration: '120 min' },
        { id: 5, title: 'Final AI Project', duration: '60 min' }
      ]
    },
    'iot': {
      title: 'Internet of Things (IoT)',
      description: 'Explore the world of connected devices. Learn to program microcontrollers and connect them to cloud services.',
      instructor: 'Sarah Connor',
      duration: '8 hours',
      level: 'Intermediate',
      img: 'https://cdn3d.iconscout.com/3d/premium/thumb/iot-4996166-4159522.png',
      modules: [
        { id: 1, title: 'What is IoT?', duration: '30 min' },
        { id: 2, title: 'Sensors and Actuators', duration: '45 min' },
        { id: 3, title: 'Connecting to WiFi', duration: '60 min' },
        { id: 4, title: 'Cloud Data Storage', duration: '60 min' },
        { id: 5, title: 'Building a Smart Home Device', duration: '90 min' }
      ]
    },
    'python': {
      title: 'Python Programming',
      description: 'A comprehensive guide to Python programming. Start from variables and loops and go all the way to object-oriented programming.',
      instructor: 'Guido van Rossum',
      duration: '12 hours',
      level: 'Beginner',
      img: 'https://cdn3d.iconscout.com/3d/premium/thumb/python-4996167-4159523.png',
      modules: [
        { id: 1, title: 'Python Basics', duration: '60 min' },
        { id: 2, title: 'Data Structures', duration: '90 min' },
        { id: 3, title: 'Functions and Modules', duration: '60 min' },
        { id: 4, title: 'Object-Oriented Python', duration: '120 min' },
        { id: 5, title: 'Web Scraping Project', duration: '90 min' }
      ]
    },
    'react-native': {
      title: 'React Native Mobile App',
      description: 'Learn to build native mobile applications for iOS and Android using React and JavaScript.',
      instructor: 'Jordan Walke',
      duration: '15 hours',
      level: 'Intermediate',
      img: 'https://cdn3d.iconscout.com/3d/premium/thumb/react-4996163-4159519.png',
      modules: [
        { id: 1, title: 'React Native Basics', duration: '60 min' },
        { id: 2, title: 'Layout with Flexbox', duration: '45 min' },
        { id: 3, title: 'Navigation', duration: '90 min' },
        { id: 4, title: 'Device APIs (Camera, Location)', duration: '120 min' },
        { id: 5, title: 'Publishing to App Store', duration: '60 min' }
      ]
    }
  };

  const course = courseDatabase[id] || courseDatabase['aiml']; // Fallback if not found

  return (
    <div className="py-4">
      <div className="neu-box mb-5">
        <Row className="align-items-center">
          <Col md={8}>
            <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2 mb-3 d-inline-block">{course.level}</Badge>
            <h1 className="neu-title mb-3">{course.title}</h1>
            <p className="lead mb-4">{course.description}</p>
            <div className="d-flex gap-4 text-muted mb-4">
              <span className="d-flex align-items-center gap-2"><BookOpen size={18}/> By {course.instructor}</span>
              <span className="d-flex align-items-center gap-2"><Clock size={18}/> {course.duration}</span>
            </div>
            <Link to={`/courses/${id}/content`} className="neu-btn neu-btn-primary px-4 py-2" style={{ fontSize: '1.2rem' }}>
              <Play size={20} /> Enroll & Start
            </Link>
          </Col>
          <Col md={4} className="text-center d-none d-md-block">
            <img 
              src={course.img} 
              alt="Course cover" 
              className="img-fluid"
              style={{ maxHeight: '200px', filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.1))' }}
            />
          </Col>
        </Row>
      </div>

      <h3 className="neu-title mb-4">Course Content</h3>
      <div className="neu-card">
        <ListGroup variant="flush" style={{ backgroundColor: 'transparent' }}>
          {course.modules.map((mod, index) => (
            <ListGroup.Item 
              key={mod.id} 
              className="d-flex justify-content-between align-items-center py-4"
              style={{ backgroundColor: 'transparent', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#e0e5ec', boxShadow: 'inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.7)', fontWeight: 'bold' }}>
                  {index + 1}
                </div>
                <h5 className="mb-0">{mod.title}</h5>
              </div>
              <div className="d-flex align-items-center gap-3 text-muted">
                <span>{mod.duration}</span>
                <Play size={20} color="#ccac00" style={{ cursor: 'pointer' }} />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

// Ensure Badge is imported
import { Badge } from 'react-bootstrap';

export default CourseInfo;
