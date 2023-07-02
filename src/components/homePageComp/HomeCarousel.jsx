import React from "react";
import Carousel from "react-bootstrap/Carousel";
import wed1 from "../../assets/images/wed.jpg";
import wed2 from "../../assets/images/wed3.jpg";
import wed3 from "../../assets/images/wed2.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const HomeCarousel = () => {
  return (
    <div className="home-carousel">
      <Carousel>
        <Carousel.Item>
          <LazyLoadImage
            className="d-block w-100"
            src={wed1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Venue Reservation System !</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LazyLoadImage
            className="d-block w-100"
            src={wed2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Book Venue of Your Choice</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LazyLoadImage
            className="d-block w-100"
            src={wed3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
