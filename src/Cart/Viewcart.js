import React, { useEffect, useState } from 'react';
import '../App.css';
import boarding from '../assets/Services/boarding.jpg';
import grooming from '../assets/Services/grooming.jpg';
import swimming from '../assets/Services/swimming.jpg';
import daycare from '../assets/Services/daycare.jpg';
import './CartBox.css'; // Import the CSS file

const ViewCart = ({ id, title, description, imageId, price, removeFromCart, userId, removeApplicable, checkinDate, checkoutDate, quantity, updateCartDetail, total }) => {
    const [image, setImage] = useState();

    useEffect(() => {
        switch (imageId) {
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
            default:
                setImage(null);
        }
    }, [imageId]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="card mb-3 cart-box">
            <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <img src={image} alt={title} className="img-fluid rounded-circle mt-3 mx-auto d-block" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                {/* <p className="card-text"><strong>Check-in Date:</strong></p> */}
                                <p className="card-text">{formatDate(checkinDate)}</p>
                            </div>
                            <div>
                                {/* <p className="card-text"><strong>Check-out Date:</strong></p> */}
                                <p className="card-text">{formatDate(checkoutDate)}</p>
                            </div>
                            <div>
                                {/* <p className="card-text"><strong>Total:</strong></p> */}
                                <p className="card-text">&#8377; {total}</p>
                            </div>
                            
                        </div>
                        <p className="card-text"><strong>Quantity: </strong>{quantity}</p>
                        {/* <p className="card-text">&#8377; {total}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCart;
