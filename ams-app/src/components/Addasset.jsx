// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'



// const Addasset = () => {
//     const [asset, setAsset] = useState({
//     asset_id: "",
//     name: "",
//     category_id: "",
//     purchasedate: "",
//     location: "",
//     status: "active",
    
    
//   });
//   const [category, setCategory] = useState([]);
//       const navigate = useNavigate()
  
//       useEffect(() => {
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
//       });
//       }, [])
//     const handleSubmit = (e) => {
//       e.preventDefault()
//       const formData = new FormData();
//       formData.append('asset_id', asset.asset_id);
//       formData.append('name', asset.name);
//       formData.append('category_id', asset.category_id); 
//       formData.append('purchasedate', asset.purchasedate);
//       formData.append('location', asset.location);
//       formData.append('status', asset.status);
        
//         axios.post('http://localhost:5000/admin/add_asset', formData)
//           .then(result => {
//               if(result.data.Status) {
//             navigate('/dashboard/asset')    
//         } else {
//             alert(result.data.Error)
//         }
//             })
//             .catch(err => console.log(err));
//     }
//   return (
//       <div  className=' d-flex justify-content-center align-items-center min-vh-100'>
//           <div className='p-3 rounded w-50 border'>
//               <h3 className='text-center'>Add Asset</h3>
//               <form className='row g-1' onSubmit={handleSubmit}>
//                     <div className='col-12'>
//                       <label For="inputAssetId" className='form-label'>Asset ID</label>
//                       <input type="text" id="inputAssetId"
//                         className='form-control rounded-0'
//                         placeholder='Enter Asset ID'
//                         onChange={(e) =>
//                               setAsset({ ...asset, asset_id: e.target.value })}
//                       />
//                     </div>
                  
//                 <div className='col-12'>
//                     <label For="inputName" className='form-label'>Name</label>
//             <input type="text" id="inputName"
//               className='form-control rounded-0'
//                           placeholder='Enter Name'
//                           onChange={(e) =>
//                 setAsset({ ...asset, name: e.target.value })}
              
//                       />
//           </div>
//            <div className="col-12">
//             <label for="category" className="form-label">
//               Category
//             </label>
//                       <select name="category_id" id="category" className="form-select"
//                           onChange={(e) =>
//                             setAsset({ ...asset, category_id: e.target.value })}>
//               {category.map((c) => {
//                 return <option value={c.id}>{c.name}</option>;
//               })}
//             </select>
//           </div>
//                   <div className='col-12'>
//                     <label for="inputpurchasedate" className='form-label'>purchase date</label>
//                       <input type="date" className='form-control rounded-0'
//                           placeholder='Enter purchasedate' autoComplete='off'
//                           onChange={(e) =>
//                             setAsset({ ...asset, purchasedate: e.target.value })
//                               }
//                       />
//                   </div>
//                   <div className='col-12'>
//                     <label for="inputLocation" className='form-label'>Location</label>
//                       <input type="text" className='form-control rounded-0' id='inputLocation'
//                           placeholder='Enter Location'
//                       onChange={(e) =>
//                             setAsset({ ...asset, location: e.target.value })
//                               }/>
//           </div>
//            <div className='col-12'>
//                     <label for="inputLocation" className='form-label'>Status</label>
//                       <input type="text" className='form-control rounded-0' id='inputstatus'
//                           placeholder='Enter Status'
//                       onChange={(e) =>
//                             setAsset({ ...asset, status: e.target.value })
//                               }/>
//                   </div>
//                   <div className='col-12'>
//                       <button type='submit' className='btn w-100 rounded-0 mb-2 burnt-orange-btn'>Add Asset</button>
//                   </div>
//                   </form>
//           </div>
//             {/* </form > */}
//           </div>
    
//   )
// }

