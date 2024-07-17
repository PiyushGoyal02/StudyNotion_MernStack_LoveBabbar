const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        // Define the name field with type String, required, and trimmed
        firstName:{
            type:String,
            required:true,
            trim:true
        },

        lastName:{
            type:String,
            required:true,
            trim:true
        },

        // Define the email field with type String, required, and trimmed
        email:{
            type:String,
            required:true,
            trim:true
        },

        password:{
            type:String,
            required:true
        },

        // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
        accountType:{
            type:String,
            required:true,
            enum:["Admin", "Student", "Instructor"]
        },

        additionalDetails:{      // Profile Naam Ka Ek model Hoga us Profile Naam Kai Model Ko Haam Ref Kar rhai honge
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Profile"
        },

        active: {
			type: Boolean,
			default: true,
		},


		approved: {
			type: Boolean,
			default: true,
		},

        courses:[
            {           // User Kai Pass Konse Konse Course Honge
                type:mongoose.Schema.Types.ObjectId,
                ref:"Courses"
            }
        ],

        image:{
            type:String,
            required:true
        },

        // Token Or ResetPasswordExpires Ka Use Hai Ki Reset Password Vale Cantrollers Mai Kaam aarha hai
        token:{
            type:String
        },

        resetPasswordExpires:{
            type:Date
        },

        courseProgress:[{          // User Ki Course Progress Kese Hogi 
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }],

        // Add timestamps for when the document is created and last modified
    },
    { timestamps: true }
)

// Export the Mongoose model for the user schema, using the name "User"
module.exports = mongoose.model("User", userSchema);