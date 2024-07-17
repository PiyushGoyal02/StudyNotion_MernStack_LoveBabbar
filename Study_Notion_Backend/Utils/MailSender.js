const nodemailer = require("nodemailer");
// require("dotenv").config();

// OTP ko Mail Mai Send Kar Pau...
const MailSender = async (email, title, body) => {
    try{

        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        //  Mail Send Krna 
        let info = await transporter.sendMail({
            from:"Study Notion Piyush Goyal ",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log("info => ", info)
        return info;

    }catch(error){
        console.error(error.message)
    }
}

module.exports = MailSender;

