import React, { useEffect, useState } from 'react'
import Template from './Template';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';


function Dashbord() {

    const [usercount, setUserCount] = useState('');
    const [productcount, setProductsCount] = useState('');
    const [categoriescount, setCategoriesCount] = useState('');
    // const [username, setUsername] = useState('');
    const username = localStorage.getItem('email');


    useEffect(() => {
        const fetchAssets = async () => {
            const user = await axios.get('https://api.escuelajs.co/api/v1/users')
            setUserCount(user.data.length);

            const products = await axios.get('https://api.escuelajs.co/api/v1/products')
            setProductsCount(products.data.length);

            const categories = await axios.get('https://api.escuelajs.co/api/v1/categories')
            setCategoriesCount(categories.data.length);

            // const usern = await axios.get('https://api.escuelajs.co/api/v1/auth/profile')
            // setUsername(usern.data);
        }
        fetchAssets();
    }, [])


    console.log(username);
    return (
        <>
            <Template />

            <div className="my-container">

                <Container className="container-fluid">
                    <Row className="row">
                        <Col className="p-3">
                            <Card>
                                <Card.Header as="h5">Users</Card.Header>
                                <Card.Body>
                                    <Card.Title> {usercount}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-3">
                            <Card>
                                <Card.Header as="h5">Products</Card.Header>
                                <Card.Body>
                                    <Card.Title> {productcount}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-3">
                            <Card>
                                <Card.Header as="h5">Categories</Card.Header>
                                <Card.Body>
                                    <Card.Title> {categoriescount}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default Dashbord