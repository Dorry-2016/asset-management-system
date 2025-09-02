// import React from "react";
// import "./AssignAssetModal.css";

// export default function AssignAssetModal({ onClose, onSubmit }) {
//   return (
//     <div className="modal-overlay" role="dialog" aria-modal="true">
//       <div className="modal assign-modal">
//         <div className="modal-titlebar">
//           <h3>Assign Asset</h3>
//           <button className="x" onClick={onClose} aria-label="Close">×</button>
//         </div>

//         <form className="form-grid" onSubmit={onSubmit}>
//           <div className="row">
//             <div className="field">
//               <label>Asset Name <span className="req">*</span></label>
//               <input type="text" placeholder="Asset name" required />
//             </div>
//             <div className="field">
//               <label>Category <span className="req">*</span></label>
//               <input type="text" placeholder="Category" required />
//             </div>
//           </div>

//           <div className="row">
//             <div className="field">
//               <label>Assigned To <span className="req">*</span></label>
//               <input name="assignedTo" type="text" placeholder="Assigned to" required />
//             </div>
//             <div className="field">
//               <label>Department <span className="req">*</span></label>
//               <input name="department" type="text" placeholder="Department" required />
//             </div>
//           </div>

//           <div className="row">
//             <div className="field">
//               <label>Date <span className="req">*</span></label>
//               <input name="date" type="date" required />
//             </div>
//             <div className="field">
//               <label>Location <span className="req">*</span></label>
//               <input name="location" type="text" placeholder="Location" required />
//             </div>
//           </div>

//           <div className="row full">
//             <div className="field">
//               <label>Description</label>
//               <textarea name="description" placeholder="Input description"></textarea>
//             </div>
//           </div>

//           <div className="modal-actions">
//             <button type="submit" className="btn primary">Add</button>
//             <button type="button" className="btn gray" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignAssetModal.css";
import { useNavigate } from 'react-router-dom'

const AssignAssetModal = ({ onClose, onSubmit }) => {
    const [employees, setEmployees] = useState([]);
    const [category, setCategory] = useState([]);
    const [assets, setAssets] = useState([]);
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    asset_name: "",
      assigned_to: "",
      location: "",
      description: "",
      category: "",
    assign_date: "",

    
  });
    useEffect(() => {
        axios.get('http://localhost:5000/auth/category')
              .then(result => {
                if (result.data.Status) {
                  setCategory(result.data.Result);
                } else {
                  alert(result.data.Error)
                }
              })
              .catch(err => {
                console.log(err)
              });
    axios.get("http://localhost:5000/auth/employees")
      .then(res => {
        if (res.data.Status) {
          setEmployees(res.data.Result);
        }
      })
      .catch(err => console.error("Error fetching employees:", err));
        axios.get("http://localhost:5000/auth/assets")
      .then(res => {
        if (res.data.Status) {
          setAssets(res.data.Result);
        }
      })
      .catch(err => console.error("Error fetching employees:", err));
},[]);
    
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assignment Submitted:", formData);
    axios.post('http://localhost:5000/admin/add_assignment', formData)
    .then(result => {
      if (result.data.Status) {
        navigate('/dashboard/assetoverview');
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.error("Axios Error:", err));

  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Assign Asset</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
                          <label>Asset Name *</label>
                          <select
    name="asset_name"
    value={formData.asset_name}
    onChange={handleChange}
    required
  >
    <option value=""disabled>Select Asset</option>
    {assets.map(asset => (
      <option key={asset.asset_id} value={asset.name}>
        {asset.name}
      </option>
    ))}
  </select>
              {/* <input
                type="text"
                name="asset_name"
                value={formData.asset_name}
                onChange={handleChange}
                placeholder="Asset name"
                required
              /> */}
            </div>

            <div>
              <label>Category *</label>
             <select
            name="category"
              value={formData.category}
             onChange={handleChange}
             required
  >
    <option value=""disabled>Select Category</option>
    {category.map(c => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>
            </div>

            <div>
                <label>Assigned To *</label>
                <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value=""disabled>Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.name}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                placeholder="Assigned to"
                required
              /> */}
            </div>

            

            <div>
              <label> Assign Date *</label>
              <input
                type="date"
                name="assign_date"
                value={formData.assign_date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Input description"
              rows="3"
            />
          </div>
        <div className="modal-actions">
         <button type="submit" className="btn add">
              Add
            </button>
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignAssetModal;

