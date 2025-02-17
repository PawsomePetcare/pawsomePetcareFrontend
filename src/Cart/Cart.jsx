import { useState, useEffect } from 'react';
import Menu from "../Common/Menu";
import CartBox from './CartBox';
import { BASEURL } from '../Constants/Constants';
import { Modal, Button } from 'react-bootstrap';
import QrPayment from '../assets/Payment/Temp_QRCode.png';

function CartCheckout(props) {
    const [cartDetails, setCartDetails] = useState([]);
    const [checkoutDetails, setCheckoutDetails] = useState([]);
    const [cartMessage, setCartMessage] = useState("No items in cart");
    const [checkoutMessage, setCheckoutMessage] = useState("You haven't booked any services");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${props.userId}&status=ADDED`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    setCartMessage("No items in cart");
                } else {
                    setCartDetails(data);
                }
            })
            .catch(error => console.error('Error fetching cart data:', error));

        // fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${props.userId}&status=COMPLETED`)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.length === 0) {
        //             setCheckoutMessage("You haven't booked any services");
        //         } else {
        //             setCheckoutDetails(data);
        //         }
        //     })
        //     .catch(error => console.error('Error fetching checkout data:', error));
    }, []);

    const removeFromCart = (id, userId) => {
        fetch(`${BASEURL}/cart/removeFromCart?serviceId=${id}&userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setCartDetails(data);
            if (data.length === 0) {
                setCartMessage("No items in cart");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const checkoutServices = () => {
        fetch(`${BASEURL}/cart/checkoutServices?userId=${props.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setCartDetails([]);
            setCartMessage("No items in cart");
            setCheckoutDetails(data);
            setCheckoutMessage("Checkout Services are booked");
            setShowModal(true);
        })
        .catch(error => console.error('Error while saving data:', error));
    };

    const completeServices = () => {
        fetch(`${BASEURL}/cart/completedServices?userId=${props.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            // setCartDetails([]);
            // setCartMessage("No items in cart");
            // setCheckoutDetails(data);
            // setCheckoutMessage("Checkout Services are booked");
            setShowModal(false);
        })
        .catch(error => console.error('Error while saving data:', error));
    };


    const handleClose = () => setShowModal(false);

    return (
        <div className="container mt-5">
            <Menu/>
            <div>
                <h3>Cart</h3>
                {cartDetails?.map((detail, index) => {
                    return (
                        <CartBox 
                            removeApplicable={true} 
                            id={detail.serviceId} 
                            key={index} 
                            title={detail.title} 
                            description={detail.description} 
                            imageId={detail.imageId} 
                            price={detail.price} 
                            removeFromCart={(id, userId) => removeFromCart(id, userId)} 
                            userId={detail.userId} 
                        />
                    )
                })}
                {cartDetails.length > 0 ? 
                    <button className="btn btn-primary mt-3" onClick={checkoutServices}>Checkout</button> 
                    : <p>{cartMessage}</p>
                }
            </div>
            <div>
                {/* <h3>Booked Services</h3>
                {checkoutDetails?.map((detail, index) => {
                    return (
                        <CartBox 
                            removeApplicable={false} 
                            id={detail.serviceId} 
                            key={index} 
                            title={detail.title} 
                            description={detail.description} 
                            imageId={detail.imageId} 
                            price={detail.price} 
                            userId={detail.userId} 
                        />
                    );
                })}
                {checkoutDetails.length === 0 && <p>{checkoutMessage}</p>*/}
            </div> 

            <Modal className="modal-dialog modal-sm" show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={QrPayment} alt="Booking" className="img-fluid" style={{ width: '100%', height: 'auto' }} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={completeServices}>Paid</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CartCheckout;
