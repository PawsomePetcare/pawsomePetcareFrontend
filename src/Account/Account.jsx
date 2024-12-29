import { useState, useEffect } from 'react';
import Menu from "../Common/Menu";
import CartBox from '../Cart/CartBox';
import { BASEURL } from '../Constants/Constants';
import { Modal, Button } from 'react-bootstrap';
import QrPayment from '../assets/Payment/Temp_QRCode.png';

function Account() {
    const [details, setDetails] = useState([]);
    const [message, setMessage] = useState("You haven't booked any services");
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${1}&status=COMPLETED`)
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
        fetch(`${BASEURL}/cart/completedServices?userId=${1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setDetails(data);
            setMessage("Services are booked");
            // setModalImage('../assets/PageNotFound.jpg'); 
            setShowModal(true);
        })
        .catch(error => console.error('Error while saving data:', error));
    };

    const handleClose = () => setShowModal(false);

    return (
        <div className="container mt-5">
            <Menu />
            <div>
                {details?.map((detail, index) => {
                    return (
                        <CartBox id={detail.serviceId} key={index} title={detail.title} description={detail.description} imageId={detail.imageId} price={detail.price} userId={detail.userId} removeApplicable={false} />
                    );
                })}
            </div>
            {details?.length > 0 ? <button className="btn btn-primary mt-3" onClick={checkoutServices}>Book</button> :
                <p>{message}</p>}
            
            <Modal className="modal-dialog modal-sm" show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={QrPayment} alt="Booking" className="img-fluid" style={{ width: '100%', height: 'auto' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Account;
