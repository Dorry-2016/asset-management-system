
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Asset from './components/Asset';
import Category from './components/Category';
import Profile from './components/Profile';
import Addcategory from './components/Addcategory';
import Addemployee from './components/Addemployee';
import Editemployee from './components/Editemployee';
import Addasset from './components/Addasset';
import Editasset from './components/Editasset';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Editcategory from './components/Editcategory';
import ForgotPass from './components/ForgotPass';
import VerifyOtp from './components/VerifyOtp'; 
import ResetPassword from "./components/ResetPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/adminlogin' element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="ForgotPass" element={<ForgotPass />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />}> 
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/asset'element={<Asset />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_category' element={<Addcategory />}></Route>
          <Route path='/dashboard/add_employee' element={<Addemployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<Editemployee />}></Route>
          <Route path='/dashboard/add_asset' element={<Addasset />}></Route>
          <Route path='/dashboard/edit_asset/:id' element={<Editasset />}></Route>
          <Route path="/dashboard/edit_category/:id" element={<Editcategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
