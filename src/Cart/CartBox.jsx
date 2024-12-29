import React, { useEffect, useState } from 'react';
import '../App.css';
import boarding from '../assets/Services/boarding.jpg';
import grooming from '../assets/Services/grooming.jpg';
import swimming from '../assets/Services/swimming.jpg';
import daycare from '../assets/Services/daycare.jpg';

const CartBox = ({ id, title, description, imageId, price, removeFromCart, userId, removeApplicable }) => {
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
        <div className="card mb-3 mr-2" style={{ width: '100%' }}>
            <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center">
                    <img src={image} alt={title} className="img-fluid rounded-circle mt-3 mx-auto d-block" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><strong>&#8377; {price}</strong></p>
                    </div>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-end">
                    { removeApplicable && <button className="btn btn-danger" onClick={() => removeFromCart(id, userId)}>Remove</button>}
                </div>
            </div>
        </div>
    );
};

export default CartBox;
