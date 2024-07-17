
const User = require("../Model/User");
const MailSender = require("../Utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require('crypto')

// Reset Password Token   (jab be Mai Apna Password Reset Kru To Mujai Yaad Rkhna Hai ki Sbse Phle Mai Apna Token Create Krlu  )

exports.resetPasswordToken = async (req, res) => {
    try{
        // get email from req body
        const email = req.body.email;

        //  Check User for This email, email Validation
        const UserEmail = await User.findOne({email : email});
        if(!UserEmail){
            return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
        }

        // Generate Token 
        // Token Ka use Karke Mai User Ki Entry Nikalu ga
        //  Taki Mai Baad Mai Nye Password Ko User Mai Daal Saku
        const token = crypto.randomBytes(20).toString("hex");

        // Update user by adding token nd expiration time..   (User kai Andr Mene Token or resetPasswordExpires Ki Value Change krdi)
        const UpdatedDetails = await User.findOneAndUpdate(
            {email:email},     // Esme Mene Phle findbyId Kr liya...  Email Kai Base Par Check Krlo
            {
                //  Or Chamge/Update Yai kar diya...
                token:token,
                resetPasswordExpires:Date.now() + 3600000     // esme mene 5min diya hai
            },
            {new:true}    // Eska Matlab hia ki Jo mera Updated Document Hota hai Milta hai mujai responce mai
        )

        console.log("DETAILS", UpdatedDetails);

        // Create Url..   (frountEnd) Ka Url hai ye 3000 localHost Par run ho rha hai
        // Haar Kisi user Kai Liye ek Nya Token Bnega different Token Kai base Mai Different Link open Hoga And Then Apna Pass Change Kar Rha hoga 
        const Url = `http://localhost:3000/update-password/${token}`

        // Send Mail Containing The Url...    (Esme mene Email, Body, Subject diya hai)
        await MailSender(email,      // email
            "Password Reset Link",        // Subject
            `Password Reset Link ${Url}`);     // Body


        // Return Responce
        res.status(401).json(
            {
                success:true,
                message:"Email Sent SuccessFully.. Please Check Email And ChangePassword.."
            }
        )


    }catch(error){
        console.log(error)
        return res.status(500).json(
            {
                success:false,
                message:"Sorry Sir CanNot Send Link On Your Email.. Please try Again.."
            }
        )
    }
}




// Reset Password
exports.resetPassword = async (req, res) => {
    try{
        //  Data Fetched
        const {password, confirmPassword, token} = req.body;

        // Validation
        if(password !== confirmPassword){
            return res.status(402).json(
                {
                    success:false,
                    message:"Sorry Sir Your Password is not matching..."
                }
            )
        }

        // Get UsrDetails from db using token    (Token kai Adara Par User Ki Details Fetch Kar kai Lao gai)
        const userdetails = await User.findOne({token:token});

        // If Not entry Invalid Token
        if(!userdetails){
            return res.status(403).json(
                {
                    success:false,
                    message:"Token is InValid..."
                }
            )
        }

        //  Token Ka Time Check kro 
        if(!(userdetails.resetPasswordExpires > Date.now())){
            return res.status(403).json(
                {
                    success:false,
                    message:"Token Is Expired Please regenrate Token"
                }
            )
        }

        //  Hashing Password
        const HashPass = await bcrypt.hash(password, 10);

        // Password Update
        await User.findOneAndUpdate(
            {token:token},     // Token Kai Base Par Update Karna hai
            {password:HashPass},   // Password Update Karna hai
            {new:true}   // Latest Document Responce Mai Send Krdo
        )

        // Responce 
        return res.status(200).json(
            {
                success:true,
                message:"Password Reset SuccessFully..."
            }
        )

    }catch(error){
        console.log(error)
        return res.stauts(500).json(
            {
                success:false,
                message:"Sorry Passord CanNot Reset Please try Again"
            }
        )
    }
}