// import React from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect, useState } from 'react'


// const Editemployee = () => {
//     const { id } = useParams()
//      const [employee, setEmployee] = useState({
//         name: "",
//         email: "",
//         category_id: "",
//      });
//       const [category, setCategory] = useState([])
    
//      useEffect(() => {
//     axios.get('http://localhost:5000/auth/category')
//       .then(result => {
//          if(result.data.Status) {
//                 setCategory(result.data.Result);
//             } else {
//                 alert(result.data.Error)
//             }
//       })
//     .catch (err => {
//         console.log(err)
//     });
//            axios.get('http://localhost:3000/auth/employee/'+id)
//         .then(result => {
//             setEmployee({
//                 // ...employee,
//                 name: result.data.Result[0].name,
//                 email: result.data.Result[0].email,
//                 category_id: result.data.Result[0].category_id,
//             })
//         }).catch(err => console.log(err))
//   }, [])
//     return (
//        <div  className='d-flex justify-content-center align-items-center min-vh-100'>
//           <div className='p-3 rounded w-50 border'>
//               <h3 className='text-center'>Edit Employee</h3>
//                   <form className='row g-1'>
//                 <div className='col-12'>
//                     <label For="inputName" className='form-label'>Name</label>
//             <input type="text" id="inputName"
//               className='form-control rounded-0'
//                             placeholder='Enter Name'
//                             value={employee.name}
//                           onChange={(e) =>
//                 setEmployee({ ...employee, name: e.target.value })}
              
//                       />
//                   </div>
//                   <div className='col-12'>
//                     <label for="inputEmail4" className='form-label'>Email</label>
//                       <input type="text" className='form-control rounded-o'
//                             placeholder='Enter Email' autoComplete='off'
//                             value={employee.email}
//                           onChange={(e) =>
//                             setEmployee({ ...employee, email: e.target.value })
//                               }
//                       />
//                   </div>
//                   {/* </div> */}
//                   <div className="col-12">
//             <label for="category" className="form-label">
//               Category
//             </label>
//                       <select name="category_id" id="category" className="form-select"
//                           onChange={(e) =>
//                             setEmployee({ ...employee, category_id: e.target.value })}>
//               {category.map((c) => {
//                 return <option value={c.id}>{c.name}</option>;
//               })}
//             </select>
//           </div>
                   
//                   <div className='col-12'>
//                       <button type='submit' className='btn w-100 rounded-0 mb-2 burnt-orange-btn'>Edit Employee</button>
//                   </div>
//                   </form>
//           </div>
//             {/* </form > */}
//           </div>
    
//   )
// }

// export default Editemployee
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editasset = () => {
  const { id } = useParams();
    const [asset, setAsset] = useState({
    asset_id: "",
    name: "",
    purchasedate: "",
    location: "",
    status: "",
    category_id: "",
    
  });

    const [category, setCategory] = useState([]);
     const navigate = useNavigate()

  useEffect(() => {
    
    axios.get('http://localhost:5000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/auth/asset/' +id)
      .then(result => {
        
        const emp = result.data.Result[0];
         const formattedDate = emp.purchasedate?.split('T')[0];
        setAsset({
        asset_id: emp.asset_id,
        name: emp.Name,
        purchasedate: formattedDate,
        location: emp.Location,
        status: emp.Status,
        category_id: emp.category_id
        });
      })
      .catch(err => console.log(err));
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5000/auth/edit_asset/' + asset.asset_id, asset)
      .then(res => {
        if (res.data.Status) {
          alert("Asset updated successfully");
          navigate("/dashboard/asset");
        } else {
          alert("Update failed: " + res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Edit Asset</h3>
              <form className='row g-1' onSubmit={handleSubmit}>
                  <div className='col-12'>
                  <label htmlFor="inputAssetId" className='form-label'>Asset ID</label>
                  <input
                      type="text"
                      id="inputAssetId"
                      className='form-control rounded-0'
                      placeholder='Enter Asset ID'
                      value={asset.asset_id}  
                      // onChange={(e) => setAsset({ ...asset, asset_id: e.target.value })}
                  />
            </div>
          <div className='col-12'>
            <label htmlFor="inputName" className='form-label'>Name</label>
            <input
              type="text"
              id="inputName"
              className='form-control rounded-0'
              placeholder='Enter Name'
              value={asset.name}
              onChange={(e) => setAsset({ ...asset, name: e.target.value })}
            />
          </div>
          <div className='col-12'>
            <label htmlFor="inputPurchasedate" className='form-label'>Purchasedate</label>
            <input
              type="date"
              id="inputPurchasedate"
              className='form-control rounded-0'
              placeholder='Enter Purchasedate'
            //   autoComplete='off'
              value={asset.purchasedate}
              onChange={(e) => setAsset({ ...asset, purchasedate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="category_id"
              id="category"
              className="form-select"
              value={asset.category_id}
              onChange={(e) =>
                setAsset({ ...asset, category_id: e.target.value })}
            >
              <option value="">-- Select Category --</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
                  </div>
                  <div className='col-12'>
                  <label htmlFor="inputLocation" className='form-label'>Location</label>
                  <input
                      type="text"
                      id="inputLocation"
                      className='form-select'
                      placeholder='Enter Location'
                      value={asset.location}  
              onChange={(e) => setAsset({ ...asset, location: e.target.value })}
              
                  />
                  </div>
                  <div className='col-12'>
                  <label htmlFor="inputStatus" className='form-label'>Status</label>
                  <input
                      type="text"
                      id="inputStatus"
                      className='form-control rounded-0'
                      placeholder='Enter Status'
                      value={asset.status}  
                      onChange={(e) => setAsset({ ...asset, status: e.target.value })}
                  />
            </div>
          <div className='col-12'>
            
            <button type='submit' className='btn w-100 rounded-0 mb-2 burnt-orange-btn'>
              Edit Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editasset;
