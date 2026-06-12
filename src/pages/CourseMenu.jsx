import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';

const courses = [
  { id: 'aiml', title: 'AI & Machine Learning', duration: '10 hours', rating: 4.9, level: 'Advanced', img: 'https://cdn3d.iconscout.com/3d/premium/thumb/artificial-intelligence-4996165-4159521.png' },
  { id: 'iot', title: 'Internet of Things (IoT)', duration: '8 hours', rating: 4.8, level: 'Intermediate', img: 'https://cdn3d.iconscout.com/3d/premium/thumb/iot-4996166-4159522.png' },
  { id: 'python', title: 'Python Programming', duration: '12 hours', rating: 4.9, level: 'Beginner', img: 'https://cdn3d.iconscout.com/3d/premium/thumb/python-4996167-4159523.png' },
  { id: 'react-native', title: 'React Native Mobile App', duration: '15 hours', rating: 4.7, level: 'Intermediate', img: 'https://cdn3d.iconscout.com/3d/premium/thumb/react-4996163-4159519.png' },
];

function CourseMenu() {
  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <h2 className="neu-title mb-2">Available Courses</h2>
          <p className="text-muted mb-0">Discover and master new skills</p>
        </div>
      </div>

      <Row>
        {courses.map(course => (
          <Col md={6} lg={4} key={course.id} className="mb-4">
            <div className="neu-card h-100 d-flex flex-column">
              <div className="p-4 text-center pb-0">
                <img src={course.img} alt={course.title} className="img-fluid mb-3" style={{ height: '150px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.1))' }} />
              </div>
              <div className="card-body d-flex flex-column flex-grow-1 pt-0">
                <div className="d-flex justify-content-between mb-2">
                  <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2" style={{boxShadow: '2px 2px 5px rgba(204,172,0,0.3)'}}>{course.level}</Badge>
                  <span className="d-flex align-items-center gap-1 text-warning fw-bold">
                    <Star size={16} fill="#ffd700" /> {course.rating}
                  </span>
                </div>
                <h4 className="neu-title h5 mt-2 mb-3">{course.title}</h4>
                <div className="d-flex align-items-center gap-2 text-muted mb-4 mt-auto">
                  <Clock size={16} /> {course.duration}
                </div>
                <Link to={`/courses/${course.id}`} className="neu-btn neu-btn-primary w-100">
                  View Course
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CourseMenu;
