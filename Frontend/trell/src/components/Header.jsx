import { Container, Navbar } from "react-bootstrap";
import React from "react";
import logo from "../logo.png";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Trell
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
