import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Carousel_1 from '../assets/Home/Carousel_M.png';
import Corousel_1 from '../assets/Home/Corousel_4.jpg';
import Corousel_2 from '../assets/Home/Corousel_5.jpg';
import Corousel_3 from '../assets/Home/Corousel_6.jpg';

function Homecarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={Carousel_1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={Corousel_1} alt="Second slide" />
        <Carousel.Caption style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' , color: 'black'}}>
          <h3>Our Motiv</h3>
          <p>Happiness and health for your beloved pets</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={Corousel_2} alt="Third slide" />
        <Carousel.Caption style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' , color: 'black' }}>
          <h3>Our Agenda</h3>
          <p>Your pet our priority</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={Corousel_3} alt="Fourth slide" />
        <Carousel.Caption style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px', color: 'black' }}>
          <h3>Our promise to you</h3>
          <p>Happy pets, happy humans</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Homecarousel;
