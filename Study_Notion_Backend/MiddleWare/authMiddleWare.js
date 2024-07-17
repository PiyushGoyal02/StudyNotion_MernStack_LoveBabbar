const JWT = require('jsonwebtoken')
const User = require("../Model/User");
require("dotenv").config();

// Authentication Checking
// Authentication Check Karne Kai Liye JWT Token Verify Krna Hota hai
exports.auth = async (req, res, next) => {
    try{
        // Fetched/Extract Token 
        const token = req.cookies.token || req.body.token
        console.log(token)

        //  Check Kro Ki Token Hai ya ni
        if(!token){
            return res.status(401).json(
                {
                    success:false,
                    message:"Sorry Sir Token is Missing..."
                }
            )
        }

        // Verify the Token 
        try{
            const decode = JWT.verify(token, process.env.JWT_SECRET)
            console.log("Decode =>", decode);

            // Role Ki Value Req kai Andr  (Req kai Andr be Role Ko Insert Kar diya ) 
            req.User = decode;
            // Verification Issue
        }catch(error){
            return res.status(401).json(
                {
                    success:false,
                    message:"Token Is inValid"
                }
            )
        }

        next();
    }catch(error){
        return res.status(401).json(
            {
                success:false,
                message:"SomeThing went wrong validate For Decode"
            }
        )
    }
}

// isStudent 
exports.isStudent = async (req, res, next) => {
    try{
        if(req.User.accountType !== "Student"){
            return res.status(401).json(
                {
                    success:false,
                    message:"Sorry Sir This is Protected Route Only for Students..."
                }
            )
        }
        //  agr Yai Valid Route Nhi hoga To mai Next Route Par Jump Kar Jauga..
        next();
    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"User Role CanNot be Verifyed Please Try Again!...."
            }
        )
    }
}



// isInstructor 
exports.isInstructor = async (req, res, next) => {
    try{
        console.log("req.User.accountType", req.User.accountType)
        if(req.User.accountType !== "Instructor"){
            return res.status(401).json(
                {
                    success:false,
                    message:"Sorry Sir This is Protected Route Only for Instructor..."
                }
            )
        }
        //  agr Yai Valid Route Nhi hoga To mai Next Route Par Jump Kar Jauga..
        next();
    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"User Role CanNot be Verifyed Please Try Again!...."
            }
        )
    }
}



//  isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.User.accountType !== "Admin"){
            return res.status(401).json(
                {
                    success:false,
                    message:"Sorry This is Protected Route Only For Admin.."
                }
            )
        }

        next();

    }catch(error){
        console.log(error)
        return res.stauts(500).json(
            {
                success:false,
                message:"User Role CanNot Verify Please Try Again!..."
            }
        )
    }
}