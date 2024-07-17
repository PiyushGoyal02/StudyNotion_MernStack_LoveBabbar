const RatingAndReview = require("../Model/RatingAndReviews");
const Course = require("../Model/Course");

//  Create Rating...
exports.createRating = async (req, res) => {
    try{

        //  Get Course Id 
        // Get User Id
        const UserId = req.body.id;

        // Fetched Data From req body
        const {rating, review, courseId} = req.body; 

        // Check if User is enrolled or Not 
        const CourseDetails = await Course.findOne(
            {_id:courseId,
                studentInRoll:{UserId}
            })

            // Validation CourseDetails
            if(!CourseDetails){
                return res.status(
                    {
                        success:false,
                        message:"Student in not enrolled in The Course"
                    }
                )
            }

            // Check if User Already reviewed the course..
            const AlredayReview = await RatingAndReview.findOne(
                {
                    user:UserId,
                    course:courseId
                }
            )
            
            // Aagr User Reviee Kar Chuka Hai too REturn Res..
            if(AlredayReview){
                return res.status(400).json(
                    {
                        success:false,
                        message:"Sorry Sir This User Allready Review"
                    }
                )
            }

            //  Create Rating And Review..
            const CreateReview = await RatingAndReview.create(
                {
                    rating,
                    review,
                    user:UserId,
                    course:courseId
                }
            )

            //  Update Krdo Course Kai Andr
            const UpdateRatingAndReviewOnCouurse = await Course.findByIdAndUpdate(courseId,
                {
                    $push:{ratingAndReviews:CreateReview}
                },{new:true});

                // Return Responce
                return res.status(200).json(
                    {
                        success:true,
                        message:"Rating And REview SuccessFully Create",
                        data:UpdateRatingAndReviewOnCouurse
                    }
                )

    }catch(error){
        return res.status(500).json(
            {
                success:true,
                message:"Rating And Review CAnNot Created Please try Again..."
            }
        )
    }
}


// Get Avrage Rating
exports.getAveragerating = async (req, res) => {
    try{

        //  Get Fetched CourseId
        const {courseId} = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose .Types.ObjecId(courseId)
                },
            },

            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        // Return Rating
        if(result.length > 0){
            return res.staus(200).josn(
                {
                    success:true,
                    averageRating:result[0].averageRating
                }
            )
        }

        // If no Rating And Review Exist..
        return res.status(200).json(
            {
                success:true,
                message:error.message
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

//  get All Rating And Review..
exports.getAllRatingAndReview = async (req, res) => {
    try{

        // Get all Reviews
        const AllRatingReview = await RatingAndReview.find({})
        .sort({rating:"desc"})
        
        // Mene Saar Data Nikal Liya Populate Karke
        .populate({
            path:"User",
            select:"firstName, lastName, email, image"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();

        return res.status(200).json(
            {
                succes:true,
                message:"All Review Fetched SuccessFully...",
                data:AllRatingReview
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