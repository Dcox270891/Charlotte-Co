import React from "react";
import Nav from "../Nav/Nav";
import {Navbar} from "react-bootstrap";

function Header(){

    return (<>
        <Navbar fill
        sticky="top">
            <Navbar.Brand href="/">Stable Creations</Navbar.Brand>
            <Nav/>
        </Navbar>
    </>)
}

export default Header;