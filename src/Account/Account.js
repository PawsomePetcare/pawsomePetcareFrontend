import React, { useState } from "react";
import PetRegister from "./Petregister";
import PetDetails from "./PetDetails";
import Menu from "../Common/Menu";
import Checkout from "../Cart/Checkout";
import backgroundImage from '../assets/Backgrounds/Home.jpg'; 
import './Account.css'; 
import ViewBooked from "../Cart/ViewBooked";
import UserDetails from "./UserDetails";

const Account = (props) => {
    const [pets, setPets] = useState([]);

    const addPet = (newPet) => {
        setPets([...pets, newPet]);
    };

    const updatePet = (updatedPet) => {
        const updatedPets = pets.map(pet =>
            pet.id === updatedPet.id ? updatedPet : pet
        );
        setPets(updatedPets);
    };

    return (
        <>
            <Menu />
            <div className="account-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="account-box">
                    <h3>Register a Pet</h3>
                    <PetRegister addPet={addPet} userId={props.userId} />
                </div>
                <div className="account-box">
                    <h3>Pet Details</h3>
                    <PetDetails pets={pets} updatePet={updatePet} userId={props.userId} />
                </div>
                <div className="account-box">
                    <h3>User Details</h3>
                    <UserDetails userId={props.userId} />
                </div>
                <div className="account-box">
                    <h3>Booked Services</h3>
                    <ViewBooked userId={props.userId} />
                </div>
            </div>
        </>
    );
};

export default Account;
