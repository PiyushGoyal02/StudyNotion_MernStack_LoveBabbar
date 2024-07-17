const Section = require("../Model/Section");
// const Courses = require("../Model/Course");
const Course = require("../Model/Course");

// Create Section
exports.CreateSection = async (req, res) => {
    try{
        // Data Fetch..
        const {sectionName, courseId} = req.body

        // Validation Data
        if (!sectionName || !courseId){
            return res.stauts(400).json(
                {
                    success:false,
                    message:"Missing Properties.."
                }
            )
        }

        // Create Section
        const NewSection = await Section.create({sectionName})

        // Update Course With Section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{courseContant:NewSection._id}
            },
            {new:true}
        )

        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // Return Responce
        return res.status(200).json(
            {
                success:true,
                message:"Section Created SuccessFully...",
                updatedCourseDetails
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Section CanNot Created PLease Try Again...",
                error:error.message
            }
        )
    }
}


// Update Section
exports.UpdateSection = async (req, res) => {
    try{

        //  Data Input..
        const {sectionName, sectionId} = req.body;

        // Validation check
        if (!sectionName || ! sectionId){
            return res.stauts(400).json(
                {
                    success:false,
                    message:"Missing Properties.."
                }
            )
        }

        // Update Data..
        const Section = await Section.findByIdAndUpdate(sectionId,{sectionName}, {new:true})

        // Responce Return 
        return res.status(200).json(
            {
                success:true,
                message:"Section Updated SuccessFully...",
                updatedCourseDetails
            }
        )


    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Section CanNot Created PLease Try Again...",
                error:error.message
            }
        )
    }
}



// Delete Section
exports.deleteSection = async (req, res) => {
    try{

        // Get Id
        const {sectionId} = req.params;

        // Delete Id USing findbyIdAndDelete
        // TODO = Do We Need To Delete the Entry From The Course Schema ??
        await Section.findByIdAndDelete(sectionId);

        // Return Responce
        return res.status(200).json(
            {
                success:true,
                message:"Section Deleted SuccessFully...",
                updatedCourseDetails
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Unable To Delete Section Please Try Again...",
                error:error.message
            }
        )
    }
}