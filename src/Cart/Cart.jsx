import { useState, useEffect } from 'react';
import Menu from "../Common/Menu";
import CartBox from './CartBox';
import { BASEURL } from '../Constants/Constants';
import { Modal, Button } from 'react-bootstrap';
import QrPayment from '../assets/Payment/Temp_QRCode.png';
import './CartCheckout.css'; // Import the CSS file

function CartCheckout(props) {
    const [cartDetails, setCartDetails] = useState([]);
    const [checkoutDetails, setCheckoutDetails] = useState([]);
    const [cartMessage, setCartMessage] = useState("No items in cart");
    const [checkoutMessage, setCheckoutMessage] = useState("You haven't booked any services");
    const [showModal, setShowModal] = useState(false);
    const [totalCharges, setTotalCharges] = useState(0);

    useEffect(() => {
        fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${props.userId}&status=ADDED`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    setCartMessage("No items in cart");
                } else {
                    setCartDetails(data.map(item => ({
                        ...item,
                        checkinDate: '',
                        checkoutDate: '',
                        quantity: 1
                    })));
                }
            })
            .catch(error => console.error('Error fetching cart data:', error));
    }, [props.userId]);

    const removeFromCart = (id, userId) => {
        fetch(`${BASEURL}/cart/removeFromCart?serviceId=${id}&userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setCartDetails(data.map(item => ({
                ...item,
                checkinDate: '',
                checkoutDate: '',
                quantity: 1
            })));
            if (data.length === 0) {
                setCartMessage("No items in cart");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const updateCartDetail = (id, field, value) => {
        setCartDetails(prevCartDetails => 
            prevCartDetails.map(detail =>
                detail.serviceId === id ? { ...detail, [field]: value } : detail
            )
        );
    };

    const calculateTotalCharges = () => {
        let total = 0;
        cartDetails.forEach(item => {
            const startDate = new Date(item.checkinDate);
            const endDate = new Date(item.checkoutDate);
            const timeDiff = endDate.getTime() - startDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            item.total = item.price * daysDiff * item.quantity;
            item.days = daysDiff;
            total += item.total;
        });
        setTotalCharges(total);
    };

    const checkoutServices = () => {
        calculateTotalCharges();
        setShowModal(true);
    };

    const completeServices = () => {
        fetch(`${BASEURL}/cart/checkoutServices?userId=${props.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartDetails),
        })
        .then(response => response.json())
        .then(data => {
            setCartDetails([]);
            setCartMessage("No items in cart");
            setCheckoutDetails(data);
            setCheckoutMessage("Checkout Services are booked");
            setShowModal(false);
        })
        .catch(error => console.error('Error while saving data:', error)); 
    };

    const handleClose = () => setShowModal(false);

    return (
        <div className="container mt-5">
            <Menu />
            <div>
                <h3>Cart</h3>
                {cartDetails?.map((detail, index) => (
                    <div key={index} className="service-box">
                        <CartBox 
                            removeApplicable={true} 
                            id={detail.serviceId} 
                            title={detail.title} 
                            description={detail.description} 
                            imageId={detail.imageId} 
                            price={detail.price} 
                            removeFromCart={(id, userId) => removeFromCart(id, userId)} 
                            userId={detail.userId} 
                            checkinDate={detail.checkinDate}
                            checkoutDate={detail.checkoutDate}
                            quantity={detail.quantity}
                            updateCartDetail={updateCartDetail}
                        />
                    </div>
                ))}
                {cartDetails.length > 0 ? (
                    <button className="btn btn-primary mt-3" onClick={checkoutServices}>Checkout</button>
                ) : (
                    <p>{cartMessage}</p>
                )}
            </div>  
            <div>
                {/* <h3>Booked Services</h3>
                {checkoutDetails?.map((detail, index) => (
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
                ))}
                {checkoutDetails.length === 0 && <p>{checkoutMessage}</p>} */}
            </div> 
            <Modal className="modal-dialog modal-sm" show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={QrPayment} alt="Booking" className="img-fluid" style={{ width: '100%', height: 'auto' }} />
                    <p><strong>Total Charges: &#8377; {totalCharges}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={completeServices}>Paid</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CartCheckout;
