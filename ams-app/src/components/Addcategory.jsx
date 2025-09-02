import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addcategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/add_category', {category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err));
    }
  return (
      <div  className='d-flex justify-content-center align-items-center h-75'>
          <div className='p-3 rounded w-25 border'>
              <h3>Add Category</h3>
                  <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="category"><strong>Category:</strong></label>
                    <input type="text" name='category' placeholder='Enter Category'
                     onChange={(e) =>setCategory(e.target.value)} className='form-control rounded-0'/>
                  </div>
                  <div className="d-flex gap-2">
                  <button className='btn btn-danger px-2 py-2'>Add Category</button>
                   <button 
                type='button' 
                 className='btn btn-outline-secondary px-4 py-2'
                  onClick={() => navigate('/dashboard/category')}
                 >Cancel
                      </button>
                      </div>
            </form>
          </div>
    </div>
  )
}

    export default Addcategory