// export default Addasset;
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addasset = () => {
  const [asset, setAsset] = useState({
    asset_id: "",
    name: "",
    category_id: "",
    purchasedate: "",
    location: "",
    status: "active ",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

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
    axios.get('http://localhost:5000/admin/latest_asset')
      .then(result => {
        if (result.data.Status) {
          const lastId = result.data.latestId;
          const nextId = generateNextId(lastId);
          setAsset(prev => ({ ...prev, asset_id: nextId }));
        }
      })
      .catch(err => console.log(err));
  }, []);
    const generateNextId = (lastId) => {
    if (!lastId) return "AST-001"; 
    const num = parseInt(lastId.split("-")[1]) + 1;
    return `AST-${num.toString().padStart(3, "0")}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('asset_id', asset.asset_id);
    formData.append('name', asset.name);
    formData.append('category_id', asset.category_id);
    formData.append('purchasedate', asset.purchasedate);
    formData.append('location', asset.location);
    formData.append('status', asset.status);
    formData.append('image', asset.image);

    axios.post('http://localhost:5000/admin/add_asset', formData)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/asset')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
      <div className='p-4 rounded w-75 shadow bg-white'>
        <h3 className='text-center mb-4'>Add New Asset</h3>
        <form onSubmit={handleSubmit}>
          <div className='row g-3'>
            <div className="col-md-6">
              <label htmlFor="inputAssetId" className='form-label fw-semibold'>Asset ID <span className="text-danger">*</span></label>
              <input
                type="text"
                id="inputAssetId"
                className='form-control'
                placeholder='Enter Asset ID'
                required
                value={asset.asset_id}
                readOnly
                // onChange={e => setAsset({ ...asset, asset_id: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputName" className='form-label fw-semibold'>Name <span className="text-danger">*</span></label>
              <input
                type="text"
                id="inputName"
                className='form-control'
                placeholder='Enter Name'
                required
                value={asset.name}
                onChange={e => setAsset({ ...asset, name: e.target.value })}
              />
            </div>
            

            <div className="col-md-6">
              <label htmlFor="category" className='form-label fw-semibold'>Category <span className="text-danger">*</span></label>
              <select
                id="category"
                className='form-select'
                required
                value={asset.category_id}
                onChange={e => setAsset({ ...asset, category_id: e.target.value })}
              >
                <option value="" disabled>Choose category</option>
                {category.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="inputPurchaseDate" className='form-label fw-semibold'>Purchase Date <span className="text-danger">*</span></label>
              <input
                type="date"
                id="inputPurchaseDate"
                className='form-control'
                required
                max={new Date().toISOString().split("T")[0]}
                value={asset.purchasedate}
                onChange={e => setAsset({ ...asset, purchasedate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
             <label htmlFor="inputImage" className='form-label fw-semibold'>
                Asset Image <span className="text-danger">*</span>
                 </label>
              <input type="file"
                className='form-control rounded-0'
                id='inputGroupFile01'
                name='image'
                required
                onChange={e => setAsset({ ...asset, image: e.target.files[0] })}
              />
          </div>

            <div className="col-md-6">
              <label htmlFor="inputLocation" className='form-label fw-semibold'>Location <span className="text-danger">*</span></label>
              <input
                type="text"
                id="inputLocation"
                className='form-control'
                placeholder='Enter Location'
                required
                value={asset.location}
                pattern="[A-Za-z\s]+" 
                title="Location must contain only letters"
                onChange={e => setAsset({ ...asset, location: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputStatus" className='form-label fw-semibold'>Status <span className="text-danger">*</span></label>
              <select
                id="inputStatus"
                className='form-select'
                required
                value={asset.status}
                onChange={e => setAsset({ ...asset, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
              </select>
              
            </div>
          </div>

          <div className='mt-4 d-flex justify-content-end gap-2'>
            <button type='submit' className='btn btn-primary px-4 py-2'>
              Add Asset
            </button>
            <button 
                type='button' 
                 className='btn btn-outline-secondary px-4 py-2'
                  onClick={() => navigate('/dashboard/asset')}
                 >Cancel
               </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addasset;
