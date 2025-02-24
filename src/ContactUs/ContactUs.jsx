import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Menu from '../Common/Menu';
import Footer from '../Common/Footer';
import SocialConnections from './SocialConnections';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        fromEmail: '',
        message: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(formData.fromEmail)) {
            formData.fromEmail = 'pawsome.petcares@gmail.com';
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.fromEmail,
            message: formData.message,
            to_email: 'pawsome.petcares@gmail.com'
        };

        emailjs.send('service_rxirrtq', 'template_a4esh5c', templateParams, 'HmHwN1PYzi2dvziCS')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                alert('Email sent successfully!');
            })
            .catch((error) => {
                console.error('Failed to send email.', error);
                setError('Failed to send email. Please try again later.');
            });
    };

    return (
        <div className="contactUs-bg-image bg-container" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Menu/>
            <div className="container mt-5 flex-grow-1">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fromEmail">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="fromEmail"
                            name="fromEmail"
                            value={formData.fromEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <SocialConnections/>
            
            <div className="container">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.16199970688!2d77.44071589411742!3d12.9701541450064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b1c45e33%3A0x84ed238c9e225f32!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1615389216343!5m2!1sen!2sus" 
                    width="100%" 
                    height="450" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <Footer/>
        </div>
    );
};

export default ContactUs;
