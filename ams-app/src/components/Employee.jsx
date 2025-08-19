
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";



const Employee = () => {
  const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    
    axios.delete('http://localhost:5000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
   
  return (
    <div className='px-5 mt-3'>
      <div  className='d-flex justify-content-center'>
        <h2>Employee List</h2>
      </div>
      <Link to="/dashboard/add_employee" className='burnt-red-btn'>Add Employee</Link>
      <div className='mt-3'>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>category</th>
               <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td><img src={`http://localhost:5000/Images/` + e.image} className="employee_image" /></td>
                <td>{e.email}</td>
                <td>{e.category_name}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                     edit
                  >
                    <i className="bi bi-pencil-square"></i>
                    </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(e.id)}
                    delete
                  >
                     <i className="bi bi-trash"></i>
                    
                  </button>
                </td>

              </tr>
            ))}
            
          </tbody>
          </table>

      </div>
    </div>
    
  )
}

export default Employee