import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';



function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();



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
                        <Form onSubmit={handleSubmit(login)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" {...register('email', { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && errors.email.type === "required" && (
                                    <p className="text-danger">Email is required.</p>
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <p className="text-danger">Email is not valid.</p>
                                )}
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" {...register('password', { required: true, minLength: 6 })} onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && errors.password.type === "required" && (
                                    <p className="text-danger">Password is required.</p>
                                )}
                                {errors.password && errors.password.type === "minLength" && (
                                    <p className="text-danger">Password minlength is 6</p>
                                )}
                            </Form.Group>
                            <Button type="submit" variant="primary" onClick={() => login()}>
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