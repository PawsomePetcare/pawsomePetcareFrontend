import React from 'react';
import PageNotFound from '../assets/PageNotFound.jpg';
import Footer from '../Common/Footer';

function NotFound() { 
    return (
        <div className="container-fluid text-center not-found">
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <img src={PageNotFound} alt="Page Not Found" className="img-fluid"/>
            <br/>
            <button className="btn btn-warning mt-3" onClick={() => window.history.back()}>Go Back</button>
        <Footer/>
        </div>
    ); 
} 

export default NotFound;
