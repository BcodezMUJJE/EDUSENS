import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';  // Commented out - auth disabled
import ScrollToTop from './Components/ScrollToTop';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import CareerExplorer from './Components/CareerExplorer';
import ContactUsPage from './Components/ContactUsPage';
// import AuthPage from './Pages/AuthPage';  // Commented out - login functionality disabled
import OurServices from './Components/OurServices';
import AICareerQuiz from './Components/AICareerQuiz';
import JobShadowing from './Components/JobShadowing';
import ComingSoon from './Components/ComingSoon';
// import PaymentPage from './Components/PaymentPage';  // Commented out - payment functionality disabled
import AIComingSoon from './Components/AIComingSoon';
import CourseComingSoon from './Components/CourseComingSoon';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
// import ForgotPasswordPage from './Pages/ForgotPasswordPage';  // Commented out - auth functionality disabled
// import ResetPasswordPage from './Pages/ResetPasswordPage';  // Commented out - auth functionality disabled

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* <AuthProvider> */} {/* Auth functionality completely disabled */}
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
            {/* Commented out - login functionality disabled */}
            {/* <Route path="/auth" element={<AuthPage />} /> */}
            {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
            {/* <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
            <Route path="/job-shadowing-coming-soon" element={<ComingSoon />} />
            {/* Commented out - payment functionality disabled */}
            {/* <Route path="/payment" element={<PaymentPage />} /> */}
            <Route path="/course-coming-soon" element={<CourseComingSoon />} />
            <Route path="/ai-coming-soon" element={<AIComingSoon />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
      </div>
      {/* </AuthProvider> */} {/* Auth functionality completely disabled */}
    </Router>
  );
}

export default App;
