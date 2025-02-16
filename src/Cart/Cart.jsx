import { useState, useEffect } from 'react';
import Menu from "../Common/Menu";
import CartBox from './CartBox';
import { BASEURL } from '../Constants/Constants';
import Checkout from './Checkout';

function Cart (props){
    const [details , setDetails] = useState([]);
    const [message, setMessage] = useState("No items in cart");

    useEffect(()=>{
        fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${props.userId}&status=ADDED`)
        .then(response => response.json())
        .then(data => {
            if(data.length==0){
                // setMessage("No items in cart");
            } else{
                setDetails(data)
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    },[])

    const removeFromCart = (id, userId) => {
        fetch(`${BASEURL}/cart/removeFromCart?serviceId=${id}&userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
                setDetails(data);
                // if(data.length==0) 
                    // setMessage("No items in cart");
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
            setDetails(data);
            setMessage("cart Services are submitted");
            })
        .catch(error => console.error('Error while saving data:', error));

    }

return (
    <div className="container mt-5">
        <Menu/>
        <div>
        {details?.map((detail, index)=>{
                return (
                    <CartBox  removeApplicable={true} id={detail.serviceId} key={index} title={detail.title} description={detail.description} imageId={detail.imageId} price={detail.price} removeFromCart={(id, userId) => removeFromCart(id, userId)} userId={detail.userId}/>                   
                )
        })
        }
        </div>
        {details?.length>0 ? <button className="btn btn-primary mt-3" onClick={() => checkoutServices()}>Checkout</button> :
        <p>{message}</p>}
        <Checkout userId={props.userId}/>
    </div>
)

}

export default Cart;