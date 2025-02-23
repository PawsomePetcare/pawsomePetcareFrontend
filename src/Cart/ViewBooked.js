import { useState, useEffect } from 'react';
import Menu from "../Common/Menu";
import CartBox from './CartBox';
import { BASEURL } from '../Constants/Constants';
import { Modal, Button } from 'react-bootstrap';
import QrPayment from '../assets/Payment/Temp_QRCode.png';
import ViewCart from './Viewcart';

function ViewBooked(props) {
    const [details, setDetails] = useState([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${props.userId}&status=BOOKED`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    setMessage("You haven't booked any services");
                } else {
                    setDetails(data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const checkoutServices = () => {
        fetch(`${BASEURL}/cart/completedServices?userId=${props.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setDetails(data);
            setMessage("Checkout Services are booked");
            // setModalImage('../assets/PageNotFound.jpg'); 
            setShowModal(true);
        })
        .catch(error => console.error('Error while saving data:', error));
    };

    return (
        <div className="container mt-5">
           
            <div>
                {details?.map((detail, index) => {
                    return (
                        <ViewCart id={detail.serviceId} key={index} title={detail.title} description={detail.description}
                         imageId={detail.imageId} price={detail.price} userId={detail.userId}
                         total={detail.total}
                         checkinDate={detail.checkinDate}
                         checkoutDate={detail.checkoutDate}
                         quantity={detail.quantity}
                          removeApplicable={false} />
                    );
                })}
            </div>
        </div>
    );
}

export default ViewBooked;
