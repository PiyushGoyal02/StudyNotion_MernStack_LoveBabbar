// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../Cantrollers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../MiddleWare/authMiddleWare")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router