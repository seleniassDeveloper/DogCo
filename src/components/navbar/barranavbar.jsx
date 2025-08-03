import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ajusta el path si es necesario
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Barranavbar = () => {
    const { cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await cerrarSesion();
            navigate('/'); // o donde quieras redirigir al cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <h1 className="titleNavbar">DogCo</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <NavDropdown title="User" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={() => navigate('/Perfil')} href="#action4">Perfil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button className='botonsearch'>🔍</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};