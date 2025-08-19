import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successfully");
     navigate("/adminlogin");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-4 rounded w-50 border loginForm">
        <h2 className="mb-3 text-center">Reset Password</h2>
        <p className="text-center text-muted">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-3"
              required
            />
            <span
              className="position-absolute"
              style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control rounded-3"
              required
            />
            <span
              className="position-absolute"
              style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye/> : <FaRegEyeSlash  />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3 mt-3"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
