const Category = require("../Model/Category")

// Create Tag ka Handler Function..
exports.createCategory = async (req, res) =>{
    try{
        // Fetched Data..
        const {name, description} = req.body;

        // validation Check
        if(!name || !description){
            return res.status(403).json(
                {
                    success:false,
                    message:"Field All Required.."
                }
            )
        }

        // Create Entry DB
        const tagdetails = await Category.create({name:name, description:description});
        console.log(tagdetails);

        // Res return 
        return res.status(200).json(
            {
                success:true,
                message:"Category Created SuccessFully..."
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


// GetAll Tags..
exports.showAllCategory = async (req, res) => {
    try{
        // All Tags Fetched Using Find Method
        const allCategory = await Category.find({}, {name:true, description:true});

        return res.status(200).json(
            {
                success:true,
                message:" All Tags Return SuccessFully..",
                allCategory
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"All Tags CanNot Fetched"
            }
        )
    }
}


// CategoryPageDetails
exports.CategoryPageDetails = async (req, res) => {
    try{

        // Get Category Id
        const {categoryId} = req.body;

        // Get Course for Specified CourseId
        const selectCategory = await Category.findByID(categoryId)
                                                .populate("courses")
                                                .exec();
        // Validation Aagr User Ko Uska Maan Chaa Course Hi Nhi Mila
        if(!selectCategory){
            return res.status(404).json(
                {
                    success:false,
                    message:"Data Not Found  Jo Course User Ko Chahiye Vo Nhi hai"
                }
            )
        } 

        // get Different Category Course Data
        const differentCategoryCourse = await Category.find({
            _id:{$ne:categoryId}     // ($ne  eska Matlb Hai ki Not Equal)
        })
        .populate("courses")
        .exec();

        // Validation
        if(!differentCategoryCourse){
            return res.status(404),json(
                {
                    success:false,
                    message:"Different Category Data Not Found..."
                }
            )
        }

        return res.status(200).json(
            {
                success:true,
                data: {
                    selectCategory,
                    differentCategoryCourse
                }
            }
        )

        // Get Top Selling Category Course..
        // const topSellingCourse = 



    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}