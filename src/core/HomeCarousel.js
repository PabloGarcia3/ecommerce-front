import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeCarousel = () => {
    return (
        <Carousel className="container">
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/tm1.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Explore our GAPR club collection</h3>
                
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/tm2.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Check out Team Taylormade's straightest drive contest</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/tm3.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Shop our newest Woods now with Injected Twist Face</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeCarousel;