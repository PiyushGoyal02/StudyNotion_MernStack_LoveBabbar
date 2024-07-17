// Import the Required modules
const express = require("express");
const router = express.Router();

// Import The Controllers....

// Course Controllers Import
const {
    createCourse,
    ShowAllCourses,
    getAllCourseDetails} = require("../Cantrollers/CourseCantrollers");


// Categories Controllers Import
const {
    createCategory,
    showAllCategory,
    CategoryPageDetails } = require("../Cantrollers/Category");

// Section Controllers Import
const {
    CreateSection,
    UpdateSection,
    deleteSection } = require("../Cantrollers/Section");

// Sub Section Controllers Import
const {
    subSectionCreate,
    updateSubSection,
    subSectionDelete } = require("../Cantrollers/SubSection");

// Rating Controllers Import 
const {
    createRating,
    getAveragerating,
    getAllRatingAndReview } = require("../Cantrollers/RatingAndReview");

// Auth MiddleWare Import
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin } = require("../MiddleWare/authMiddleWare")


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, CreateSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, UpdateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, subSectionDelete)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, subSectionCreate)
// Get all Registered Courses
router.get("/getAllCourses", ShowAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getAllCourseDetails)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************


// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategory)
router.post("/getCategoryPageDetails", CategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAveragerating)
router.get("/getReviews", getAllRatingAndReview)

module.exports = router