// App.js
import React, { useState } from 'react';
import DogForm from './DogForm';
import 'animate.css';
import Menu from '../Common/Menu';
import Footer from '../Common/Footer';

const AddDog = ({addDog, dogs}) => {

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
    <Menu/>
      <h1 className="mb-4">Dog List</h1>
      <DogForm addDog={addDog} />
      <ul className="list-group mt-4">
        {dogs.map((dog, index) => (
          <li key={index} className="list-group-item">
            {dog.name} - {dog.breed} - {dog.age} years old
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default AddDog;
