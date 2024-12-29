import React from 'react';
import Aboutus from '../assets/Home/AboutUs.jpg';

const AboutUs = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-12 col-lg-6 mb-4">
                    <img className="w-100" src={Aboutus} alt="About Us" />
                </div>
                <div className="col-12 col-md-12 col-lg">
                    <div className="text-wrapper text-start">
                        <h1 className="mb-4 display-4 fw-bold">
                            Paws &amp; Claws Haven
                        </h1>
                        <p className="mb-3 fs-5">
                            Welcome to the wildest pet paradise on the web! At Paws &amp; Claws Haven, we offer top-notch vet services and luxurious dog boarding for your furry friends.
                        </p>
                        <p className="mb-3 fs-5">
                            Unleash the joy of shopping at our online store where you'll find everything from stylish pet accessories to premium pet food. Your pets deserve the best, and we deliver it right to your doorstep!
                        </p>
                        <p className="mb-3 fs-5">
                            Join our pack of satisfied customers and experience the ultimate pet care experience at Paws &amp; Claws Haven. Let's make tails wag and purrs louder together!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
