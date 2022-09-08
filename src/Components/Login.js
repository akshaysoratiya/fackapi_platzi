import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [data, setData] = useState([]);


    const login = async () => {
        const url = 'https://api.escuelajs.co/api/v1/auth/login';
        await axios.post(url, {
            "email": email,
            "password": password,
        }).then(response => setData(response.data.access_token));
        localStorage.setItem('email', email);
        localStorage.setItem('token', data);
        console.log('token:', data)
        // navigate('/')
        const myTimeout = setTimeout(() => {
            navigate('/')
        }, 1000);
    };

    return (
        <div>
            <Container className="p-4">
                <h1 className="text-center">Login Here</h1>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" onClick={() => login()}>
                                Sing IN
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login