import React from 'react';

const ShowImage = ({item, url}) => (
    <div className="product-img">
        <img 
            src={`http://localhost:8000/api/${url}/photo/${item._id}`} 
            alt={item.name} 
            className="product-img mb-3" 
            style={{maxHeight: '100%', maxWidth: '100%'}} 
        />
    </div>
);

export default ShowImage;