import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { Home, Settings, ShoppingCart, BookOpen, User, PhoneCall, LogOut } from 'react-feather';
import paw from '../assets/Home/paw.ico';
import { useAuth } from '../Authenticate/AuthContext';
import { Modal, Button } from 'react-bootstrap';

function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigateTo = (path) => {
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        setShowLogoutModal(false);
        logout();
        navigateTo('/home');
    };

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
                <button className={`btn m-2 ${isActive('/account') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/account')}>
                    <User size={15} className="icon" />Account
                </button>
                <button className={`btn m-2 ${isActive('/cart') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/cart')}>
                    <ShoppingCart size={15} className="icon" />Cart
                </button>
                <button className={`btn m-2 ${isActive('/contactUs') ? 'btn-primary' : 'btn-light'}`} onClick={() => navigateTo('/contactUs')}>
                    <PhoneCall size={15} className="icon" />Contact us
                </button>
                <button className="btn btn-danger m-2" onClick={() => setShowLogoutModal(true)}>
                    <LogOut size={15} className="icon" />Logout
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Menu;
