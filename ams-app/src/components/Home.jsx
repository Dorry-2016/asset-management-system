
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUserShield, FaUsers, FaListAlt, FaBox } from 'react-icons/fa'
import DonutChart from './DonutChart';
import BarGraph from './BarGraph';       

const cardStyles = {
  admin: {
    backgroundColor: '#cfe2ff',
    color: '#084298',
    iconBg: '#084298',
  },
  employee: {
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
    iconBg: '#0f5132',
  },
  category: {
    backgroundColor: '#fff3cd',
    color: '#664d03',
    iconBg: '#664d03',
  },
  asset: {
    backgroundColor: '#f8d7da',
    color: '#842029',
    iconBg: '#842029',
  },
};

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [assetTotal, setAssetTotal] = useState(0);

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
  }, []);

  const StatCard = ({ title, total, icon: Icon, style }) => (
    <div
      className="d-flex flex-column justify-content-between p-4 rounded shadow-sm"
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        minWidth: 220,
        flex: '1 1 220px',
        maxWidth: 250,
        height: 140,
        margin: 8
      }}
    >
      <div className="d-flex align-items-center">
        <div
          style={{
            backgroundColor: style.iconBg,
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            color: 'white',
          }}
        >
          <Icon size={20} />
        </div>
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="mt-3 text-end">
        <h2 className="mb-0" style={{ fontWeight: 'bold' }}>{total}</h2>
      </div>
    </div>
  );

  return (
    
    <div className="container py-4" style={{ paddingTop: '80px' }}>
      <h4 className="mb-4">Welcome to the Asset Management System</h4>

      {/* Cards */}
      <div className="d-flex flex-wrap justify-content-between">
        <StatCard 
          title="Total Admins" 
          total={adminTotal} 
          icon={FaUserShield} 
          style={cardStyles.admin} 
        />
        <StatCard 
          title="Total Employees" 
          total={employeeTotal} 
          icon={FaUsers} 
          style={cardStyles.employee} 
        />
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
      </div>

      {/* Charts Section */}
      <div className="row mt-5 g-4">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="p-3 border shadow-sm rounded" style={{ maxWidth: 400, width: '100%' }}>
            <h5 className='mb-3 text-center'>Asset Distribution by Category</h5>
            <DonutChart />
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div className="p-3 border shadow-sm rounded" style={{ maxWidth: 400, width: '100%' }}>
            <h5 className='mb-3 text-center'>Asset Distribution</h5>
            <BarGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
