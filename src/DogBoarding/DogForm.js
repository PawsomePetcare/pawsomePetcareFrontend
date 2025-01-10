// DogForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'animate.css';

const DogForm = ({ addDog }) => {
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogAge, setDogAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDog({ name: dogName, breed: dogBreed, age: dogAge });
    setDogName('');
    setDogBreed('');
    setDogAge('');
  };

  return (
    <Form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp">
      <Form.Group controlId="formDogName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          placeholder="Enter dog's name"
        />
      </Form.Group>
      <Form.Group controlId="formDogBreed">
        <Form.Label>Breed</Form.Label>
        <Form.Control
          type="text"
          value={dogBreed}
          onChange={(e) => setDogBreed(e.target.value)}
          placeholder="Enter dog's breed"
        />
      </Form.Group>
      <Form.Group controlId="formDogAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          value={dogAge}
          onChange={(e) => setDogAge(e.target.value)}
          placeholder="Enter dog's age"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Dog
      </Button>
    </Form>
  );
};

export default DogForm;
