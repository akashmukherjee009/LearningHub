import React, { useState, useContext } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegeName: '',
    class: '',
    address: '',
    city: ''
  });
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (isLogin) {
      if (!formData.email || !formData.password) return setLocalError('Email and password required');
      const res = await login(formData.email, formData.password);
      if (res.success) navigate('/profile');
    } else {
      if (!formData.name || !formData.email || !formData.password) return setLocalError('Name, email, and password required');
      const res = await register(formData);
      if (res.success) navigate('/profile');
    }
  };

  return (
    <Row className="justify-content-center py-5">
      <Col md={8} lg={6}>
        <div className="neu-box p-5">
          <div className="text-center mb-4">
            <h2 className="neu-title">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
            <p className="text-muted">
              {isLogin ? 'Login to continue your learning journey' : 'Join us and start learning today'}
            </p>
          </div>

          {(error || localError) && (
            <Alert variant="danger" className="neu-box mb-4" style={{ backgroundColor: '#f8d7da', color: '#842029' }}>
              {error || localError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="neu-input" />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>College Name</Form.Label>
                      <Form.Control type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="e.g. ABC College" className="neu-input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Class/Year</Form.Label>
                      <Form.Control type="text" name="class" value={formData.class} onChange={handleChange} placeholder="e.g. BCA 2nd Year" className="neu-input" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" className="neu-input" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="neu-input" />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" className="neu-input" />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="neu-input" />
            </Form.Group>

            <button type="submit" disabled={loading} className="neu-btn neu-btn-primary w-100 mb-4">
              {loading ? 'Processing...' : (isLogin ? <><LogIn size={18} /> Login</> : <><UserPlus size={18} /> Register</>)}
            </button>

            <div className="text-center">
              <p className="mb-0">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none neu-title p-0"
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={loading}
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Auth;
