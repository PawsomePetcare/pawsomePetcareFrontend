import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Services from './Services/Services';
import NotFound from './NotFound/NotFound';
import ContactUs from './ContactUs/ContactUs';
import Account from './Account/Account';
import Testinomials from './Testinomials/Testinomials';
import Cart from './Cart/Cart';

function App() {
  return (
    <div className="App">

<BrowserRouter>
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />}/>
      <Route path="/services" element={<Services />} />
      <Route path="/cart" element={<Cart/>} /> 
      <Route path="/testinomials" element={<Testinomials />} />
      <Route path="/account" element={<Account />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
