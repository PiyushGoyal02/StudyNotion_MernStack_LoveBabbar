const otpGenerator = require('otp-generator');
const User = require("../Model/User")
const OTP = require("../Model/OTP")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const MailSender = require("../Utils/MailSender");
const Profile = require("../Model/ProfileModel")
const { passwordUpdated } = require("../Mail/Template/passwordUpdate")
require("dotenv").config();


//  Sign Up
exports.signUp = async (req, res) => {
    try{

        // Data Fetched From Request Body
        const {firstName, lastName, email, password, accountType, confirmPassword, contactNumber, otp} = req.body;

        // Validate Krlo     (Agr Esme Sai Kush Be Fill Nhi Kiya to Error Dedo ki All Field Required..)
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json(
                {
                    success:false,
                    message:"All Fields Are Required.."
                }
            )
        }

        //  PAssword or Confirm Password Check Kro
        if(password !== confirmPassword){
            return res.status(400).json(
                {
                    success:false,
                    message:"Sorry to Say But Password Or Confirm Password does Not Matched.."
                }
            )
        }

        // check User already Exits or Not
        const exitsEmail = await User.findOne({email});
        if(exitsEmail){
            return res.stauts(400).json(
                {
                    success:false,
                    message:"Sorry Sir This UserEmail all Ready Registerd.."
                }
            )
        }


        // Find Most Recet OTP Stored for the User.
        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOTP);

        // Validate OTP
        if(recentOTP.length == 0){
            return res.stauts(400).json(
                {
                    success:false,
                    message:"OTP Not Found.."
                }
            )
        }else if(otp !== recentOTP[0].otp){
            return res.status(400).json(
                {
                    success:false,
                    message:"OTP does Not Matched.. "
                }
            )
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("HashPassword =>", hashPassword);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

        // Data Store Db   (yai to mene Image Kai andar Ek API insert Ki hai yai Basically Hamre FirstName/LastName Kai Phle Letter sai Ikage Create Kar deta hai)
        const databody = await User.create(
            {
                firstName, 
                lastName, 
                email, 
                contactNumber, 
                password:hashPassword, 
                additionalDetails: profileDetails._id,
                accountType, 
                image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            })


        // Responce Return 
        return res.status(200).json(
            {
                success:true,
                databody,
                message:"User Is Registered SuccessFully..."
            }
        )

    }catch(error){
        console.log(error)
        return res.status(500).json(
            {
                success:false,
                message:"User CanNot be Registered... Please try..."
            }
        )
    }
}





// Login Handler Function...
exports.login = async (req, res) => {
    try{

        // Fetched Data Req.body
        const {email, password} = req.body;

        //  Validate Data
        if(!email || !password){
            return res.status(403).json(
                {
                    success:false,
                    message:"Sorry I Required All Field Data"
                }
            )
        }

        // Check kro yai Email Valid hai ya nhi
        const CheckEmail = await User.findOne({email});
        
        if(!CheckEmail){
            return res.status(401).json(
                {
                    success:false,
                    message:"Sorry Sir This Email Not Registered..."
                }
            )
        }

        const JWTPayload = {
            email: CheckEmail.email,
            id: CheckEmail._id,
            accountType: CheckEmail.accountType
        }
        // generate JWt Token, And After Matching...
        if(await bcrypt.compare(password, CheckEmail.password)){
            let token = JWT.sign(JWTPayload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
        
            CheckEmail.token = token;
            CheckEmail.password = undefined; 

            // Generate Cookie...

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }
            res.cookie("token", token, options).status(200).json(
                {
                    success:true,
                    token,
                    CheckEmail,
                    message:" LogIn SuccessFully...."
                }
            ) 
        }else{
            return res.status(401).json(
                {
                    success:false,
                    message:"Sorry Sir Password Incorrect... "
                }
            )
        }


    }catch(error){
        return res.stauts(500).json(
            {
                success:false,
                message:"Sorry Sir Login Ni Hua.... Please try Again"
            }
        )
    }
}



//  Send OTP 
exports.sendOTP = async (req, res) => {
    try{
        // Fetched email
        const {email} = req.body;

        // Check If Use Already Mail
        const CheckEmail = await User.findOne({email});

        // if User Already exist, then return A Responce
        if (CheckEmail){
            return res.status(401).json(
                {
                    success:false,
                    message:"User Already Registered.."
                }
            )
        }

        // Agr User Exist Nhi hai to 
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
        })

        console.log(" OTP Generate =>", otp);

        // Check Unique OTP
        const result = await OTP.findOne({ otp: otp });
        console.log("Result =>", result)
        console.log("OTP =>", otp)

        while(result){
            otp = otpGenerator.generate(6, {      // OTP Generate Hoga (generate Method sai) Uske Baad Jo 6 Ka Use hua hai vo OTP ki Length Hai or uske Baad Haam Apni Details De rhai hai ki haame kya kya need hai
                upperCaseAlphabets: false,
            });
            //  result = await OTP.findOne({OTPGen: OTPGen});    yai check kr rha hai ki Jo OTP aaya hai vo db Mai Store to Ni hai
        }

        // Create An Entry in db  
        const OTPPayload = {email, otp};

        // Create An Entry On OTP
        const OTPBody = await OTP.create(OTPPayload);
        console.log(OTPBody);

        // ResPonce Return 
        res.status(200).json(
            {
                success:true,
                OTPBody,
                otp,
                message:"OTP Sent SuccessFully..."
            }
        )

    }catch(error){
        console.log(error)
        res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}


//  Change Password
exports.changePassword = async (req, res) => {
    try{

        // Get User Data from req.User
        const UserDetail = await User.findById(req.User.id);

        // Get OldPassword, NewPassword, ConfirmPasword form req.body
        const {oldPassword, newPassword, confirmPassword} = req.body;

        // Validation Password..
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            UserDetail.password
        )

        if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

        // Mathed NewPassword And ConfirmPasword
        if(newPassword !== confirmPassword){
            return res.status(402).json(
                {
                    success:false,
                    message:"NewPassword, ConfirmPassword CanNot Matched..."
                }
            )
        }

        // Password Hashing 
        const PassHashing = await bcrypt.hash(newPassword, 10);
        const UpdateUserDetails = await User.findById(
            req.User.id,
            {$push:{password:PassHashing}},
            {new:true}
        );

        //  Updated Password Send Mail
        try{
            const MailSend = await MailSender(
                UpdateUserDetails.email,
                passwordUpdated(
                    UpdateUserDetails.email,
                    `Password Change/Updated SuccessFully ${UpdateUserDetails.firstName} ${UpdateUserDetails.lastName}`
                )
            )
        }catch(error){
            return res.stauts(403).json(
                {
                    success:false,
                    message:"Sorry Sir Change/Update Password Ka Mail Send Ni Hua"
                }
            )
        }

        // Responce Return 
        return res.stauts(200).josn(
            {
                success:true,
                message:"SuccessFully Done Password Change"
            }
        )

    }catch(error){
        return res.stauts(403).json(
            {
                success:false,
                message:"Error occurred while updating password",
                error:error.message
            }
        )
    }
}