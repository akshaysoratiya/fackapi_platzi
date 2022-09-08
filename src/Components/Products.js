import React, { useEffect, useState } from 'react'
import Template from './Template';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



function Products() {
    let navigate = useNavigate();
    const [product, setProductData] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            const user = await axios.get('https://api.escuelajs.co/api/v1/products')
            setProductData(user.data);
        }
        fetchAssets();
    }, [])

    const deletedata = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };


    return (
        <>
            <Template />
            <div className="my-container">
                <Button style={{ marginLeft: '85%', marginbottom: '10px' }} variant="secondary" onClick={() => navigate('/addproducts')}>Add Product</Button>
                <Container className="mt-3">
                    <Row>
                        {product.map(post =>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={post.category.image} />
                                    <Card.Body>
                                        <Card.Title> <strong> Title : </strong> {post.title}</Card.Title>
                                        <Card.Text> <strong> Description : </strong> {post.description}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item> <strong> Price :  </strong> {post.price}</ListGroup.Item>
                                        <ListGroup.Item> <strong> Category : </strong> {post.category.name}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button className="m-2" variant="primary" onClick={() => navigate(`/editproducts?id=${post.id}`)}>Update</Button>
                                        <Button className="mr-gap-2" variant="danger" onClick={() => deletedata()}>Delete</Button>
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

export default Products




// Swal.fire({
//     title: 'Add Product',
//     html: `<input type="text" id="title" class="swal2-input" placeholder="Title">
//   <input type="number" id="price" class="swal2-input" placeholder="Price"> <input type="text" id="description" class="swal2-input" placeholder="Description"> <input type="text" id="category" class="swal2-input" placeholder="Category">`,
//     confirmButtonText: 'Add',
//     focusConfirm: false,
//     preConfirm: () => {
//         const title = Swal.getPopup().querySelector('#title').value
//         const description = Swal.getPopup().querySelector('#description').value
//         const price = Swal.getPopup().querySelector('#price').value
//         const category = Swal.getPopup().querySelector('#category').value
//         if (!title || !price || !description || !category) {
//             Swal.showValidationMessage(`Please enter all Details`)
//         }
//         return { title: title, price: price, description: description, category: category }
//     }
// }).then((result) => {
//     Swal.fire(`
//     Title: ${result.value.title}
//     Description: ${result.value.description}
//     Price: ${result.value.price}
//     Category: ${result.value.category}
//   `.trim())
// })