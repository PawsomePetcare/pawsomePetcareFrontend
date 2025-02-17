import React, { useState } from 'react';
import { BASEURL } from '../Constants/Constants';

function PetRegister({ addPet, userId }) {
    const [pet, setPet] = useState({
        name: '',
        dob: '',
        medications: '',
        dietaryRequirements: '',
        breed: '',
        receivedTickVaccine: false,
        receivedRabiesVaccine: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPet(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        pet.userId = userId;
        fetch(BASEURL+'/api/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pet)
        })
        .then(response => response.json())
        .then(newPet => {
            alert('Pet registered successfully');
            addPet(newPet); // Pass the new pet to the parent component
            setPet({
                name: '',
                dob: '',
                medications: '',
                dietaryRequirements: '',
                breed: '',
                receivedTickVaccine: false,
                receivedRabiesVaccine: false
            });
        })
        .catch(error => console.error('Error saving pet data:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Register Your Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        value={pet.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Pet D.O.B</label>
                    <input
                        type="date"
                        name="dob"
                        value={pet.dob}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Medications being used</label>
                    <input
                        type="text"
                        name="medications"
                        value={pet.medications}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Dietary Requirements</label>
                    <input
                        type="text"
                        name="dietaryRequirements"
                        value={pet.dietaryRequirements}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Breed of dog</label>
                    <input
                        type="text"
                        name="breed"
                        value={pet.breed}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        name="receivedTickVaccine"
                        checked={pet.receivedTickVaccine}
                        onChange={handleChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">Received Tick vaccine</label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        name="receivedRabiesVaccine"
                        checked={pet.receivedRabiesVaccine}
                        onChange={handleChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">Received Rabies vaccine</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default PetRegister;
