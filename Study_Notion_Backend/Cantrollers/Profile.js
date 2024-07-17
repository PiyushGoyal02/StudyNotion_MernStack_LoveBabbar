const ProfileModel = require("../Model/ProfileModel");
const User = require("../Model/User")
const {uploadImageToCloudinary} = require("../Utils/ImageUpload");

exports.updateProfile = async (req, res) => {
    try{

        // Fetched Data..
        const {gender, dateofBirth="", about="", contactNumber} = req.body;

        //  Get User Id 
        const UserKiId = req.User.id;
        console.log("UserKiId",UserKiId)

        //  Validation Check
        if(!gender || !dateofBirth || !about || !contactNumber){
            return res.status(400).json(
                {
                    success:false,
                    message:"All Field Are Required..."
                }
            )
        }

        const NewProfile = await ProfileModel.create({gender, dateofBirth, about, contactNumber});
        console.log("NewProfile", NewProfile)


        // Nya Data User Mai Store Kardo
        const UpdateProfileDataToUser = await User.findByIdAndUpdate(
            UserKiId,
            {
                $push:{ additionalDetails:NewProfile._id }
            },
            {new:true}
        )

        console.log("UpdateProfileDataToUser", UpdateProfileDataToUser)

        //  Responce Return 
        return res.status(200).json(
            {
                success:true,
                message:"Profile Updated SuccessFully...",
                UpdateProfileDataToUser
            }
        )


    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Profile CanNot Updated Plesae Try Again...",
            }
        )
    }
}


// Delete Account...
exports.deleteProfileAccount = async (req, res) => {
    try{

        // Get Id
        const UserId = req.User.id;

        // Validation Check
        const UserDetails = await User.findById(UserId);
        if(!UserDetails){
            return res.status(400).json(
                {
                    success:false,
                    message:"Sorry Sir User Exist nhi Karta..."
                }
            )
        }

        //  additionalDetails Delete Krdo
        await ProfileModel.findByIdAndDelete({_id:UserDetails.additionalDetails});

        // Delete User
        await User.findByIdAndDelete({_id:UserId});

        // Responce return 
        return res.status(200).json(
            {
                success:true,
                message:"Account Profile Deleted SuccessFully...."
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Account CanNot Deleted Please try Again....",
            }
        )
    }
}


// Get All User Details
exports.getAllUserDetails = async (req, res) => {
    try{

        // Fetch Id
        const fetchId = req.User.id;

        const AllDetails = await User.findById(fetchId).populate("additionalDetails").exec();

        // Validation
        if(!AllDetails){
            return res.status(400).json(
                {
                    success:false,
                    message:"Apke User Ki Detail nhi aae"
                }
            )
        }

        return res.status(200).json(
            {
                success:true,
                message:"All Details Fetched SuccessFully...",
                data: AllDetails
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Sorry Sir Apki All Details Nhi aae Please try Again..."
            }
        )
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try{

        const displayPicture = req.files.displayPicture
        const UserId = req.User.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            500,
            500
        )

        console.log(image);
        const updateProfile = await User.findByIdAndUpdate(
            {_id:UserId},
            {image:image.secure_url},
            {new:true}
        )

        res.send({
            success:true,
            message:"Image Uploaded SuccessFully...",
            data:updateProfile
        })


    }catch(error){
        console.log(error)
        return res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}


exports.getEnrolledCourse = async (req, res) => {
    try{

        const UserId = req.User.id;
        const UserDetails = await User.findOne(
            {_id:UserId})

            .populate("courses")
            .exec()

            if(!UserDetails){
                return res.status(401).json(
                    {
                        success:false,
                        message:`Could not find user with id: ${UserDetails}`
                    }
                )
            }

            return res.status(200).json(
                {
                    success:true,
                    data:UserDetails
                }
            )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}