
import "./style.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AssignAssetModal from "./AssignAssetModal";
import axios from "axios"; 

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function AssetOverview({  onAddMaintenance, maintenanceLogs = [] }) {
    // console.log('Rendering AssetOverview with:', { assignments, maintenanceLogs });
  const location = useLocation();
  const { asset } = location.state || {};
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  //  const handleAssignSubmit = (formData) => {
  //   console.log("Assignment submitted from modal:", formData);
  //   if (onAddAssign) onAddAssign(formData);
  //   setShowAssignModal(false);
  // };
   // Fetch assignments for this asset
  useEffect(() => {
    if (asset?.asset_id) {
      fetchAssignments();
    }
  }, [asset?.asset_id]);

  const fetchAssignments = () => {
    axios
      .get(`http://localhost:5000/admin/assets/${asset.asset_id}/assignments`)
      .then((res) => {
        if (res.data.Status) {
          setAssignments(res.data.Result);
        } else {
          console.error(res.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching assignments:", err));
  };

  const handleAssignSubmit = (formData) => {
    // Add assignment to DB
    axios
      .post("http://localhost:5000/admin/add_assignment", formData)
      .then((res) => {
        if (res.data.Status) {
          // Refresh assignment list
          fetchAssignments();
          setShowAssignModal(false);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error("Axios Error:", err));
  };
    
  return (
    <div className="overview">
      <div className="title-block">
        <h1>Asset Overview</h1>
        <p className="subtitle">Track and manage channel transactions here</p>
      </div>

      <section className="asset-card">
       <img className="asset-photo"
        src={asset?.image ? `http://localhost:5000/Images/${asset.image}` : "/assets.jpeg"}       
              />
          <div className="asset-info">
            <div className="grid">
              <p><b>asset_id:</b>{asset?.asset_id || ""}</p>
              <p><b>Name:</b>{asset?.name || ""}</p>
              <p><b>Location:</b> {asset?.location || ""}</p>
              <p><b>Purchase date:</b>{asset?.purchasedate || ""}</p>
              <p><b>Status:</b>{asset?.status || ""}</p>
            <p><b>Category:</b>{asset?.category_name || ""}</p>
             <p><b>Assigned To:</b>{asset?.assigned_to || ""}</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Assignment History</h3>
          <button className="circle-add"
            onClick={() => setShowAssignModal(true)}
            aria-label="Add assignment">+</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="check-col"></th>

                <th>Asset Name</th>
                <th>Assigned To</th>
                <th>Location</th>
                <th>Description</th>
                <th>Category</th>
                <th>Assign Date</th>
               

              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td><input type="checkbox" /></td>
                    <td>{assignment.asset_name}</td> 
                    <td>{assignment.assigned_to}</td>
                    <td>{assignment.location}</td> 
                    <td>{assignment.description}</td>
                    <td>{assignment.category}</td> 
                    <td>{formatDate(assignment.assign_date)}</td>
                    <td>
                      <span className={`badge ${assignment.status === 'Active' ? 'inuse' : ''}`}>
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                    No assignment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Maintenance Log</h3>
          <button className="circle-add"
            onClick={onAddMaintenance} aria-label="Add maintenance">+</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="check-col"></th>
                <th>Date</th>
                <th>Description</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.length > 0 ? (
                maintenanceLogs.map(log => (
                  <tr key={log.id}>
                    <td><input type="checkbox" /></td>
                    <td>{new Date(log.date).toLocaleDateString()}</td>
                    <td>
                      <div><strong>{log.description}</strong></div>
                      {log.notes && <div className="notes">{log.notes}</div>}
                    </td>
                    <td>{log.performed_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                    No maintenance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
       {showAssignModal && (
        <AssignAssetModal
           assetId={asset.asset_id} 
          onClose={() => setShowAssignModal(false)}
           onSubmit={handleAssignSubmit}
        />
      )}
    </div>
  );
}