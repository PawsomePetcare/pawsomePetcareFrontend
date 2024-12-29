import { useState, useEffect } from 'react';
import Menu from "../Common/Menu";
import TestinomialsBox from "./TestinomialsBox";
import { BASEURL } from '../Constants/Constants';
import Footer from '../Common/Footer';

function Testinomials (){
const [testinomialsData, setTestinomialsData] = useState([]);


useEffect(()=>{
    // setServicesData(Sample);
    fetch(`${BASEURL}/testinomials/getAllTestinomials`)
    .then(response => response.json())
    .then(data => setTestinomialsData(data))
    .catch(error => console.error('Error fetching data:', error));
},[])

return (
    <div className="testinomials-bg-image bg-container">
    <div className="container mt-5">
        <Menu/>
        <div className="services-container fluid">
            {testinomialsData?.map((test, index)=>{
                return (
                    <TestinomialsBox key={index} name={test.name} experience={test.experience} imageId={test.imageId}/>
                    
                )
            })
            }
            </div>
    </div>
    <Footer/>
    </div>
)

}

export default Testinomials;