import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";





function AddProducts() {

    let navigate = useNavigate();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [categoryId, setcacategoryId] = useState();
    const [image, setImage] = useState();
    const [add, setAdded] = useState([]);


    const addproducts = async () => {
        const url = `https://api.escuelajs.co/api/v1/products/`;
        // console.log("obj", {
        //     "title": title,
        //     "price": parseInt(price),
        //     "description": description,
        //     "categoryId": parseInt(categoryId),
        //     "images": [image]
        // });
        // return false
        axios.post(url, {
            "title": title,
            "price": parseInt(price),
            "description": description,
            "categoryId": parseInt(categoryId),
            "images": [image]
        }).then((responce) => setAdded(responce.data))
        Swal.fire(
            'successfully!',
            'Product add successfully.',
            'success'
        )
        navigate('/products')
    };
    console.log(price);

    return (
        <div>
            <Container className="p-4">
                <h1 className="text-center">Add Product</h1>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price" type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>CategoryId</Form.Label>
                                <Form.Control name="categoryId" type="number" placeholder="CategoryId" onChange={(e) => setcacategoryId(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>images URL</Form.Label>
                                <Form.Control name="images" type="text" placeholder="images URl" onChange={(e) => setImage(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" onClick={() => addproducts()}>
                                Add Products
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddProducts