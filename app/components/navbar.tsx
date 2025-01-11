'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarBootstrap() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">3050 Wetterdaten-App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/map">Karte</Nav.Link>
                    <Nav.Link href="/table">Tabelle</Nav.Link>
                    <Nav.Link href="/chart">Wetter</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}