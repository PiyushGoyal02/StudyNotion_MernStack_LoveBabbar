const Course = require("../Model/Course");
// const course = require("../Model/Course");
const Category = require("../Model/Category");
const User = require("../Model/User");
const {uploadImageToCloudinary} = require("../Utils/ImageUpload");
require("dotenv").config();

// Create New Course Handler Function..
exports.createCourse = async (req, res) => {
    try{

        //  get User id form request Object
        const UserId = req.User.id 
        console.log('UserID', UserId)

        // Fetched Data
        let {courseName, courseDiscription, tag, thumbnail, price, whatYouWeLearn, category} = req.body;

        // Get thumbnail image from request files
		const thumbNail = req.files.thumbnailImage;

        // Get Thumbif
        if(!courseName || !courseDiscription || !tag || !thumbnail || !whatYouWeLearn || !price || !category){
            return res.status(403).json(
                {
                    success:false,
                    message:" All Field Are Required.."
                }
            )
        }

        //  Check for Instructor     Course Kai Andr Check Karna Hoga Ki Konsa Instructor Classes Lega Tbhi Haamne Usko DbCall kiya hai
        const userId = req.User.id;
        // console.log('userID', userId)

        const InstructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

        // Agr Haame Data ni Mila
        if(!InstructorDetails){
            return res.status(401).json(
                {
                    success:false,
                    message:" InstructorDEtails Is Missing.. Please try Again"
                }
            )
        }

        // Check given Tag Valid Or Not..
        const tagDetails = await Category.findById(tag);
        if(!tagDetails){
            return res.status(401).json(
                {
                    success:false,
                    message:" TagDetails Is Missing.. Please try Again"
                }
            )
        }

        // Upload Image top Cloudinary 
        const ImageUpoad = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //  Create An Entry New Course..
        const NewCourse = await Course.create({courseName, courseDiscription, instructor:InstructorDetails._id, price, tag:tagDetails._id, whatYouWeLearn:whatYouWeLearn, thumbnail:thumbnailImage.secure_url})

        // Add The New Course To The User Schema of Instructor..
        await User.findByIdAndUpdate(
            {_id: InstructorDetails._id},
            {
                $push:{
                    course:NewCourse._id
                }
            },
            {new:true},
        );

        //  Update the Tag Ka Schema 
        // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: NewCourse._id
				},
			},
			{ new: true }
		);


        return res.status(200).json(
            {
                success:true,
                message:"Course Created SuccessFully..",
                data:NewCourse
            }
        )
    }catch(error){
        console.log(error)
        return res.status(500).json(
            {
                success:false,
                message:"False To Create Course",
                error:error.message
            }
        )
    }
}


//  Get All Courses..
exports.ShowAllCourses = async (req, res) => {
    try{

        const allCourses = await Course.find({}, {courseName:true, price:true, thumbnail:true, instructor:true, ratingAndReviews:true, studentInRoll:true})
        .populate("instructor")
        .exec();

        return res.status(200).json(
            {
                success:true,
                message:"All Courses Fetched..",
                data:allCourses
            }
        )
    }catch(error){
        console.log(error)
        return res.status(500).json(
            {
                success:false,
                message:"CanNot Fetched Data",
                error:error.message
            }
        )
    }
}


//  Get All Course Details  (Esme Mujai Saara Data Chahiye Course ka)
exports.getAllCourseDetails = async (req, res) => {
    try{

        // Get id
        const {courseID} = req.body;

        // Find Course Details 
        const courseDetails = await Course.find(
            {_id:courseID})


            // Yai Mene Course Kai Saare data ko Populate Kar diya mujai ObjectId Nhi Chahiye Mujia Saar Contant Chahiye...
            .populate(
                {
                    path:"instructor",
                    populate:{path:"additionalDetails"}
                }
            )

            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path:"courseContant",
                populate:{
                    path:"subSection"
                }
            })
            .exec();

            // Validation
            if(!courseDetails){
                return res.status(400).json(
                    {
                        success:false,
                        message:`Could Not find The Course with ${courseId}`
                    }
                )
            }

            // Responce Return
            return res.status(200).json(
                {
                    success:true,
                    message:"Course Details Fetched SuccessFully...",
                    data:courseDetails
                }
            )

    }catch(error){
        return res.status(500).json(
            {
                success:true,
                message:error.message
            }
        )
    }
}