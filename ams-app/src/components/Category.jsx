import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
 
const Category = () => {
  const [category, setCategory] = useState([])
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
   const handleDelete = (id) => {
    
    axios.delete('http://localhost:5000/auth/delete_category/'+id)
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
        <h2>Category List</h2>
      </div>
      <Link to="/dashboard/add_category" className='burnt-red-btn'>Add Category</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map(c => (
                <tr>
                  <td>{c.name}</td>
                  <Link
                    to={`/dashboard/edit_category/` + c.id}
                     className="btn btn-primary btn-sm me-2"
                        title='edit'
                    >
                          <i className="bi bi-pencil-square"></i>
                </Link>
                       <button
                  className="btn btn-danger btn-sm me-2"
               onClick={() => handleDelete(c.id)}
            delete
               >
              <i className="bi bi-trash"></i>
                                      
                </button>
                </tr>
                 ))
                    }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category