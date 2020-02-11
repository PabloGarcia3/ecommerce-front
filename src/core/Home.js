import React, { Fragment, useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Search from './Search';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        });
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        });
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Fragment>
            <Layout title='Taylormade Golf' description='Taylormade the #1 Driver in golf!'>
                
            </Layout>
            <div className="container">
                <Search />
                <div>
                    <h2 className="mb-4">Best Sellers</h2> 
                </div>
                <div className="card-container">
                    <Col className="row">
                        {productsBySell.map((product, i) => (
                            <div key={i} style={{ marginBottom: '2px' }}>
                                <Card product={product} />
                            </div>
                        ))}
                    </Col>
                </div>
                <div>
                    <h2 className="mb-4">New Arrivals</h2>
                </div>
                <div className="card-container">
                    <Col className="row">
                        {productsByArrival.map((product, i) => (
                            <div key={i}>
                                <Card product={product} />
                            </div>
                        ))}
                    </Col>
                </div>               
            </div>
        </Fragment>
    );
}

export default Home;