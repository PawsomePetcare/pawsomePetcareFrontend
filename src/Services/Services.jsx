import { useEffect, useState } from "react";
import Menu from "../Common/Menu";
import {BASEURL} from '../Constants/Constants';
// import Sample from '../Sample.json';
import ServiceBox from "./ServiceBox";
import Footer from "../Common/Footer";

function Services(){
    const [servicesData , setServicesData] = useState([]);
    const [idList , setIdList] = useState([]);

    useEffect(()=>{
        // setServicesData(Sample);
        fetch(`${BASEURL}/services/allServiceDetails`)
        .then(response => response.json())
        .then(data => setServicesData(data))
        .catch(error => console.error('Error fetching data:', error));
    },[])

    const addToCart = (id) => {
        alert(id);
            fetch(`${BASEURL}/cart/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId: id,
                    userId: 1,
                    status: "ADDED"
                })
            })
            .then(response =>  {
                alert("Added to cart");
                console.log(response.data);
                setIdList([...idList, id]);
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
                    <ServiceBox idList={idList} id={service.serviceid} key={index} title={service.title} description={service.description} imageId={service.imageId} price={service.price} addToCart={(id) => addToCart(id)}/>
                   
                )
            })
            }
            </div>
        </div>
        <Footer/>
        </div>
    )
}


export default Services;