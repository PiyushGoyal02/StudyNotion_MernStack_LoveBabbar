const SubSection = require("../Model/SubSection");
const Section = require("../Model/Section")
const {uploadImageToCloudinary} = require("../Utils/ImageUpload");
require("dotenv").config();

//  Create SubSection..
exports.subSectionCreate = async (req, res) => {
    try{

        //  Data Fetched..
        const {sectionId, title, timeDuration, description} =req.body;
        
        // Files Method Ka Use Karke Name Nikal lo Video Ka...
        const ViedoFile = req.files.viedoFile
        
        //  Validation Data..
        if(!sectionId || !title || !timeDuration || !description || !ViedoFile){
            return res.status(400).json(
                {
                    success:false,
                    message:"All Field Required... "
                }
            )
        }

        // Upload Viedo to Cloudinary..
        const ViedoUploadCloudinary = await uploadImageToCloudinary(ViedoFile, process.env.FOLDER_NAME)

        // Create Sub Section
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:ViedoUploadCloudinary.secure_url
        })

        // Update Section with SubSection ObjectId
         const UpdatedSection = await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:SubSectionDetails._id
                }
            },
            {new:true},
        )

        //  Responce Return 
        return res.status(200).json(
            {
                success:true,
                message:"SubSection Created SuccessFully...",
                UpdatedSection
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"SubSection CanNot Created Please try Again..."
            }
        )
    }
}


// HW Update SubSection
exports.updateSubSection = async (req, res) => {
    try{
        const {subSectionId, title, timeDuration, description} = req.body

        if(!subSectionId || !title || !timeDuration || !description){
            return res.status(400).json(
                {
                    success:false,
                    message:"All Field Required... "
                }
            )
        }

        const dataUpdated = await SubSection.findByIdAndUpdate(
            subSectionId,
            {title, description, timeDuration},
            {new:true}
        )

        return res.status(200).json(
            {
                success:true,
                message:"SubSection Update SuccessFully...",
                dataUpdated
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"SubSection CanNot Updated Please try Again..."
            }
        )
    }
}

// HW Delete SubSection
exports.subSectionDelete = async (req, res) => {
    try{

        const {subSectionId} = req.body

        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json(
            {
                success:true,
                message:"Subsection Deleted SuccessFully...."
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"SubSection CanNot Deleted Please try Again..."
            }
        )
    }
}