const mongoose = require("mongoose");
const MailSender = require("../Utils/MailSender");
const emailTemplate = require("../Mail/Template/emailVerificationTemplate")
const otpSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },

        otp:{
            type:String,
            required:true
        },

        createdAt:{
            type:Date,
            default:Date.new,
            expire:60 * 5  // The document will be automatically deleted after 5 minutes of its creation time
        }
    }
)

// => A Function  -> To Send Mail..
async function SendVerificationMail (email, otp){
    // Create a transporter to send emails

	// Define the email options

	// Send the email
    try{
        const mailResponce = await MailSender(email, "Verification Email from StudyNotion", emailTemplate(otp));
        console.log("MailResponce => ", mailResponce)

    }catch(error){
        console.log("Error Occured While Sending email", error)
    }
}

//  DataBase Mai Save Hone Sai Phle Koe kaam Karvana Chahte Hai Then Using Pre Hook..
otpSchema.pre("save", async function(next){
    console.log("New Document saved to databse...")

    if(this.isNew){
        await SendVerificationMail(this.email, this.otp)
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema);