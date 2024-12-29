import React, { useEffect, useState } from 'react';
import '../App.css';
import userId_m1 from '../assets/Testinomials/userId_m1.jpg';
import userId_f1 from '../assets/Testinomials/userId_f1.jpg';
import userId_m2 from '../assets/Testinomials/userId_m2.jpg';
import userId_f2 from '../assets/Testinomials/userId_f2.jpg';
import userId_m3 from '../assets/Testinomials/userId_m3.jpg';
import userId_f3 from '../assets/Testinomials/userId_f3.jpg';
import NoUserImage from '../assets/Testinomials/NoUserImage.jpg';

const TestinomialsBox = ({ name, experience, imageId }) => {
    const [image, setImage] = useState(NoUserImage);
    useEffect(() => {
        switch(imageId) {
            case 'userId_m1':
                setImage(userId_m1);
                break;
            case 'userId_f1':
                setImage(userId_f1);
                break;
            case 'userId_m2':
                setImage(userId_m2);
                break;
            case 'userId_f2':
                setImage(userId_f2);
                break;
            case 'userId_m3':
                setImage(userId_m3);
                break;
            case 'userId_f3':
                setImage(userId_f3);
                break;
            default:
                setImage(NoUserImage);
                break;
        }
    }, [imageId]);

    return (
        <div className="card mb-3" style={{ maxWidth: '18rem' }}>
            <img src={image} alt={name} className="card-img-top rounded-circle mt-3 mx-auto d-block" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{experience}</p>
            </div>
        </div>
    );
};

export default TestinomialsBox;
