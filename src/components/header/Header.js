import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrailer } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";


const Header = () => {
 
return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ marginTop: 0, paddingTop: 0 }}>
        <Container fluid>
            <Navbar.Brand href="/" style={{"color":'orange', borderTopWidth : 0, backgroundColor : 'dark'}}>
            <FontAwesomeIcon icon={faTrailer} /> iReviews
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Home 🏠</NavLink>
                    <NavLink className ="nav-link" to="/about-me">About me 📍</NavLink>
                     
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header