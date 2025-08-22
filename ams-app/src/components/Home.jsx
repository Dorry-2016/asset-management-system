
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUserShield, FaUsers, FaListAlt, FaBox } from 'react-icons/fa'
import './style.css';
import DonutChart from './DonutChart';
import BarGraph from './BarGraph';

      

const cardStyles = {
  admin: {
    backgroundColor: 'white',
    color: 'black',
    iconBg: '#084298',
  },
  employee: {
    backgroundColor: 'white',
    color: 'black',
    iconBg: '#084298',
  },
  category: {
    backgroundColor: 'white',
    color: 'black',
    iconBg: '#084298',
  },
  asset: {
    backgroundColor: 'white',
    color: 'black',
    iconBg: '#084298',
  },
   maintenance: {
    backgroundColor: 'white',
    color: 'black',
    iconBg: '#084298',
  },
};

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [assetTotal, setAssetTotal] = useState(0);
  const [assetMaintenanceTotal, setAssetMaintenanceTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [assetNameData, setAssetNameData] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:5000/auth/admin_count')
      .then(result => {
        if (result.data.Status) setAdminTotal(result.data.Result[0].admin);
      });
    axios.get('http://localhost:5000/auth/employee_count')
      .then(result => {
        if (result.data.Status) setEmployeeTotal(result.data.Result[0].employee);
      });
    axios.get('http://localhost:5000/auth/category_count')
      .then(result => {
        if (result.data.Status) setCategoryTotal(result.data.Result[0].category);
      });
    axios.get('http://localhost:5000/auth/asset_count')
      .then(result => {
        if (result.data.Status) setAssetTotal(result.data.Result[0].asset);
      });
    axios.get('http://localhost:5000/auth/asset_maintenance_count')
    .then(result => {
    if (result.data.Status) setAssetMaintenanceTotal(result.data.Result[0].asset);
    });
     axios.get("http://localhost:5000/auth/asset_distribution/category")
    .then(result => {
      if (result.data.Status) setCategoryData(result.data.Result);
    });

  axios.get("http://localhost:5000/auth/asset_distribution/name")
    .then(result => {
      if (result.data.Status) setAssetNameData(result.data.Result);
    });

  }, []);

  const StatCard = ({ title, total, icon: Icon, style }) => (
    <div
      className="d-flex align-items-center p-3 rounded shadow-sm"
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        minWidth: 220,
        flex: '1 1 220px',
        maxWidth: 250,
        minHeight: 80,
        // margin: 8
      }}
    >
      <div className="d-flex align-items-center">
        <div
          style={{
            backgroundColor: style.iconBg,
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
            color: 'white',
            flexShrink: 0
          }}
        >
          <Icon size={22} />
        </div>
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="mt-3 text-end">
        <h2 className="mb-0" style={{ fontWeight: 'bold' }}>{total}</h2>
      </div>
    </div>
  );

  return (
    <div className="container py-4" style={{
      paddingTop: '80px',
      backgroundColor: '#F2F3F9',
      minHeight: '100vh' 

    }}>
      <h4 className="mb-0">Welcome to the Asset Management System</h4>
      <h6 className="mb-4">Track and manage channel transactions here</h6>

      <div className="d-flex flex-wrap justify-content-between">
        <StatCard 
          title="Total Admins" 
          total={adminTotal} 
          icon={FaUserShield} 
          style={cardStyles.admin} 
        />
        {/* <StatCard 
          title="Total Employees" 
          total={employeeTotal} 
          icon={FaUsers} 
          style={cardStyles.employee} 
        /> */}
        <StatCard 
          title="Total Categories" 
          total={categoryTotal} 
          icon={FaListAlt} 
          style={cardStyles.category} 
        />
        <StatCard 
          title="Total Assets" 
          total={assetTotal} 
          icon={FaBox} 
          style={cardStyles.asset} 
        />
        <StatCard 
      title="Assets Under Maintenance" 
      total={assetMaintenanceTotal} 
       icon={FaBox}
       style={cardStyles.maintenance} 
/>

      </div>
      <div className="row mt-3 g-2">
        <div className="col-md-6 d-flex justify-content-center">
          <div className=""
            style={{
              maxWidth: 400,
              width: '100%',
              backgroundColor: "#fff",
              
              

            }}>
            <DonutChart data={categoryData} />
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div className="p-3 border shadow-sm rounded" style={{ maxWidth: 400, width: '100%' }}>
            <h5 className='mb-3 text-center'>Asset Distribution by name</h5>
            <BarGraph data={assetNameData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
