import "./App.css";
import Login from './Pages/Login'
import Home from '../src/Pages/Home'
import Signup from "../src/Pages/Signup"
import AboutPage from "./Pages/AboutPage";
import ContactUs from "./Pages/ContactUs";
import DashBoard from "./Pages/DashBoard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import VerifyEmail from "./Pages/VerifyPage";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ACCOUNT_TYPE } from "./utils/constants";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import Cart from "./components/core/DashBoard/Cart";
import OpenRoute from "./components/core/Auth/OpenRoute"
import UpdatePassword from "../src/Pages/UpdatePassword"
import Settings from "./components/core/DashBoard/Settings";
import MyProfile from "./components/core/DashBoard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledCourses from "./components/core/DashBoard/EnrolledCourses";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile) 
  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        /> 

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        /> 

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        /> 

        <Route
          path="about"
          element={
            <OpenRoute>
              <AboutPage />
            </OpenRoute>
          }
        /> 

        <Route
          path="contact"
          element={
            <OpenRoute>
              <ContactUs />
            </OpenRoute>
          }
        /> 

        <Route
          element={
            <PrivateRoute>
              <DashBoard/>
            </PrivateRoute>
          }
        
        />

        <Route 
      element={
        <PrivateRoute>
          <DashBoard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

    </Route>

      </Routes>
    </div>
  );
}

export default App;
