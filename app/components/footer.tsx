"use client";

import Container from "react-bootstrap/Container";

function FooterBootstrap() {
    return (
        <footer className="custom-footer">
            <Container>
                <p className="footer-text">&copy; {new Date().getFullYear()} 3050 Wetterdaten-App</p>
            </Container>
        </footer>
    );
}

export default FooterBootstrap;
