import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import OurServices from './Components/OurServices';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Our-Services' element={<OurServices />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
