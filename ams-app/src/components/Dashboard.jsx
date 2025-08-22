import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from '../assets/webmasters.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';


import axios from "axios";



const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
   const navigate = useNavigate()
  axios.defaults.withCredentials = true
   const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        navigate('/adminlogin')
      }
    })
  }
  return (
    // <div className="container-fluid">
    <div className={`container-fluid min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>

      <div className="row flex-nowrap">
        {/* <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-danger"> */}
        <div className={`col-auto ${collapsed ? 'col-1' : 'col-md-3 col-xl-2'} px-sm-2 px-0 bg-danger`}>

          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
             {/* <MenuOpenIcon
      className="mb-3"
      style={{ cursor: 'pointer', alignSelf: 'flex-end' }}
      onClick={() => setCollapsed(!collapsed)}
    /> */}
            <a
               href="https://webmasters.co.ke/"
                target="_blank"
                  rel="noopener noreferrer"
                   title="Visit Webmasters.co.ke"
            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
>

              <img 
                src={logo} 
                alt="webmasters" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '50px' 
                }}
              />
              </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
              <li className="w-100">
                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                  {/* <i className="bi bi-house-gear-fill ms-3"></i> */}
                  <DashboardIcon className="ms-3" />

                  {/* <span className={`ms-2 sidebar-text ${collapsed ? 'd-none' : 'd-inline'}`}>Dashboard</span> */}

                   <span className="ms-2 sidebar-text d-none d-sm-inline">Dashboard</span>
                  </Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white">
                   <i className="bi bi-tags ms-3"></i>
                  <span className="ms-2 sidebar-text d-none d-sm-inline">Category</span>
                  </Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/asset"
                  className="nav-link px-0 align-middle text-white">
                   <i className="bi bi-amd ms-3"></i>
                  <span className="ms-2 sidebar-text d-none d-sm-inline"> Assets</span>
                </Link>
              </li>
              <li className='w-100' onClick={handleLogout}>
                <Link
                  className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-box-arrow-right ms-3"></i>
                  <span className="ms-2 sidebar-text d-none d-sm-inline">Logout</span>
                   </Link>
              </li>
            </ul>
            <div className="mt-auto w-100 d-flex justify-content-end">
    {/* <MenuOpenIcon
      style={{ cursor: 'pointer' }}
      onClick={() => setCollapsed(!collapsed)}
    /> */}
  </div>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className='p-2 d-flex justify-content-between align-items-center shadow position-relative'>
          
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Dashboard