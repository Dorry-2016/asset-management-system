import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editcategory = () => {
  const { id } = useParams(); // category id
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/category/${id}`)
      .then(result => {
        if (result.data.Status) {
          setCategory({ name: result.data.Result[0].name });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/auth/edit_category/${id}`, category)
      .then(res => {
        if (res.data.Status) {
          alert("Category updated successfully");
          navigate("/dashboard/category");
        } else {
          alert("Update failed: " + res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="p-3 rounded w-30 border">
        <h3 className="text-center">Edit Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">Category Name</label>
            <input
              type="text"
              id="categoryName"
              className="form-control"
              placeholder="Enter Category Name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              required
            />
          </div>
          <div className="d-flex gap-2">
          <button
            type="submit" className="btn btn-danger px-2 py-2">Update Category</button>
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
  );
};

export default Editcategory;
