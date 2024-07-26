import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from '../src/Pages/Home'
import Navbar from "./components/common/Navbar";
import Login from './Pages/Login'
import Signup from "../src/Pages/Signup"
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "../src/Pages/UpdatePassword"
import VerifyEmail from "./Pages/VerifyPage";
import AboutPage from "./Pages/AboutPage";
import ContactUs from "./Pages/ContactUs";


function App() {
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
      </Routes>
    </div>
  );
}

export default App;
