import React, { useState } from 'react';
import './QueryForm.css';

const QueryForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Subject options
  const subjectOptions = [
    'Career Guidance',
    'Career Education Programs',
    'Job Shadowing',
    'Partnership Opportunities',
    'Parent Updates',
    'General Inquiry',
    'Other'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // In a real implementation, this would be an API call
        // For now, we'll simulate a successful submission after a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form submitted:', formData);
        
        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="query-form-container">
      <h2>Send Us a Message</h2>
      
      {submitSuccess && (
        <div className="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="success-icon">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
          <p>Your message has been sent successfully! We'll get back to you soon.</p>
        </div>
      )}
      
      {submitError && (
        <div className="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="error-icon">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>
          <p>There was an error sending your message. Please try again later.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="query-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.fullName ? 'input-error' : ''}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullNameError' : undefined}
          />
          {errors.fullName && <div id="fullNameError" className="error-text">{errors.fullName}</div>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={errors.email ? 'input-error' : ''}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'emailError' : undefined}
            />
            {errors.email && <div id="emailError" className="error-text">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 XXX XXX XXX"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? 'input-error' : ''}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subjectError' : undefined}
          >
            <option value="">Select a subject</option>
            {subjectOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.subject && <div id="subjectError" className="error-text">{errors.subject}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows="5"
            className={errors.message ? 'input-error' : ''}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'messageError' : undefined}
          ></textarea>
          {errors.message && <div id="messageError" className="error-text">{errors.message}</div>}
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default QueryForm;
