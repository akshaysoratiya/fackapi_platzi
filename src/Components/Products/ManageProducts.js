import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';




function ManageProducts() {
    let navigate = useNavigate();
    let { search } = useLocation()
    let { id } = queryString.parse(search)
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [categoryId, setcacategoryId] = useState();
    const [image, setImage] = useState();
    const [add, setAdded] = useState([]);
    const [update, setUpdate] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();




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
        }).then((responce) => setUpdate(responce.data))
        Swal.fire(
            'successfully!',
            'Product Update successfully.',
            'success'
        )
        navigate('/products')
    };
    console.log(id);
    return (
        <div>
            <Container className="p-4">
                <h1 className="text-center">{!id ? 'Add Product' : 'Edit Product'}</h1>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Form onSubmit={handleSubmit(addproducts)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="Title" {...register('title', { required: true })} onChange={(e) => setTitle(e.target.value)} />
                                {errors.title && <p className="text-danger">Title is required.</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price" type="number" placeholder="Price" {...register('price', { required: true })} onChange={(e) => setPrice(e.target.value)} />
                                {errors.price && <p className="text-danger">Price is required.</p>}
                            </Form.Group>
                            {!id && <><Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" type="text" placeholder="Description" {...register('description', { required: true })} onChange={(e) => setDescription(e.target.value)} />
                                {errors.description && <p className="text-danger">Description is required.</p>}
                            </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>CategoryId</Form.Label>
                                    <Form.Control name="categoryId" type="number" placeholder="CategoryId" {...register('categoryId', { required: true })} onChange={(e) => setcacategoryId(e.target.value)} />
                                    {errors.categoryId && <p className="text-danger">CategoryId is required.</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>images URL</Form.Label>
                                    <Form.Control name="images" type="text" placeholder="images URl"  {...register('images', { required: true })} onChange={(e) => setImage(e.target.value)} />
                                    {errors.images && <p className="text-danger">Image URL is required.</p>}
                                </Form.Group></>}

                            {!id && <><Button type="submit" variant="primary" onClick={() => addproducts()}>
                                Add Products
                            </Button></>}
                            {id && <><Button type="submit" variant="primary" onClick={() => updateproduct()}>
                                Update Products
                            </Button></>}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default ManageProducts