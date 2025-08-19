// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("User Data:", values); // For testing only
//     alert("Account created successfully (frontend only).");
//     navigate("/adminlogin"); // Redirect to login after signup
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 signupPage">
//       <h2
//         style={{
//           fontFamily: "'Lexend', sans-serif",
//           fontWeight: 400,
//           marginBottom: "80px",
//           marginRight: "200px",
//         }}
//       >
//         <div>Create Account</div>
//         <div>BAMS</div>
//       </h2>

//       <div
//         className="p-5 border signupForm"
//         style={{
//           width: "500px",
//           borderRadius: "40px",
//           backgroundColor: "#fff",
//           opacity: 1,
//           padding: "50px",
//           boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
//         }}
//       >
//         <h2>Welcome 🎉</h2>
//         <h6 style={{ color: "#A2A1A8", fontWeight: 200 }}>
//           Please sign up below
//         </h6>

//         <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
//           <div className="mb-3">
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter full name"
//               value={values.name}
//               onChange={(e) => setValues({ ...values, name: e.target.value })}
//               className="form-control"
//               style={{ borderRadius: "10px", marginBottom: "15px" }}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               autoComplete="off"
//               placeholder="Enter email"
//               value={values.email}
//               onChange={(e) => setValues({ ...values, email: e.target.value })}
//               className="form-control"
//               style={{ borderRadius: "10px", marginBottom: "15px" }}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               value={values.password}
//               onChange={(e) =>
//                 setValues({ ...values, password: e.target.value })
//               }
//               className="form-control"
//               style={{ borderRadius: "10px", marginBottom: "15px" }}
//               required
//             />
//           </div>

//           <button
//             className="btn btn-primary p-10 w-50 mb-2"
//             style={{ borderRadius: "10px", fontWeight: 200 }}
//             type="submit"
//           >
//             Sign Up
//           </button>

//           <div className="mt-3">
//             <span style={{ color: "#555" }}>Already have an account? </span>
//             <span
//               style={{ color: "#0d6efd", cursor: "pointer" }}
//               onClick={() => navigate("/adminlogin")}
//             >
//               Login
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", values);

      if (res.data.success) {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/adminlogin"), 2000); // redirect after 2s
      } else {
        setError(res.data.Error || "Signup failed. Try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 signupPage">
      <h2
        style={{
          fontFamily: "'Lexend', sans-serif",
          fontWeight: 400,
          marginBottom: "80px",
          marginRight: "200px",
        }}
      >
        <div>Create Account</div>
        <div>BAMS</div>
      </h2>

      <div
        className="p-5 border signupForm"
        style={{
          width: "500px",
          borderRadius: "40px",
          backgroundColor: "#fff",
          opacity: 1,
          padding: "50px",
          boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Welcome 🎉</h2>
        <h6 style={{ color: "#A2A1A8", fontWeight: 200 }}>
          Please sign up below
        </h6>

        {/* Error / Success messages */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          {/* <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control"
              style={{ borderRadius: "10px", marginBottom: "15px" }}
              required
            />
          </div> */}

          <div className="mb-3">
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control"
              style={{ borderRadius: "10px", marginBottom: "15px" }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control"
              style={{ borderRadius: "10px", marginBottom: "15px" }}
              required
            />
          </div>

          <button
            className="btn btn-primary p-10 w-50 mb-2"
            style={{ borderRadius: "10px", fontWeight: 200 }}
            type="submit"
          >
            Sign Up
          </button>

          <div className="mt-3">
            <span style={{ color: "#555" }}>Already have an account? </span>
            <span
              style={{ color: "#0d6efd", cursor: "pointer" }}
              onClick={() => navigate("/adminlogin")}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
