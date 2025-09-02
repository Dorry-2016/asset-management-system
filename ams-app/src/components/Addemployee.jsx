import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Addemployee = () => {
    const [employee, setEmployee] = useState({
    name: "",
      email: "",
    staff_no: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const [assets, setAssets] = useState([]);

  const navigate = useNavigate()
  
  useEffect(() => {
  axios.get('http://localhost:5000/auth/asset')
    .then(result => {
      if (result.data.Status) {
        setAssets(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err));
    axios.get('http://localhost:5000/auth/category')
      .then(result => {
         if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
      })
    .catch (err => {
        console.log(err)
    });
      
      }, [])
    const handleSubmit = (e) => {
      e.preventDefault()
       const formData = new FormData();
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('staff_no', employee.staff_no);
      formData.append('image', employee.image);
      formData.append('category_id', employee.category_id);
        axios.post('http://localhost:5000/auth/add_employee', formData)
          .then(result => {
              if(result.data.Status) {
            navigate('/dashboard/employee')
              } else {
                
            alert(result.data.Error)
        }
            })
            .catch(err => console.log(err));
    }
  return (
      <div  className=' d-flex justify-content-center align-items-center min-vh-100'>
          <div className='p-3 rounded w-50 border'>
              <h3 className='text-center'>Add Employee</h3>
                  <form className='row g-1'onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label htmlFor="inputName" className='form-label'>Name</label>
            <input type="text" id="inputName"
              className='form-control rounded-0'
                          placeholder='Enter Name'
                          onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })}
                      />
                  </div>
                  <div className='col-12'>
                    <label htmlFor="inputEmail" className='form-label'>Email</label>
                      <input type="text" className='form-control rounded-0'
                          placeholder='Enter Email' autoComplete='off'
                          onChange={(e) =>
                            setEmployee({ ...employee, email: e.target.value })
                              }
                      />
          </div>
          <div className='col-12'>
            <label htmlFor="inputStaffNo" className='form-label'>Staff Number</label>
            <input type="number" id="inputstaffNo"
              className='form-control rounded-0'
              placeholder='Enter Staff Number'
              value={employee.staff_no} 
                    onChange={(e) =>
                setEmployee({ ...employee, staff_no: e.target.value })}
                      />
                  </div>
          
                  <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
                      <select name="category_id" id="category" className="form-select"
                          onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })}>
              <option value="">Select Category</option>
              {category.map((c) => {
                return<option key={c.id} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
            <div className='col-12'>
              <label className='form-label' for='inputGroupFile01'>Select Image</label>
                <input type="file"
                   className='form-control rounded-0'
                     id='inputGroupFile01'
                       name='image'
                        onChange={(e) =>
                            setEmployee({ ...employee, image: e.target.files[0] })
                              }/>
                   </div>
          <div className='col-12'>
            <div className="d-flex gap-2">
            <button
              type='submit' className='btn btn-danger px-2 py-2 burnt-orange-btn'>Add Employee</button>
            <button 
                type='button' 
                 className='btn btn-outline-secondary px-4 py-2'
                  onClick={() => navigate('/dashboard/employee')}
                 >Cancel
              </button>
              </div>
                  </div>
                  </form>
          </div>
            {/* </form > */}
          </div>
    
  )
}

export default Addemployee