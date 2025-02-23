import React, { useState, useEffect } from "react";
import { BASEURL } from "../Constants/Constants";
import './UserDetails.css'; 

const UserDetails = (props) => {
    const [userDetails, setUserDetails] = useState({
        contactNumber: "",
        emergencyNumber: "",
        vetNumber: "",
        userName: "",
        userId: props.userId
    });

    const [isEditing, setIsEditing] = useState(true); // Initially in editing mode if details are not present

    useEffect(() => {
        fetch(`${BASEURL}/user-details/${props.userId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setUserDetails(data);
                    setIsEditing(false); // Switch to view mode if details are found
                } else {
                    setIsEditing(true); // Remain in editing mode if no details are found
                }
            })
            .catch(error => {
                console.error("There was an error fetching the user details!", error);
            });
    }, [props.userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            fetch(`${BASEURL}/user-details/`, {
                method: isEditing ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("User details saved successfully!", data);
                    setIsEditing(false); // Switch to view mode after saving
                })
                .catch(error => {
                    console.error("There was an error saving the user details!", error);
                });
        }
    };

    const validateForm = () => {
        const { userName, contactNumber, emergencyNumber, vetNumber } = userDetails;
        if (userName.length < 3) {
            alert("User's name must be at least 3 characters long.");
            return false;
        }
        if (!/^\d{10}$/.test(contactNumber)) {
            alert("Contact number must be exactly 10 digits.");
            return false;
        }
        if (!/^\d{10}$/.test(emergencyNumber)) {
            alert("Emergency number must be exactly 10 digits.");
            return false;
        }
        if (isNaN(vetNumber)) {
            alert("Vet number must be a valid number.");
            return false;
        }
        return true;
    };

    return (
        <div className="user-details">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="user-details-form">
                    <div className="form-group">
                        <label>User's Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={userDetails.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="contactNumber"
                            value={userDetails.contactNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Emergency Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="emergencyNumber"
                            value={userDetails.emergencyNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vet Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="vetNumber"
                            value={userDetails.vetNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? "Save" : "Update"}
                    </button>
                </form>
            ) : (
                <div className="user-details-view">
                    <h5>User's Name: {userDetails.userName}</h5>
                    <p>Contact Number: {userDetails.contactNumber}</p>
                    <p>Emergency Number: {userDetails.emergencyNumber}</p>
                    <p>Vet Number: {userDetails.vetNumber}</p>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
