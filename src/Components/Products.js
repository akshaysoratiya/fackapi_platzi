import React, { useCallback, useEffect, useState } from 'react'
import Template from './Template';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'debounce';
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import Pagination from "react-bootstrap/Pagination";
import '../Components/css/Pagination.css';
import AddProducts from './Products/AddProducts';





function Products() {
    let navigate = useNavigate();
    const [product, setProductData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [add, setAdded] = useState([]);
    const [update, setUpdate] = useState([]);
    let { search } = useLocation();
    let { page } = queryString.parse(search);

    console.log("addd data", add);
    console.log("update data", update);

    const fetchAssets = async () => {
        const user = await axios.get('https://api.escuelajs.co/api/v1/products')
        setProductData(user.data);
    }
    useEffect(() => {
        fetchAssets();
    }, [])

    const debouncedSave = useCallback(debounce((putdata) => setProductData(putdata), 800), [])

    const searchproducts = (e) => {
        const search = e.target.value;
        const putdata = product.filter(
            (iteams) =>
                iteams.title.toLowerCase().includes(search) ||
                iteams.category.name.toLowerCase().includes(search)
        );
        debouncedSave(putdata)
        fetchAssets();
    };

    const deletedata = () => {
        Swal.fire({
            title: 'Are you sure to delete Product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Product has been deleted successfully..',
                    'Deleted!',
                    'success'
                )
            }
        })
    };
    //Pagination
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = product
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((post) => {
            return (
                <Col>
                    <div className='my-4' >
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
                                    <Button className="m-2" variant="primary" onClick={() => updateproducts(post.id)}>Update</Button>
                                    <Button className="mr-gap-2" variant="danger" onClick={() => deletedata()}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                </Col>
            );
        });
    const pageCount = Math.ceil(product.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        navigate(`/products?offset=${selected + 1}&limit=${usersPerPage}`)
    };

    const addproducts = async () => {
        Swal.fire({
            title: 'Add Product',
            html: `<input type="text" id="title" class="swal2-input" placeholder="Enter Title">
                   <input type="number" id="price" class="swal2-input" placeholder="Enter Price"> <input type="text" id="description" class="swal2-input" placeholder="Enter Description"> <input type="number" id="categoryId" class="swal2-input" placeholder="Enter categoryId">`,
            confirmButtonText: 'Add Product',
            focusConfirm: false,
            preConfirm: () => {
                const title = Swal.getPopup().querySelector('#title').value
                const description = Swal.getPopup().querySelector('#description').value
                const price = Swal.getPopup().querySelector('#price').value
                const categoryId = Swal.getPopup().querySelector('#categoryId').value
                if (!title || !price || !description || !categoryId) {
                    Swal.showValidationMessage(`Please enter all Details`)
                }
                return { title: title, price: price, description: description, categoryId: categoryId }
            }
        }).then((result) => {
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
                "title": result.value.title,
                "price": parseInt(result.value.price),
                "description": result.value.description,
                "categoryId": parseInt(result.value.categoryId),
                "images": [result.value.image]
            }).then((responce) => setAdded(responce.data))
            Swal.fire(
                'Product add successfully.',
                'successfully!',
                'success'
            )
            fetchAssets();
        })
    }

    const updateproducts = async (e) => {
        Swal.fire({
            title: 'Update Product',
            html: `<input type="text" id="title" class="swal2-input" placeholder="Enter Title">
                    <input type="number" id="price" class="swal2-input" placeholder="Enter Price">`,
            confirmButtonText: 'Update Product',
            focusConfirm: false,
            preConfirm: () => {
                const title = Swal.getPopup().querySelector('#title').value
                const price = Swal.getPopup().querySelector('#price').value
                if (!title || !price) {
                    Swal.showValidationMessage(`Please enter all Details`)
                }
                return { title: title, price: price }
            }
        }).then((result) => {
            const url = `https://api.escuelajs.co/api/v1/products/${e}`;
            // console.log("obj", {
            //     "title": title,
            //     "price": parseInt(price)
            // });
            // return false
            axios.put(url, {
                "title": result.value.title,
                "price": parseInt(result.value.price)
            }).then((responce) => setUpdate(responce.data))
            Swal.fire(
                'Product Update successfully.',
                'successfully!',
                'success'
            )
            fetchAssets();
        })
    }

    return (
        <>
            <Template />
            <div className="my-container">
                <input onChange={searchproducts} type="text" placeholder="Search..." />
                <Button style={{ marginLeft: '85%', marginbottom: '10px' }} variant="secondary" onClick={() => addproducts()}>Add Product</Button>
                <Container className="mt-3">
                    <Row>
                        {/* {product.map(post =>
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
                        )} */}
                        {displayUsers}
                        <Pagination>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                                forcePage={page}
                                renderOnZeroPageCount={null}
                            //   className="cmn-Pagination mt-4"
                            //   breakLabel="..."
                            //   nextLabel="next >"
                            //   onPageChange={(e) => onPageClick('page', e)}
                            //   pageRangeDisplayed={5}
                            //   pageCount={state.total_pages?state.total_pages:0}
                            //   previousLabel="< previous"
                            //   renderOnZeroPageCount={null}
                            //   forcePage={page}
                            />
                        </Pagination>
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