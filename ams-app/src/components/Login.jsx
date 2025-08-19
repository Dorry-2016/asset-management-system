import React from 'react'
import { useState } from 'react';
import './style.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
const QuoteSummary = () => (
  <div
    style={{
      background: 'linear-gradient(90deg, #e5f7fd 60%, #f5f8fc 100%)',
      padding: '40px 60px',
      borderRadius: '24px',
      boxShadow: '0 4px 28px rgba(0,0,0,0.08)',
      maxWidth: '500px',
      maxHeight: '150px',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 200,
      color: '#21837a',
      marginBottom: '-60px',
      userSelect: 'none'
    }}
  >
    <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '60px', color: '#333' }}>
      Your personal Quote
    </div>
    {/* TPL Comprehensive Insurance, Offroad, Elite Roadside Assistant,<br />
    Personal Accident Benefit Cover */}
  </div>
);

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/auth/adminlogin',values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/dashboard')
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    };

  return (
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
          <h2 style={{
              fontFamily: "'Lexend', sans-serif",
              fontWeight: 400,
              marginBottom: '80px',
               marginRight: '200px' 
          }}>
             <div>Sign In to</div> 
              <div>BAMS</div>
          </h2>
          <div>
               <QuoteSummary /> 
          
          <div className='p-5 border loginForm'
              style={{
                  width: '500px',
                  marginTop: '-40px',
                  height: '400px',
                  borderRadius: '40px',
                  backgroundColor: '#fff',
                  opacity: 1,
                  padding: '50px', 
                  boxShadow: '0 4px 28px rgba(0,0,0,0.08)'
           }}
          >
              <div className='text-warning'>
                  {error && error}
              </div>
              <h2>
                  Welcome<span role="img" aria-label="waving hand">👋</span>
              </h2>
              <h6 style={{ color: '#A2A1A8', fontWeight: 200}}>Please login here</h6>
              <form onSubmit={handleSubmit}style={{ marginTop: '20px' }}>
                  <div className='mb-3'>
                      <input type='email' name='email' autoComplete='off' placeholder='Enter email'
                          onChange={e => setValues({ ...values, email: e.target.value })}
                          className='form-control'
                            style={{ borderRadius: '10px',  marginBottom: '15px' }}
                      />
                  </div>
                   <div className='position-relative rounded-3 mb-3'>
      <input
        type={showPassword ? 'text' : 'password'}
        name='password'
        placeholder='Enter password'
        value={values.password}
        onChange={e => setValues({ ...values, password: e.target.value })}
        className='form-control'
        style={{ borderRadius: '10px' }}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
      >
        {showPassword ? <FaEye /> : <FaRegEyeSlash />}
      </span>
    </div>
        <div className='remember-forgot'>
          <label><input type="checkbox" /> Remember me?</label>
             <a href="ForgotPass">Forgot Password?</a>
                      </div>
                  <button className='btn btn-primary p-10 w-50 mb-2'
                      style={{
                          borderRadius: '10px',   
                          fontWeight:200
                       }}
            >Login</button> 
            <div className="mt-3">
            <span style={{ color: "#555" }}>Dont have an account? </span>
            <span
              style={{ color: "#0d6efd", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >Sign Up
            </span>
          </div>
              
          </form>
          
     </div>
          </div>
          </div>        
)
}
export default Login