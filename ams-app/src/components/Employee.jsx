
// import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";



// const Employee = () => {
//   const [employee, setEmployee] = useState([]);
  
//     const navigate = useNavigate()
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/auth/employee")
//       .then((result) => {
//         if (result.data.Status) {
//           setEmployee(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const handleDelete = (id) => {
    
//     axios.delete('http://localhost:5000/auth/delete_employee/'+id)
//     .then(result => {
//         if(result.data.Status) {
//             window.location.reload()
//         } else {
//             alert(result.data.Error)
//         }
//     })
//   }
   
//   return (
//     <div className='px-5 mt-3 '>
//       <div  className='d-flex justify-content-center '>
//         <h2>Employee List</h2>
//       </div>
//       <Link to="/dashboard/add_employee" className='burnt-red-btn'>Add Employee</Link>
//       <div className="table-responsive bg-white shadow-sm mt-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
//         <table className="table table-hover mb-0">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Staff No</th>
//               <th>Image</th>
//               <th>category</th>
//               <th>Action</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {employee.map((e) => (
//               <tr>
//                 <td>{e.name}</td>
//                 <td>{e.email}</td>
//                 <td>{e.staff_no}</td>
//                 <td><img src={`http://localhost:5000/Images/` + e.image} className="employee_image" /></td>
//                 <td>{e.category_name}</td>
//                 <td>
//                   <Link
//                     to={`/dashboard/edit_employee/` + e.id}
//                     className="btn btn-info btn-sm me-2"
//                      edit
//                   >
//                     <i className="bi bi-pencil-square"></i>
//                     </Link>
                  
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(e.id)}
//                     delete
//                   >
//                      <i className="bi bi-trash"></i>
                    
//                   </button>
//                 </td>

//               </tr>
//             ))}
            
//           </tbody>
//           </table>

//       </div>
//     </div>
    
//   )
// }

// export default Employee
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

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
    axios.delete("http://localhost:5000/auth/delete_employee/" + id)
      .then(result => {
        if (result.data.Status) {
          setEmployee(prev => prev.filter(emp => emp.id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const toggleRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === employee.length) {
      setSelectedRows([]); // unselect all
    } else {
      setSelectedRows(employee.map(e => e.id)); // select all
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      alert("No employees selected");
      return;
    }

    // Optional: confirm before deleting
    if (!window.confirm("Are you sure you want to delete selected employees?")) return;

    Promise.all(
      selectedRows.map(id => axios.delete("http://localhost:5000/auth/delete_employee/" + id))
    )
      .then(() => {
        setEmployee(prev => prev.filter(emp => !selectedRows.includes(emp.id)));
        setSelectedRows([]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Employee List</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/dashboard/add_employee" className='burnt-red-btn'>
          Add Employee
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleBulkDelete}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="table-responsive bg-white shadow-sm mt-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleAll}
                  checked={selectedRows.length === employee.length && employee.length > 0}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Staff No</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id} className={selectedRows.includes(e.id) ? "table-active" : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(e.id)}
                    onChange={() => toggleRow(e.id)}
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.staff_no}</td>
                <td>
                  <img
                    src={`http://localhost:5000/Images/${e.image}`}
                    className="employee_image"
                    alt="employee"
                  />
                </td>
                <td>{e.category_name}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(e.id)}
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
  );
};

export default Employee;
