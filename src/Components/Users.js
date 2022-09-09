import React, { useEffect, useState } from 'react'
import Template from './Template';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


function Users() {
    let navigate = useNavigate();

    const [user, setUserData] = useState([]);
    const [add, setAdded] = useState([]);


    useEffect(() => {
        const fetchAssets = async () => {
            const user = await axios.get('https://api.escuelajs.co/api/v1/users')
            setUserData(user.data);
        }
        fetchAssets();
    }, [])

    const adduser = async () => {
        Swal.fire({
            title: 'Add Product',
            html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
                   <input type="email" id="email" class="swal2-input" placeholder="Email">
                   <input type="password" id="password" class="swal2-input" placeholder="Password">
                   <input type="text" id="imgurl" class="swal2-input" placeholder="ImageURL">`,
            confirmButtonText: 'Add',
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value
                const email = Swal.getPopup().querySelector('#email').value
                const password = Swal.getPopup().querySelector('#password').value
                const imgurl = Swal.getPopup().querySelector('#imgurl').value
                if (!name || !email || !password || !imgurl) {
                    Swal.showValidationMessage(`Please enter all Details`)
                }
                return { name: name, email: email, password: password, imgurl: imgurl }
            }
        }).then((result) => {
            const url = `https://api.escuelajs.co/api/v1/users/`;
            // console.log("obj", {
            //     "name": result.value.name,
            //     "email": result.value.email,
            //     "password": result.value.password,
            //     "avatar": [result.image]
            // });
            // return false
            axios.post(url, {
                "name": result.value.name,
                "email": result.value.email,
                "password": result.value.password,
                "avatar": [result.value.imgurl]
            }).then((responce) => setAdded(responce.data))
            Swal.fire(
                'User add successfully.',
                'successfully.',
                'success'
            )
            //             Swal.fire(`
            //     Title: ${result.value.title}
            //     Description: ${result.value.description}
            //     Price: ${result.value.price}
            //     Category: ${result.value.category}
            //   `.trim())
        })
    }
    return (
        <>
            <Template />
            <div className="my-container">
                <Button style={{ marginLeft: '85%', marginbottom: '10px' }} variant="secondary" onClick={() => adduser()} >Add User</Button>
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