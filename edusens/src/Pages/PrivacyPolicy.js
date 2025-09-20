import React from 'react';
import './LegalPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Privacy Policy</h1>
        
        <section>
          <h2>1. Introduction</h2>
          <p>EduSens ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
        </section>
        
        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide when using our services, including but not limited to:</p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Account credentials</li>
            <li>Educational history and preferences</li>
            <li>Profile information</li>
          </ul>
          <p>We may also automatically collect certain information when you visit our platform, including:</p>
          <ul>
            <li>Device information</li>
            <li>Usage data</li>
            <li>IP address and browser type</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>
        
        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your experience</li>
            <li>Communicate with you</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>
        </section>
        
        <section>
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
        </section>
        
        <section>
          <h2>5. Third-Party Services</h2>
          <p>Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties.</p>
        </section>
        
        <section>
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.</p>
        </section>
        
        <section>
          <h2>7. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </section>
        
        <section>
          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@edusens.com.</p>
        </section>
        
        <div className="last-updated">
          <p>Last Updated: September 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
