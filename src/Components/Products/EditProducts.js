import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import queryString from 'query-string';
import { useForm } from 'react-hook-form';





function EditProducts() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    let navigate = useNavigate();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [add, setAdded] = useState([]);
    const [fetch, setFetch] = useState([]);
    let { search } = useLocation()
    let { id } = queryString.parse(search)


    console.log();
    const updateproduct = async () => {
        const url = `https://api.escuelajs.co/api/v1/products/${id}`;
        // console.log("obj", {
        //     "title": title,
        //     "price": parseInt(price)
        // });
        // return false
        axios.put(url, {
            "title": title,
            "price": parseInt(price)
        }).then((responce) => setAdded(responce.data))
        console.log('title', title, price);
        Swal.fire(
            'successfully!',
            'Product Update successfully.',
            'success'
        )
        navigate('/products')
    };
    console.log('added', add);

    useEffect(() => {
        const fetchAssets = async () => {
            const url = `https://api.escuelajs.co/api/v1/products/${id}`;
            axios.put(url).then((responce) => setFetch(responce.data))
        };
        fetchAssets();
    }, [])
    console.log(fetch);
    return (
        <div>
            <div>
                <Container className="p-4">
                    <h1 className="text-center">Update Product</h1>
                    <Row className="justify-content-center">
                        <Col className="col-md-6">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control defaultValue={fetch.title} placeholder="Enter Title" name="title" type="text" onChange={(e) => { setTitle(e.target.value) }} />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control name="price" type="number" defaultValue={fetch.price} placeholder="Enter Price" onChange={(e) => { setPrice(e.target.value) }} />

                                </Form.Group>
                                <Button variant="primary" onClick={() => updateproduct()}>
                                    Update Products
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default EditProducts