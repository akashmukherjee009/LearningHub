import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookOpen, User, Home as HomeIcon } from 'lucide-react';

function Header() {
  return (
    <Navbar expand="lg" className="neu-nav mb-4" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="neu-title d-flex align-items-center gap-2">
          <BookOpen size={24} color="#ccac00" />
          LearnGold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="neu-nav-link d-flex align-items-center gap-1">
              <HomeIcon size={18} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="neu-nav-link d-flex align-items-center gap-1">
              <BookOpen size={18} /> Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/auth" className="neu-nav-link d-flex align-items-center gap-1">
              <User size={18} /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
