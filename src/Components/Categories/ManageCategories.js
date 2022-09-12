import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import Swal from "sweetalert2";



function ManageCategories() {

    let navigate = useNavigate();
    let { search } = useLocation()
    let { id } = queryString.parse(search)
    const [Name, setName] = useState();
    const [image, setImage] = useState();
    const [add, setAdded] = useState([]);
    const [fetch, setFetch] = useState([]);


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
    const manageCategories = async () => {
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
    const updateCategories = async () => {
        const url = `https://api.escuelajs.co/api/v1/categories/${id}`;
        axios.put(url, {
            "name": Name,
        }).then((responce) => setAdded(responce.data))
        Swal.fire(
            'successfully!',
            'Categories add successfully.',
            'success'
        )
        navigate('/categories')
    };
    useEffect(() => {
        const fetchAssets = async () => {
            const url = `https://api.escuelajs.co/api/v1/categories/${id}`;
            axios.put(url).then((responce) => setFetch(responce.data))
        };
        fetchAssets();
    }, [])
    return (
        <div>
            <Container className="p-4">
                <h1 className="text-center">{!id ? 'Add Categories' : 'Edit Categories'}</h1>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control defaultValue={fetch.name} name="name" type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>
                            {!id && <><Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>images URL</Form.Label>
                                <Form.Control name="images" type="text" placeholder="images URL" onChange={(e) => { setImage(e.target.value) }} />
                            </Form.Group>
                                <Button variant="primary" onClick={() => addCategories()}>
                                    Add Categories
                                </Button></>}
                            {id && <><Button variant="primary" onClick={() => updateCategories()}>
                                Update Categories
                            </Button></>}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ManageCategories