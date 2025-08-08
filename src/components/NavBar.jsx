import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from "./CartWidget";


export const NavBar = () => { 
    return (  
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Tienda Yanu</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/category/celulares">Celulares</Nav.Link>
            <Nav.Link as={NavLink} to="/category/monitor">Monitores</Nav.Link>
            <Nav.Link as={NavLink} to="/category/tablet">Tablets</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    );
  };
