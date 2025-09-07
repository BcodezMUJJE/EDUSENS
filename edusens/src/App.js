import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import OurServices from './Components/OurServices';
import AICareerQuiz from './Components/AICareerQuiz';
import CareerExplorer from './Components/CareerExplorer';
import JobShadowing from './Components/JobShadowing';
import ContactUsPage from './Components/ContactUsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Our-Services' element={<OurServices />} />
          <Route path='/Ai-Careers' element={<AICareerQuiz />} />
	        <Route path='/Edusens-Careers' element={<CareerExplorer />} />
          <Route path='/career/:slug' element={<CareerExplorer />} />
          <Route path='/job-shadowing' element={<JobShadowing />} />
          <Route path='/contact-us' element={<ContactUsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;