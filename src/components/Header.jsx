import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, Home as HomeIcon, Users, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="neu-nav mb-4" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="neu-title d-flex align-items-center gap-2">
          <BookOpen size={24} color="#ccac00" />
          LearnGold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="neu-nav-link d-flex align-items-center gap-1">
              <HomeIcon size={18} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="neu-nav-link d-flex align-items-center gap-1">
              <BookOpen size={18} /> Courses
            </Nav.Link>
            
            {user ? (
              <>
                <Nav.Link as={Link} to="/directory" className="neu-nav-link d-flex align-items-center gap-1">
                  <Users size={18} /> Directory
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="neu-nav-link d-flex align-items-center gap-1">
                  <User size={18} /> Profile
                </Nav.Link>
                <Button variant="link" onClick={handleLogout} className="neu-nav-link d-flex align-items-center gap-1 text-decoration-none">
                  <LogOut size={18} /> Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/auth" className="neu-nav-link d-flex align-items-center gap-1">
                <User size={18} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
