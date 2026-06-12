import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { User, Save } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { user, updateProfile, loading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    class: '',
    address: '',
    city: ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        collegeName: user.collegeName || '',
        class: user.class || '',
        address: user.address || '',
        city: user.city || ''
      });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const res = await updateProfile(formData);
    if (res.success) {
      setSuccessMsg('Profile updated successfully!');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="neu-box p-5">
            <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', backgroundColor: '#e0e5ec', boxShadow: '5px 5px 10px rgba(163,177,198,0.5), -5px -5px 10px rgba(255,255,255,0.7)' }}>
                <User size={30} color="#ccac00" />
              </div>
              <div>
                <h2 className="neu-title mb-0">My Profile</h2>
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>

            {error && (
              <Alert variant="danger" className="neu-box mb-4" style={{ backgroundColor: '#f8d7da', color: '#842029' }}>
                {error}
              </Alert>
            )}

            {successMsg && (
              <Alert variant="success" className="neu-box mb-4" style={{ backgroundColor: '#d1e7dd', color: '#0f5132' }}>
                {successMsg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} className="neu-input" />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">College Name</Form.Label>
                    <Form.Control type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="neu-input" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Class/Year</Form.Label>
                    <Form.Control type="text" name="class" value={formData.class} onChange={handleChange} className="neu-input" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} className="neu-input" />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-bold">City</Form.Label>
                <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} className="neu-input" />
              </Form.Group>

              <div className="text-end">
                <button type="submit" disabled={loading} className="neu-btn neu-btn-primary px-4 py-2">
                  <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
