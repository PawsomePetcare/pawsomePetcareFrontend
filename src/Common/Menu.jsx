import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { Home, Settings, ShoppingCart, BookOpen, User, PhoneCall } from 'react-feather';
import paw from '../assets/Home/paw.ico';


function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (path) => {
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex justify-content-center align-items-center">
            <img src={paw} alt="Logo" className="img-fluid me-3 mr-3" style={{ width: '50px', height: '50px' }} />
            <div className="d-flex">
                <button className={`btn m-2 ${isActive('/home') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/home')}>
                    <Home size={15} className="icon" />Home
                </button>
                <button className={`btn m-2 ${isActive('/services') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/services')}>
                    <Settings size={15} className="icon" />Services
                </button>
                <button className={`btn m-2 ${isActive('/testinomials') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/testinomials')}>
                    <BookOpen size={15} className="icon" />Testinomials
                </button>
                <button className={`btn m-2 ${isActive('/addDog') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/addDog')}>
                    <BookOpen size={15} className="icon" />Add Dog
                </button>
                <button className={`btn m-2 ${isActive('/selectDog') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/selectDog')}>
                    <BookOpen size={15} className="icon" />Select Dog
                </button>
                <button className={`btn m-2 ${isActive('/account') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/account')}>
                    <User size={15} className="icon" />Account
                </button>
                <button className={`btn m-2 ${isActive('/cart') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/cart')}>
                    <ShoppingCart size={15} className="icon" />Cart
                </button>
                <button className={`btn m-2 ${isActive('/contactUs') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/contactUs')}>
                    <PhoneCall size={15} className="icon" />Contact us
                </button>
            </div>
        </div>
    );
}

export default Menu;
