import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { career } = location.state || { career: null };
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, []);

  if (!career) {
    return (
      <div className="payment-error">
        <h2>Error</h2>
        <p>No career information found. Please try again.</p>
        <button onClick={() => navigate('/careers')}>Back to Careers</button>
      </div>
    );
  }

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment with ${selectedMethod} would be processed here. This is a frontend demo.`);
      // In a real implementation, you would redirect to success page or show confirmation
    }, 2000);
  };

  const handleBackToDetails = () => {
    navigate(`/career/${career.slug}`);
  };

  return (
    <div className={`payment-page ${animateIn ? 'animate-in' : ''}`}>
      <div className="payment-container">
        <button className="back-button" onClick={handleBackToDetails}>
          <i className="fas fa-arrow-left"></i> Back to Course Details
        </button>
        
        <h1>Complete Your Enrollment</h1>
        
        <div className="payment-summary">
          <h2><i className="fas fa-shopping-cart"></i> Order Summary</h2>
          <div className="course-info">
            <div className="course-details">
              <h3>{career.title} Career Guidance Course</h3>
              <span className="course-badge">3-Week Program</span>
            </div>
            <p className="course-price">KES 1,500</p>
          </div>
          <div className="summary-details">
            <div className="summary-row">
              <span>Course Fee</span>
              <span>KES 1,500</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>KES 0</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>KES 1,500</span>
            </div>
          </div>
        </div>
        
        <div className="payment-methods">
          <h2><i className="fas fa-credit-card"></i> Select Payment Method</h2>
          <div className="payment-options">
            <div 
              className={`payment-option ${selectedMethod === 'flutterwave' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodSelect('flutterwave')}
            >
              <div className="payment-logo flutterwave">
                <i className="fas fa-globe"></i>
              </div>
              <div className="payment-info">
                <h3>FlutterWave</h3>
                <p>Pay with card, bank, or mobile money</p>
              </div>
              {selectedMethod === 'flutterwave' && (
                <div className="payment-selected">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>
            
            <div 
              className={`payment-option ${selectedMethod === 'banktransfer' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodSelect('banktransfer')}
            >
              <div className="payment-logo bank">
                <i className="fas fa-university"></i>
              </div>
              <div className="payment-info">
                <h3>Bank Transfer</h3>
                <p>Make a direct transfer to our account</p>
              </div>
              {selectedMethod === 'banktransfer' && (
                <div className="payment-selected">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>
            
            <div 
              className={`payment-option ${selectedMethod === 'mpesa' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodSelect('mpesa')}
            >
              <div className="payment-logo mpesa">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="payment-info">
                <h3>M-Pesa (PesaPay)</h3>
                <p>Pay directly with M-Pesa</p>
              </div>
              {selectedMethod === 'mpesa' && (
                <div className="payment-selected">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {selectedMethod && (
          <div className="payment-details">
            {selectedMethod === 'flutterwave' && (
              <div className="method-details flutter">
                <h3><i className="fas fa-info-circle"></i> FlutterWave Payment</h3>
                <p>You'll be redirected to FlutterWave's secure payment page to complete your transaction.</p>
              </div>
            )}
            
            {selectedMethod === 'banktransfer' && (
              <div className="method-details bank-details">
                <h3><i className="fas fa-info-circle"></i> Bank Transfer Details</h3>
                <div className="bank-info">
                  <div className="bank-row">
                    <span>Bank Name:</span>
                    <span>EduSens Bank</span>
                  </div>
                  <div className="bank-row">
                    <span>Account Name:</span>
                    <span>EduSens Africa Ltd</span>
                  </div>
                  <div className="bank-row">
                    <span>Account Number:</span>
                    <span>1234567890</span>
                  </div>
                  <div className="bank-row">
                    <span>Branch:</span>
                    <span>Main Branch</span>
                  </div>
                  <p className="bank-note">Please use your name and "{career.title} Course" as reference</p>
                </div>
              </div>
            )}
            
            {selectedMethod === 'mpesa' && (
              <div className="method-details mpesa-details">
                <h3><i className="fas fa-info-circle"></i> M-Pesa Payment</h3>
                <p>To pay via M-Pesa:</p>
                <ol>
                  <li>Go to M-Pesa menu on your phone</li>
                  <li>Select "Lipa na M-Pesa"</li>
                  <li>Select "Pay Bill"</li>
                  <li>Enter Business Number: <strong>123456</strong></li>
                  <li>Enter Account Number: <strong>EDUSENS{career.id}</strong></li>
                  <li>Enter Amount: <strong>5,000</strong></li>
                  <li>Enter your M-Pesa PIN</li>
                  <li>Confirm the transaction</li>
                </ol>
              </div>
            )}
          </div>
        )}
        
        <div className="payment-action">
          <button 
            className={`payment-button ${isProcessing ? 'processing' : ''}`}
            onClick={handlePaymentSubmit}
            disabled={!selectedMethod || isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-lock"></i> Complete Payment
              </>
            )}
          </button>
        </div>
        
        <div className="payment-secure">
          <p>
            <i className="fas fa-shield-alt"></i>
            Your payment information is secure. We do not store your payment details.
          </p>
          <div className="payment-badges">
            <span className="security-badge"><i className="fas fa-lock"></i> SSL Secured</span>
            <span className="security-badge"><i className="fas fa-shield-alt"></i> 256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
