const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseName:{
            type:String,
            trim:true
        },

        courseDiscription:{
            type:String,
            trim:true
        },

        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },

        whatYouWeLearn:{
            type:String
        },

        courseContant:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
        ],

        ratingAndReviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"RatingAndReviews"
            }
        ],

        price:{
            type:Number
        },

        thumbnail:{
            type:String
        },

        tag:{
            type:[String],
            required:true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category",
        },

        studentInRoll:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        ],

        instructions: {
            type: [String],
        },

        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
    }
)

module.exports = mongoose.model("CourseSchema", courseSchema)