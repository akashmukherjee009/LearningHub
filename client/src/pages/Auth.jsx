import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { LogIn, UserPlus } from 'lucide-react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Row className="justify-content-center py-5">
      <Col md={6} lg={5}>
        <div className="neu-box p-5">
          <div className="text-center mb-4">
            <h2 className="neu-title">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
            <p className="text-muted">
              {isLogin ? 'Login to continue your learning journey' : 'Join us and start learning today'}
            </p>
          </div>

          <Form>
            {!isLogin && (
              <Form.Group className="mb-4">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" className="neu-input" />
              </Form.Group>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" className="neu-input" />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" className="neu-input" />
            </Form.Group>

            <button type="button" className="neu-btn neu-btn-primary w-100 mb-4">
              {isLogin ? <><LogIn size={18} /> Login</> : <><UserPlus size={18} /> Register</>}
            </button>

            <div className="text-center">
              <p className="mb-0">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none neu-title p-0"
                  onClick={() => setIsLogin(!isLogin)}
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
