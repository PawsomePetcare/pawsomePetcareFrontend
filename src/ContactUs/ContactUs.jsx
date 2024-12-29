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
        <div className="contactUs-bg-image bg-container" style={{height:'100vh'}}>
        <div className="container mt-5">
            <Menu/>
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
        <Footer/>
        </div>
    );
};

export default ContactUs;
