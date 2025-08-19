
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
   const navigate = useNavigate();
    const handleSubmit = e => {
    e.preventDefault();
    
      alert(`OTP sent to ${email}`);
       navigate('/verify-otp');
  };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-4 rounded w-75% border loginForm'>
              <h2>Forgot Password</h2>
              <h6>Enter your registered email address. we'll send you a code
                   to reset your password.
              </h6>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='email'
              name='email'
              autoComplete='off'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='form-control rounded-0'
              required
            />
          </div>
          <button className='btn btn-primary p-2 w-50 rounded-3 mb-2'>Send OTP</button>
        </form>
          </div>
        </div>
    );
};             
export default ForgotPass
