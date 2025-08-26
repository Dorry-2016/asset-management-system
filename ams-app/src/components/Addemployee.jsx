import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Addemployee = () => {
    const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
      const navigate = useNavigate()
  
      useEffect(() => {
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
      formData.append('image', employee.image); 
      formData.append('email', employee.email);
      formData.append('password', employee.password);
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
                    <label For="inputName" className='form-label'>Name</label>
            <input type="text" id="inputName"
              className='form-control rounded-0'
                          placeholder='Enter Name'
                          onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })}
              
                      />
                  </div>
                  <div className='col-12'>
                    <label for="inputEmail4" className='form-label'>Email</label>
                      <input type="text" className='form-control rounded-0'
                          placeholder='Enter Email' autoComplete='off'
                          onChange={(e) =>
                            setEmployee({ ...employee, email: e.target.value })
                              }
                      />
                  </div>
                  <div className='col-12'>
                    <label for="inputPassword4" className='form-label'>Password</label>
                      <input type="text" className='form-control rounded-0' id='inputPassword4'
                          placeholder='Enter Password'
                      onChange={(e) =>
                            setEmployee({ ...employee, password: e.target.value })
                              }/>
                  </div>
                  <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
                      <select name="category_id" id="category" className="form-select"
                          onChange={(e) =>
                            setEmployee({ ...employee, category_id: e.target.value })}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
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
                      <button type='submit' className='btn w-100 rounded-0 mb-2 burnt-orange-btn'>Add Employee</button>
                  </div>
                  </form>
          </div>
            {/* </form > */}
          </div>
    
  )
}

export default Addemployee