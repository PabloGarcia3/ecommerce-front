import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';
import ShowImage from './ShowImage';
import { addItem, updateItem } from './cartHelpers';

const AltCard = ({ 
        product, 
        showViewProductButton = true,
        showAddToCartButton = true,
        cartUpdate = false
     }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-warning mt-2 mb-2">
                        View Product
                    </button>
                </Link>
                
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-outline-primary mt-2 mb-2">
                Add to Cart
            </button>
        );
    }

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <input type="number" value={count} onChange={handleChange(product._id)} />
                </InputGroup.Prepend>
            </InputGroup>
        </div>
    }

    return (
        <div className="card">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>Category: {product.category && product.category.name}</p>
                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top"><ShowImage item={product} url="product" /></Card.Img>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    $ {product.price}
                </Card.Text>
                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showCartUpdateOptions(cartUpdate)}
            </Card.Body>
        </Card>
    );
}

export default AltCard;