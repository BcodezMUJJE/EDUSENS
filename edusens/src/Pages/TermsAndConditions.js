import React from 'react';
import './LegalPages.css';

const TermsAndConditions = () => {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Terms and Conditions</h1>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to EduSens. These Terms and Conditions govern your use of our website, services, and platform. By accessing or using EduSens, you agree to be bound by these Terms.</p>
        </section>
        
        <section>
          <h2>2. Definitions</h2>
          <p>"EduSens," "we," "us," and "our" refer to EduSens and its affiliates.</p>
          <p>"User," "you," and "your" refer to individuals accessing or using our services.</p>
          <p>"Platform" refers to our website, mobile applications, and related services.</p>
        </section>
        
        <section>
          <h2>3. Account Registration and Security</h2>
          <p>You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
        </section>
        
        <section>
          <h2>4. User Conduct</h2>
          <p>When using our platform, you agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Share false or misleading information</li>
            <li>Attempt to gain unauthorized access to any part of our services</li>
            <li>Use our platform for any illegal or unauthorized purpose</li>
          </ul>
        </section>
        
        <section>
          <h2>5. Intellectual Property</h2>
          <p>All content, features, and functionality of our platform are owned by EduSens and are protected by copyright, trademark, and other intellectual property laws.</p>
        </section>
        
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>EduSens shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.</p>
        </section>
        
        <section>
          <h2>7. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of these Terms.</p>
        </section>
        
        <section>
          <h2>8. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at legal@edusens.com.</p>
        </section>
        
        <div className="last-updated">
          <p>Last Updated: September 2025</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
