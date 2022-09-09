import React from 'react'
import Container from 'react-bootstrap/Container';
import '../Components/css/Template.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Swal from "sweetalert2";

function Template() {
    let navigate = useNavigate();

    const logout = () => {

        Swal.fire(
            'Logout!',
            'logout successfully.',
            'success'
        )
        localStorage.clear();
        navigate('/login');

    };

    const name = localStorage.getItem('email');
    return (
        <div>
            <Navbar className="fixed-top" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Fackapi-platzi</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as : <span className="text-white"> {name}</span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                <button className="btn btn-danger m-2" onClick={() => logout()}>Logout</button>
            </Navbar>

            <div className='sidebar'>
                <CDBSidebar textColor="#fff" backgroundColor="#0d6efd">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                            Sidebar
                        </a>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <NavLink exact to="/" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/users" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="user" >Users</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/products" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="table">Products</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/categories" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="chart-line">Categories</CDBSidebarMenuItem>
                            </NavLink>
                            {/* <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                            </NavLink> */}
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                padding: '20px 5px',
                            }}
                        >
                            Sidebar Footer
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>
            </div>
        </div>
    )
}

export default Template