import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Col } from 'react-bootstrap';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    }

    useEffect(() => {
        loadProducts()
    }, []);

    return (
        <Fragment>
            <Layout title='Manage Products' description='Change Product Details'>
                
            </Layout> 
            <Col className="row">
                <div className="col-12">
                <h2 className="text-center">
                    Total Products: {products.length} Products
                </h2>
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li 
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge badge-danger badge-pill">
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>

                </div>
            </Col>      
        </Fragment>
    );
}

export default ManageProducts;