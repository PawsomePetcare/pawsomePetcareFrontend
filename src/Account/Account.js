
import React, { useState } from "react" ;
import PetRegister from "./Petregister";
import PetDetails from "./PetDetails";
import Menu from "../Common/Menu";
import Checkout from "../Cart/Checkout";


const Account= (props) => {

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

   return ( <>
   <Menu/>
   <PetRegister addPet={addPet} userId={props.userId} /> 
   <PetDetails pets={pets} updatePet={updatePet} userId={props.userId} />
   <Checkout userId={props.userId}/>
    </>)
}


export default Account;

