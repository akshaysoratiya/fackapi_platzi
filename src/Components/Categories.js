import React, { useCallback, useEffect, useState } from 'react'
import Template from './Template';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { debounce } from 'debounce';



function Categories() {
  let navigate = useNavigate();

  const [categories, setCategoriesData] = useState([]);
  const [add, setAdded] = useState([]);
  const [update, setUpdate] = useState([]);

  console.log("addd data", add);

  const fetchAssets = async () => {
    const user = await axios.get('https://api.escuelajs.co/api/v1/categories')
    setCategoriesData(user.data);
  }
  useEffect(() => {
    fetchAssets();
  }, [])
  const debouncedSave = useCallback(debounce((putdata) => setCategoriesData(putdata), 800), [])

  const searchcategories = (e) => {
    const search = e.target.value;
    const putdata = categories.filter(
      (iteams) =>
        iteams.name.toLowerCase().includes(search)
    );
    debouncedSave(putdata)
    fetchAssets();
  };

  const addcategories = async () => {
    Swal.fire({
      title: 'Add Category',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
             <input type="text" id="imgurl" class="swal2-input" placeholder="ImageURL">`,
      confirmButtonText: 'Add Category',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value
        const imgurl = Swal.getPopup().querySelector('#imgurl').value
        if (!name || !imgurl) {
          Swal.showValidationMessage(`Please enter all Details`)
        }
        return { name: name, imgurl: imgurl }
      }
    }).then((result) => {
      const url = `https://api.escuelajs.co/api/v1/categories/`;
      // console.log("obj", {
      //     "name": Name,
      //     "images": [image]
      // });
      // return false
      axios.post(url, {
        "name": result.value.name,
        "images": [result.value.imgurl]
      }).then((responce) => setAdded(responce.data))
      Swal.fire(
        'Categories add successfully.',
        'successfully!',
        'success'
      )
    })
  }

  const updatecategories = async (id) => {
    Swal.fire({
      title: 'Update Category',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Name">`,
      confirmButtonText: 'Update Category',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value
        if (!name) {
          Swal.showValidationMessage(`Please enter name`)
        }
        return { name: name }
      }
    }).then((result) => {
      const url = `https://api.escuelajs.co/api/v1/categories/${id}`;
      axios.put(url, {
        "name": result.value.name,
      }).then((responce) => setUpdate(responce.data))
      Swal.fire(
        'Categories add successfully.',
        'successfully!',
        'success'
      )
    })
  }


  const deletecategories = () => {
    Swal.fire({
      title: 'Are you sure to delete Category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Category has been deleted successfully.',
          'Deleted!',
          'success'
        )
      }
    })
  }
  return (
    <>
      <Template />
      <div className="my-container">
        <input onChange={searchcategories} type="text" placeholder="Search..." />
        <Button style={{ marginLeft: '85%', marginbottom: '10px' }} variant="secondary" onClick={() => addcategories()} >Add Categories</Button>
        <Container className="mt-3">
          <Row>
            {categories.map(post =>
              <Col className="m-3">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={post.image} />
                  <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                    <Button className="m-2" variant="primary" onClick={() => updatecategories(post.id)}>Update</Button>
                    <Button className="mr-gap-2" variant="danger" onClick={() => deletecategories()}>Delete</Button>
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

export default Categories