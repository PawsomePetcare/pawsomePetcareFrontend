import { useEffect, useState } from "react";
import Menu from "../Common/Menu";
import { BASEURL } from '../Constants/Constants';
// import Sample from '../Sample.json';
import ServiceBox from "./ServiceBox";
import Footer from "../Common/Footer";

function Services(props){
    const [servicesData , setServicesData] = useState([]);
    const [idList , setIdList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [checkoutList, setCheckoutList] = useState([]);

    useEffect(()=>{
        // setServicesData(Sample);
        fetch(`${BASEURL}/services/allServiceDetails`)
        .then(response => response.json())
        .then(data => setServicesData(data))
        .catch(error => console.error('Error fetching data:', error));

        mapServices("ADDED");
        mapServices("BOOKED");

    },[])

    const mapServices = (type) => {
        let carts = [];
        let checkouts = [];
        fetch(`${BASEURL}/cart/getServicesByUserStatus?userId=${props.userId}&status=${type}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(i => {
                switch(type){
                    case "ADDED":
                        carts.push(i.serviceId);
                        break;
                    case "BOOKED":
                        checkouts.push(i.serviceId);
                        break;
                            
                }
            });
            if(type === "ADDED"){
                setCartList(carts);
            } else if(type === "BOOKED"){
                setCheckoutList(checkouts);
            }
        });
    }

    const addToCart = (id) => {
        fetch(`${BASEURL}/cart/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceId: id,
                userId: props.userId,
                status: "ADDED"
            })
        })
        .then(response =>  {
            alert("Added to cart");
            console.log(response.data);
            setIdList([...idList, id]);
            mapServices("ADDED");
        })
        .catch(error => console.error('Error fetching data:', error));   
    }

    return (
        <div className="services-bg-image bg-container">
            <div className="container mt-5">
                <Menu/>
                <div className="services-container fluid">
                    {servicesData?.map((service, index)=>{
                        return (
                            <ServiceBox 
                                cartList={cartList} 
                                checkoutList={checkoutList} 
                                id={service.serviceid} 
                                key={index} 
                                title={service.title} 
                                description={service.description} 
                                imageId={service.imageId} 
                                price={service.price} 
                                addToCart={(id) => addToCart(id)}
                            />
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Services;
