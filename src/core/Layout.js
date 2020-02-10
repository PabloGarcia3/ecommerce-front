import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Layout = ({
    title ='Title', 
    description = 'Description',
    className,
    children
}) => {
    return (
        <div>
            <Jumbotron>
                <div id='jumbotron-card' className= 'container col-md-6'>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>
                    {/* <Button variant="danger">Learn More</Button> */}
                </p>
                </div>
            </Jumbotron>
            <div className={className}>{children}</div>
        </div>
    );
}
export default Layout;