import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/About" element={<About />}/>
      <Route path="/Contact" element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  );
}
 
export default App;
