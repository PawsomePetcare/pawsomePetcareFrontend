import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Services from './Services/Services';
import NotFound from './NotFound/NotFound';
import ContactUs from './ContactUs/ContactUs';
// import Account from './Cart/Checkout';
import Testinomials from './Testinomials/Testinomials';
import Cart from './Cart/Cart';
import AddDog from './DogBoarding/AddDog';
import 'animate.css';
import DogForm from './DogBoarding/DogForm';
import { useState } from 'react';
import DogSelectionForm from './DogBoarding/DogSelectionForm';
import PrivateRoute from './Authenticate/PrivateRoute';
import Login from './Authenticate/Login';
import { AuthProvider } from './Authenticate/AuthContext';
import Signup from './Authenticate/Signup';

function App() {

  const [dogs, setDogs] = useState([]);
  const addDog = (dog) => { setDogs([...dogs, dog]); }

  return (
    
    <div className="App">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/home" element={<PrivateRoute element={Home} />} /> 
          <Route path="/services" element={<PrivateRoute element={Services} />} /> 
          <Route path="/cart" element={<PrivateRoute element={Cart} />} />
           <Route path="/testinomials" element={<PrivateRoute element={Testinomials } />} />
            {/* <Route path="/account" element={<PrivateRoute element={Account} />} />  */}
            <Route path="/contactUs" element={<PrivateRoute element={ContactUs} />} /> 
            <Route path="/addDog" element={<PrivateRoute element={() => <AddDog addDog={addDog} dogs={dogs}/>} />} /> 
            <Route path="/selectDog" element={<PrivateRoute element={()=> <DogSelectionForm dogs={dogs} />} />} /> 
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;



