import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(60); 
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; 
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(Array(4).fill(""));
  };
  const handleVerify = () => {
     if (otp.some((digit) => digit === "")) {
    alert("Invalid OTP");
    return;
  }
    alert("Email verified successfully");
    navigate("/reset-password");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-4 rounded w-50 border loginForm text-center">
        <h2>Verify OTP</h2>
        <p>Enter the 4-digit code sent to your email</p>
        <div className="d-flex justify-content-center gap-2 mb-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="form-control text-center"
              style={{
                width: "50px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>

        <p className="mb-2">
          {canResend
            ? "Didn't get the code?"
            : `Resend OTP in ${timer} seconds`}
        </p>

        <button
          className="btn btn-link"
          disabled={!canResend}
          onClick={handleResend}
        >
          Resend OTP
        </button>
        <div className="mt-3">
          <button
            className="btn btn-primary w-50 rounded-3"
             onClick={handleVerify}  >Verify OTP</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
