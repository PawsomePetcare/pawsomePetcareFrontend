import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';
import Menu from '../Common/Menu';
import Footer from '../Common/Footer';

const DogSelectionForm = ({ dogs }) => {
  const [selectedDog, setSelectedDog] = useState('');
  const [boardingDate, setBoardingDate] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time portion for comparison

    if (selectedDate > today) {
      setBoardingDate(e.target.value);
      setError('');
    } else {
      setBoardingDate('');
      setError('Please select a future date.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardingDate) {
      alert(`Dog: ${selectedDog}, Boarding Date: ${boardingDate}`);
    } else {
      alert('Please select a valid future boarding date.');
    }
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
    <Menu/>
      <h1 className="mb-4">Enroll Pet</h1>
    <Form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp mt-4">
      <Form.Group controlId="formDogSelection">
        <Form.Label>Select Dog</Form.Label>
        <Form.Control
          as="select"
          value={selectedDog}
          onChange={(e) => setSelectedDog(e.target.value)}
        >
          <option value="" disabled>
            Select a dog
          </option>
          {dogs.map((dog, index) => (
            <option key={index} value={dog.name}>
              {dog.name} - {dog.breed} - {dog.age} years old
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBoardingDate">
        <Form.Label>Boarding Date</Form.Label>
        <Form.Control
          type="date"
          value={boardingDate}
          onChange={handleDateChange}
        />
        {error && <p className="text-danger">{error}</p>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Footer/>
    </div>
  );
};

export default DogSelectionForm;
