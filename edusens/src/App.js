import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import CareerExplorer from './Components/CareerExplorer';
import ContactUsPage from './Components/ContactUsPage';
import AuthPage from './Pages/AuthPage';
import OurServices from './Components/OurServices';
import AICareerQuiz from './Components/AICareerQuiz';
import JobShadowing from './Components/JobShadowing';
import ComingSoon from './Components/ComingSoon';
import PaymentPage from './Components/PaymentPage';
import AIComingSoon from './Components/AIComingSoon';
import AssessmentHistory from './Components/AssessmentHistory';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Our-Services' element={<OurServices />} />
              <Route path='/Ai-Careers' element={<AICareerQuiz />} />
              <Route path='/Edusens-Careers' element={<CareerExplorer />} />
              <Route path='/job-shadowing' element={<JobShadowing />} />
              <Route path='/contact-us' element={<ContactUsPage />} />
              <Route path="/careers" element={<CareerExplorer />} />
              <Route path="/career/:slug" element={<CareerExplorer />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/job-shadowing-coming-soon" element={<ComingSoon />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/ai-coming-soon" element={<AIComingSoon />} />
              <Route path="/assessment-history" element={<AssessmentHistory />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
