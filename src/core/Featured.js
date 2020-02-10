import React from 'react';
import { Card } from 'react-bootstrap';

 const  Featured = () => {
    return (
        <div>
            <div>
                <Card style={{ width: '18rem', float: "left" }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                        text
                        </Card.Text>
                        <Card.Link href="#">Shop</Card.Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', float: "left" }} >
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                        text
                        </Card.Text>
                        <Card.Link href="#">Shop</Card.Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', float: "left" }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                        text
                        </Card.Text>
                        <Card.Link href="#">Shop</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Featured;