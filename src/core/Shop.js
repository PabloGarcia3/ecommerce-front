import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
import { prices } from "./fixedPrices";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const[skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });
    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
    };

    const loadMore = () => {
        let toSkip = skip + limit
        // console.log(newFilters)
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log('SHOP', filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <div>
            <Layout title='Shop' description='Taylormade the #1 Driver in golf!'>
                
            </Layout>
            <div className="container row" id="shop-container">
                <div 
                    className="col-3" 
                    style={{ 
                        justifyContent: 'center', 
                        textAlign: 'left',
                        padding: '40px',
                    }}>
                    <h4>Filter by Category</h4>
                    <ul>
                        <Checkbox 
                            categories={categories} 
                            handleFilters={filters =>
                                handleFilters(filters, 'category')
                            } 
                        />
                    </ul> 
                    <h4>Filter by Price</h4>
                    <div>
                        <Radiobox 
                            prices={prices} 
                            handleFilters={filters =>
                                handleFilters(filters, 'price')
                            } 
                        />
                    </div> 
                </div>
                <div className="container col-9 products">
                    <h2>Products</h2>
                    <div className="card-container">
                        <Col className="row">
                            {filteredResults.map((product, i) => (
                                <div key={i}>
                                    <Card product={product} />
                                </div>
                            ))}
                        </Col>  
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </div>     
    );
}

export default Shop;
