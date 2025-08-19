
// import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";



// const Asset = () => {
//   const [asset, setAsset] = useState([]);
//     const navigate = useNavigate()
//   useEffect(() => {
//     axios.get("http://localhost:5000/auth/asset")
//       .then((result) => {
//         if (result.data.Status) {
//           setAsset(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const handleDelete = (id) => {
    
//     axios.delete('http://localhost:5000/auth/delete_asset/'+id)
//     .then(result => {
//         if(result.data.Status) {
//             window.location.reload()
//         } else {
//             alert(result.data.Error)
//         }
//     })
//   }
   
//   return (
//     <div className='px-5 mt-3'>
//       <div  className='d-flex justify-content-center'>
//         <h2>Asset List</h2>
//       </div>
//       <Link to="/dashboard/add_asset" className='burnt-red-btn'>+</Link>
//       <div className='mt-3'>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>asset_id</th>
//               <th>Name</th>
//               <th>Location</th>
//               <th>Purchase date</th>
//               <th>Status</th>
//               <th>category</th>
//                <th>Action</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {asset.map((e) => (
//               <tr>
//                 <td>{e.asset_id}</td>
//                 <td>{e.name}</td>
//                 <td>{e.location}</td>
//                 <td>{e.purchasedate?.split('T')[0]}</td>
//                 <td>{e.status}</td>
//                 <td>{e.category_name}</td>
//                 <td>
                 
//                    <button className="btn btn-warning btn-sm me-2"
//                     title="view"
//                   >
//                     <i className="bi bi-eye"></i>
//                   </button>
//                   <Link
//                     to={`/dashboard/edit_asset/${e.asset_id}`}
//                     className="btn btn-primary btn-sm me-2"
//                     edit
//                   >
//                      <i className="bi bi-pencil-square"></i>
//                   </Link>
//                   <button className="btn btn-danger btn-sm me-2"
//                     onClick={() =>
//                       handleDelete(e.asset_id)}
//                    delete
//                   >
//                     <i className="bi bi-trash"></i>
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

// export default Asset
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Asset = () => {
  const [asset, setAsset] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/auth/asset")
      .then((result) => {
        if (result.data.Status) {
          setAsset(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/auth/delete_asset/' + id)
      .then(result => {
        if (result.data.Status) {
          // Reload assets after delete
          setAsset(prev => prev.filter(a => a.asset_id !== id));
        } else {
          alert(result.data.Error);
        }
      })
  }
  const filteredAssets = asset.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (a.category_name && a.category_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Asset List</h2>
      </div>
      
        {/* <Link to="/dashboard/add_asset" className='burnt-red-btn'>+</Link> */}
      <div className="d-flex mt-3 mb-3">
        <input
          type="text"
          placeholder="Search by name, location, category"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
          className="form-control me-3"
          style={{ maxWidth: "300px" }}
        />

        <select
          value={filterStatus}
          onChange={e => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); 
          }}
          className="form-select"
          style={{ maxWidth: "150px" }}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">In Use</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Maintenance">Retired</option>
        </select>
         <div className="flex-grow-1" />
         

        
        <Link
          to="/dashboard/add_asset"
          className="burnt-red-btn d-inline-flex align-items-center justify-content-center"
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            textDecoration: 'none',
            fontSize: 22,
          }}
        >
          +
        </Link>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>asset_id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Purchase date</th>
              <th>Status</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No assets found.</td>
              </tr>
            ) : (
              currentAssets.map((e) => (
                <tr key={e.asset_id}>
                  <td>{e.asset_id}</td>
                  <td>{e.name}</td>
                  <td>{e.location}</td>
                  <td>{e.purchasedate?.split('T')[0]}</td>
                  <td>{e.status}</td>
                  <td>{e.category_name}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" title="view">
                      <i className="bi bi-eye"></i>
                    </button>
                    <Link
                      to={`/dashboard/edit_asset/${e.asset_id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(e.asset_id)}
                      title="delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button onClick={() => changePage(currentPage - 1)} className="page-link">
              Previous
            </button>
          </li>

          {[...Array(totalPages).keys()].map((num) => (
            <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
              <button onClick={() => changePage(num + 1)} className="page-link">
                {num + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button onClick={() => changePage(currentPage + 1)} className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Asset;
