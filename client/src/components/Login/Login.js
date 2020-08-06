import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from "../../utils/API";
import {UserContext} from "../../UserContext";
import { Modal, Form, Button, Alert } from "react-bootstrap";


function Login(){
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState(""); 
    const [ show, setShow ] = useState(false);
    const [ error, setError ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function loginLocalUser(e){
        e.preventDefault();
        API.loginUser(email, password)
            .then(res => {
                setError(false);
                setLoggedOnUser(res.data);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            });
    };

    return (<>
        <Button variant="primary" onClick={handleShow}>
            Login
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log in ..</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(error)?(
                    <Alert variant="danger">
                        Something went wrong, Make sure you have input the correct information.
                    </Alert>
                ):("")}
                <Form>
                    <Form.Group controlId="email"
                    onChange={e => {setEmail(e.target.value)}}>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email"
                        placeholder="Email Address"/>
                    </Form.Group>
                    <Form.Group controlId="password"
                    onChange={e => setPassword(e.target.value)}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light"
                onClick={e => loginLocalUser(e)}>
                    Log in 
                </Button>
                <Button variant="light">
                    <Link to="/signup">Sign Up</Link>
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default Login;