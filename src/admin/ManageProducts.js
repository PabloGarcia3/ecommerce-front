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
                <div className="col-8">
                <h2 className="text-center">
                    Total Products: {products.length} Products
                </h2>
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li 
                                key={i}
                                className="list-group-item justify-content-between align-items-center m-2"
                            >
                                <strong>{p.name}</strong>
                                <br></br>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <button className="btn btn-warning mr-3 mt-3">
                                        Update
                                    </button>
                                </Link>
                                <button onClick={() => destroy(p._id)} className="btn btn-danger mt-3">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>
            </Col>      
        </Fragment>
    );
}

export default ManageProducts;