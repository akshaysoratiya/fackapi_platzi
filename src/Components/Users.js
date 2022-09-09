import React, { useEffect, useState } from 'react'
import Template from './Template';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Users() {
    let navigate = useNavigate();

    const [user, setUserData] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            const user = await axios.get('https://api.escuelajs.co/api/v1/users')
            setUserData(user.data);
        }
        fetchAssets();
    }, [])
    return (
        <>
            <Template />
            <div className="my-container">
                <Button style={{ marginLeft: '85%', marginbottom: '10px' }} variant="secondary" onClick={() => navigate('/adduser')} >Add User</Button>
                <Container>
                    <Row>
                        {user.map(post =>
                            <Col className="m-3">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={post.avatar} />
                                    <Card.Body>
                                        <Card.Title>{post.name}</Card.Title>
                                        <Card.Text>{post.role}</Card.Text>
                                        {/* <Button variant="primary">Go somewhere</Button> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default Users