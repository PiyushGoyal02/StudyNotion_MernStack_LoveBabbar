const express = require("express")
const router = express.Router()
const { auth } = require("../MiddleWare/authMiddleWare")

const {
  deleteProfileAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourse,
} = require("../Cantrollers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", deleteProfileAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourse)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router