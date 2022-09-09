import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function AddCategories() {


    let navigate = useNavigate();
    const [Name, setName] = useState();
    const [image, setImage] = useState();
    const [add, setAdded] = useState([]);

    const addCategories = async () => {
        const url = `https://api.escuelajs.co/api/v1/categories/`;
        // console.log("obj", {
        //     "name": Name,
        //     "images": [image]
        // });
        // return false
        axios.post(url, {
            "name": Name,
            "images": [image]
        }).then((responce) => setAdded(responce.data))
        Swal.fire(
            'successfully!',
            'Categories add successfully.',
            'success'
        )
        navigate('/categories')
    };
    console.log('add', add);

    return (
        <div>
            <Container className="p-4">
                <h1 className="text-center">Add Categories</h1>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>images URL</Form.Label>
                                <Form.Control name="images" type="text" placeholder="images URL" onChange={(e) => { setImage(e.target.value) }} />
                            </Form.Group>
                            <Button variant="primary" onClick={() => addCategories()}>
                                Add Categories
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddCategories