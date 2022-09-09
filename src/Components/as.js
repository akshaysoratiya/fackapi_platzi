import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import Form from "react-bootstrap/Form";
import Navbar1 from './component/Navbar1'
import Sidebar from './component/Sidebar'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import { debounce } from "debounce";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import Pagination from "react-bootstrap/Pagination";
import "./component/Pagination.css";
function Product() {
    const [product, setProduct] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
    let { search } = useLocation();
    let { page } = queryString.parse(search);
    const fun = () => {
        const url = `https://api.escuelajs.co/api/v1/products`;
        axios.get(url)
            .then((response) => setProduct(response.data));
    }
    useEffect(() => {
        fun();
        setPageNumber(page)
    }, [page])
    console.log("Product loaded successfully", product);
    const deleteItem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
            }
        })
    }
    const debouncedSave = useCallback(debounce((putdata) => setProduct(putdata), 1000), [])
    const search1 = (e) => {
        const search1 = e.target.value;
        const putdata = product.filter(
            (iteams) =>
                iteams.title.toLowerCase().includes(search1) ||
                iteams.category.name.toLowerCase().includes(search1)
        );
        debouncedSave(putdata)
        fun();
    };
    //Pagination
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = product
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((user) => {
            return (
                <Col>
                    <div className='my-4' >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={user.images} />
                            <Card.Body>
                                <Card.Title>Product Name: {user.title}</Card.Title>
                                <Card.Text>
                                    <b>About Product</b>: {user.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Price</b>: {user.price}₹</ListGroup.Item>
                                <ListGroup.Item><b>Category</b>: {user.category.name}</ListGroup.Item>
                            </ListGroup>
                            <Button className="btn btn-primary" onClick={() => { navigate(`/editproduct?id=${user.id}`) }} >Edit Product</Button>
                            <Button className="btn btn-danger" onClick={() => deleteItem()}>Delete</Button>
                        </Card>
                    </div>
                </Col>
            );
        });
    const pageCount = Math.ceil(product.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        // navigate(`/product&page=${selected+1}`)
    };
    return (
        <div>
            <Navbar1 />
            <div className="my-container my-6 ">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={search1}
                    />
                </Form>
                <h1>iStore Products</h1>
                <Container>
                    <Row>
                        <Button variant="primary" onClick={() => { navigate('/addproduct') }} >Add Product</Button>{' '}
                        {/* { product.map((user) => {
          return (
              <Col>
              <div className='my-4' >
              <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={user.images} />
                        <Card.Body>
                          <Card.Title>Product Name: {user.title}</Card.Title>
                          <Card.Text>
                               <b>About Product</b>: {user.description}
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item><b>Price</b>: {user.price}₹</ListGroup.Item>
                          <ListGroup.Item><b>Category</b>: {user.category.name}</ListGroup.Item>
                        </ListGroup>
                        <Button className="btn btn-primary" onClick={()=>{navigate(`/editproduct?id=${user.id}`)}} >Edit Product</Button>
                        <Button className="btn btn-danger" onClick={()=>deleteItem()}>Delete</Button>
                      </Card>
            </div>
            </Col>
                    );
                })} */}
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
            <Sidebar />
        </div>
    )
}
export default Product