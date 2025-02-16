import React, { useEffect, useState } from 'react';
import '../App.css';
import boarding from '../assets/Services/boarding.jpg';
import grooming from '../assets/Services/grooming.jpg';
import swimming from '../assets/Services/swimming.jpg';
import daycare from '../assets/Services/daycare.jpg';

const ServiceBox = ({ id, title, description, imageId, price, addToCart, cartList, checkoutList }) => {
    const [image, setImage] = useState();
    useEffect(() => {
        switch(imageId) {
            case 'boarding':
                setImage(boarding);
                break;
            case 'grooming':
                setImage(grooming);
                break;
            case 'daycare':
                setImage(daycare);
                break;
            case 'swimming':
                setImage(swimming);
                break;
        }
    }, [imageId]);

    return (
        <div className="card mb-3" style={{ maxWidth: '18rem' }}>
            <img src={image} alt={title} className="card-img-top rounded-circle mt-3 mx-auto d-block" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <div className="card-body text-center">


        {/* <div className="service-box p-3 border rounded shadow">
            <img src={image} alt={title} className="rounded-circle mb-3" style={{ width: '150px', height: '150px' }} /> */}
            <h3 className="h5">{title}</h3>
            <p>{description}</p>
            <p className="font-weight-bold">&#8377; {price}</p>
            {cartList.indexOf(id)<0  && checkoutList.indexOf(id)<0 ? <button className="btn btn-primary" onClick={() => addToCart(id)}>Book Now</button>
            :cartList.indexOf(id)<0 ? <button className="btn btn-primary" disabled>You have opted for service</button>: <button className="btn btn-primary" disabled>Added to cart</button>}
        </div>
        </div>
    );
};

export default ServiceBox;
