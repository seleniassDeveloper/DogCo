import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../css/Navbar.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { MensajesDropdown } from './MensajesDropdownBootstrap';

export const Barranavbar = ({ usuario, threads = [], onOpenChat, onMarkRead }) => {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try { await cerrarSesion(); navigate('/'); }
    catch (error) { console.error('Error al cerrar sesión:', error); }
  };

  const handleClickDash = () => {
    navigate('/HomeDueno')
  }

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid className='d-flex'>
        <Navbar.Brand href="#"><h1 className="logo" onClick={() => handleClickDash()}>DogCo</h1></Navbar.Brand>

        <div>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Nav navbarScroll>
              <MensajesDropdown
                threads={threads}
                onOpenChat={onOpenChat}
                onMarkRead={onMarkRead}
              />

              <NavDropdown title={usuario?.nombreCompleto || 'User'} id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate('/Perfil')}>Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" aria-label="Search" />
              <Button className="botonsearch">🔍</Button>
            </Form>
          </Navbar.Collapse>
        </div>

      </Container>
    </Navbar>
  );
};