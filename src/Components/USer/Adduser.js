import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Adduser() {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [image, setImage] = useState();
    const [password, setPassword] = useState();
    const [add, setAdded] = useState([]);

    const adduser = async () => {
        const url = `https://api.escuelajs.co/api/v1/users/`;
        // console.log("obj", {
        //     "name": name,
        //     "email": email,
        //     "password": password,
        //     "avatar": [image]
        // });
        // return false
        axios.post(url, {
            "name": name,
            "email": email,
            "password": password,
            "avatar": [image]
        }).then((responce) => setAdded(responce.data))
        Swal.fire(
            'successfully!',
            'user add successfully.',
            'success'
        )
        navigate('/')
    };
    return (
        <div> <Container className="p-4">
            <h1 className="text-center">Add User</h1>
            <Row className="justify-content-center">
                <Col className="col-md-6">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>images URL</Form.Label>
                            <Form.Control name="images" type="text" placeholder="images URl" onChange={(e) => setImage(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => adduser()}>
                            Add USer
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container></div>
    )
}

export default Adduser