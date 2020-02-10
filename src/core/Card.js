import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { InputGroup, Card as ProductCard } from 'react-bootstrap';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({ 
        product, 
        showViewProductButton = true,
        showAddToCartButton = true,
        cartUpdate = false,
        showRemoveProductButton = false,
        setRun = f => f,
        run = undefined // default value of undefined
     }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-dark mt-2 mb-2">
                        View Product
                    </button>
                </Link>
                
            )
        );
    };

    const addToCart = () => {
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = (showAddToCartButton) => {
        return (showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-outline-primary mt-2 mb-2">
                Add to Cart
            </button>
            )
        );
    }

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-success badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-danger badge-pill">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (cartUpdate && (
            <div>
                <InputGroup>
                    <InputGroup.Prepend>
                        <input type="number" value={count} onChange={handleChange(product._id)} />
                    </InputGroup.Prepend>
                </InputGroup>
            </div>
            )
        );
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button 
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }} 
                    className="btn btn-outline-danger mt-2 mb-2">
                    Remove Product
                </button>
            )
        );
    };

    return (
        <ProductCard style={{ width: '19rem' }}>
            <ShowImage item={product} url="product"/>  
            <ProductCard.Body>
                {shouldRedirect(redirect)}
                <ProductCard.Title>{product.name}</ProductCard.Title>
                <ProductCard.Text>
                    $ {product.price}
                </ProductCard.Text>
                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}
            </ProductCard.Body>
        </ProductCard>
    );
}

export default Card;