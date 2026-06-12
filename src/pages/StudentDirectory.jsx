import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Users, GraduationCap, MapPin } from 'lucide-react';

function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="py-4">
      <div className="mb-5">
        <h2 className="neu-title mb-2 d-flex align-items-center gap-2">
          <Users size={28} color="#ccac00" />
          Student Directory
        </h2>
        <p className="text-muted mb-0">Connect with other learners on the platform</p>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="neu-box">
          {error}
        </Alert>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="text-center py-5 neu-box">
          <p className="text-muted mb-0">No students found.</p>
        </div>
      )}

      <Row>
        {!loading && !error && students.map((student) => (
          <Col md={6} lg={4} key={student._id} className="mb-4">
            <div className="neu-card h-100 p-4">
              <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: '#e0e5ec', boxShadow: 'inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.7)', fontSize: '1.2rem', fontWeight: 'bold', color: '#ccac00' }}>
                  {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">{student.name}</h5>
                  <small className="text-muted">{student.email}</small>
                </div>
              </div>
              
              <div className="mb-2 d-flex align-items-center gap-2 text-muted">
                <GraduationCap size={16} />
                <span>{student.collegeName || 'N/A'} - {student.class || 'N/A'}</span>
              </div>
              
              <div className="d-flex align-items-center gap-2 text-muted">
                <MapPin size={16} />
                <span>{student.city || 'N/A'}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StudentDirectory;
