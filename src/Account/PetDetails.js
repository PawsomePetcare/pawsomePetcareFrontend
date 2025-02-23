import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BASEURL } from '../Constants/Constants';

function PetDetails({ pets, updatePet, userId }) {
    const [selectedPet, setSelectedPet] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (pet) => {
        setSelectedPet(pet);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSelectedPet(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        selectedPet.userId = userId
        fetch(`${BASEURL}/api/pets/${selectedPet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedPet)
        })
        .then(response => response.json())
        .then(updatedPet => {
            alert('Pet updated successfully');
            updatePet(updatedPet);
            setShowModal(false);
            setSelectedPet(null);
        })
        .catch(error => console.error('Error updating pet data:', error));
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedPet(null);
    };

    return (
        <div className="container mt-5">

            <div>
            {pets.length==0 && <h5>No pets are regsitered</h5>}
                {pets.map(pet => (
                    <div key={pet.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{pet.name}</h5>
                            <p className="card-text">DOB: {pet.dob}</p>
                            <p className="card-text">Medications: {pet.medications}</p>
                            <p className="card-text">Dietary Requirements: {pet.dietaryRequirements}</p>
                            <p className="card-text">Breed: {pet.breed}</p>
                            <p className="card-text">Received Tick Vaccine: {pet.receivedTickVaccine ? 'Yes' : 'No'}</p>
                            <p className="card-text">Received Rabies Vaccine: {pet.receivedRabiesVaccine ? 'Yes' : 'No'}</p>
                            <button className="btn btn-primary" onClick={() => handleEdit(pet)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPet && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Pet Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label>Pet Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={selectedPet.name}
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
                                    value={selectedPet.dob}
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
                                    value={selectedPet.medications}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Dietary Requirements</label>
                                <input
                                    type="text"
                                    name="dietaryRequirements"
                                    value={selectedPet.dietaryRequirements}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Breed of dog</label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={selectedPet.breed}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="receivedTickVaccine"
                                    checked={selectedPet.receivedTickVaccine}
                                    onChange={handleChange}
                                    className="form-check-input"
                                />
                                <label className="form-check-label">Received Tick vaccine</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="receivedRabiesVaccine"
                                    checked={selectedPet.receivedRabiesVaccine}
                                    onChange={handleChange}
                                    className="form-check-input"
                                />
                                <label className="form-check-label">Received Rabies vaccine</label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Save</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default PetDetails;
