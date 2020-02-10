import React, { Fragment } from 'react';
import { signout, isAuthenticated } from '../auth';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { itemTotal } from './cartHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Menu = ({history}) => {

    return (
        <Navbar bg="dark" expand="lg">
            
            <Navbar.Brand>
                <img src="/taylormade.png" alt="" />
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" bg="dark">
                <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                <Nav.Link><Link to='/shop'>Shop</Link></Nav.Link>
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-custom"> 
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.25rem' }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <Dropdown.Item>
                                <Link 
                                    className="nav-link" 
                                    to="/user/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </Dropdown.Item>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <Dropdown.Item>
                                <Link 
                                    className="nav-link"
                                    to="/admin/dashboard"
                                >
                                    Admin
                                </Link>
                            </Dropdown.Item>
                        )}

                        {!isAuthenticated() && (
                            <Fragment>
                                <Dropdown.Item><Link className="nav-link" to='/signin'>Sign In</Link></Dropdown.Item>
                                <Dropdown.Item><Link className="nav-link" to='/signup'>Sign Up</Link></Dropdown.Item>
                            </Fragment>
                        )}

                        {isAuthenticated() && (
                            <Fragment>
                                <Dropdown.Item><Link className="nav-link" to='/user/dashboard'>Dashboard</Link></Dropdown.Item>
                                <Dropdown.Item>
                                    <Link
                                        className="nav-link"
                                        onClick={() =>
                                            signout(() => {
                                                history.push("/");
                                            })
                                        }
                                        >
                                        Sign Out
                                    </Link>
                                </Dropdown.Item>
                            </Fragment>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
            <Nav.Link>
                <Link to='/cart'>   
                    <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '1.5rem' }} />
                    <sup><small className="cart-badge">{itemTotal()}</small></sup>
                </Link>
            </Nav.Link>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
        // <Navbar bg="dark" variant="dark">
        //     <Navbar.Brand>
        //         <img src="/taylormade.png" alt="" />
        //     </Navbar.Brand>
            
        //     <Nav className="mr-auto" id="navbar">
        //         <Nav.Link><Link to='/'>Home</Link></Nav.Link>
        //         <Nav.Link><Link to='/shop'>Shop</Link></Nav.Link>
        //         <Nav.Link>
        //             <Link to='/cart'>   
        //                 <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '1.5rem' }} />
        //                 <sup><small className="cart-badge">{itemTotal()}</small></sup>
        //             </Link>
        //         </Nav.Link>

        //         {isAuthenticated() && isAuthenticated().user.role === 0 && (
        //             <li className="nav-item">
        //                 <Link 
        //                     className="nav-link" 
        //                     to="/user/dashboard"
        //                 >
        //                     Dashboard
        //                 </Link>
        //             </li>
        //         )}

        //         {isAuthenticated() && isAuthenticated().user.role === 1 && (
        //             <li className="nav-item">
        //                 <Link 
        //                     className="nav-link" 
        //                     to="/admin/dashboard"
        //                 >
        //                     Admin
        //                 </Link>
        //             </li>
        //         )}

        //         {!isAuthenticated() && (
        //             <Fragment>
        //                 <Nav.Link><Link to='/signin'>Sign In</Link></Nav.Link>
        //                 <Nav.Link><Link  to='/signup'>Sign Up</Link></Nav.Link>
        //             </Fragment>
        //         )}

        //         {isAuthenticated() && (
        //             <Fragment>
        //                 <Nav.Link><Link  to='/user/dashboard'>Dashboard</Link></Nav.Link>
        //                 <Nav.Link>
        //                     <Link 
        //                         style={{ cursor: "pointer", color: "#ffffff" }}
        //                         onClick={() =>
        //                             signout(() => {
        //                                 history.push("/");
        //                             })
        //                         }
        //                         >
        //                         Sign Out
        //                     </Link>
        //                 </Nav.Link>
        //             </Fragment>
        //         )}
                
        //     </Nav>
        //     <Nav.Link>
        //         <Link to='/cart'>   
        //             <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '1.5rem' }} />
        //             <sup><small className="cart-badge">{itemTotal()}</small></sup>
        //         </Link>
        //     </Nav.Link>

        //     <Form inline>
        //         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        //         <Button variant="outline-danger">Search</Button>
        //     </Form>
        // </Navbar>
    );
}

export default withRouter(Menu);