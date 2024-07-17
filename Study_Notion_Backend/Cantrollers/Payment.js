const {instance} = require("../Config/razorpayConfig");
const Course = require("../Model/Course");
const User = require("../Model/User");
const MailSender = require("../Utils/MailSender");


// Capture The Payment and initiate the Razorpay order...
exports.capturePayment = async (req, res) => {
    try{

        // Get Course id and UserId 
        const {course_id} = req.body;
        const UserId = req.User.id;

        // Valid Ki Course Valid Hai ya Nhi
        if(!course_id){
            return res.status(402).json(
                {
                    success:false,
                    message:"Please Provide Valid Course..."
                }
            )
        }

        // Validation Course Id
        let course;
        try{

            course = await Course.findById(course_id);
            if(!course){
                return res.status(401).json(
                    {
                        success:false,
                        message:"Sorry Sir Course Id CanNot Found..."
                    }
                )
            }

            //  Check User Already pay for the same course..
            //  Abhi Mere Pass Mere UserId Ek String Type MAi thi Or Mere Db Mai Id object Kai Roop Mai Store Hai To Mene Apni userId Ko ObjectId Mai Convert Kar diya...
            const uid = new mongoose.Types.ObjectId(UserId);
            if(course.studentInRoll.includes(uid)){
                return res.stauts(200).json(
                    {
                        success:false,
                        message:"Student Is Alreday Inrolled..."
                    }
                )
            }
        }catch(error){
            console.log(error)
            return res.status().json(
                {
                    success:false,
                    message:error.message
                }
            )
        }

        // order Created..
        const Amount = Course.price;
        const Currency = "INR";

        //  Yai Options Ka Data Function Mai Pass Hoga
        const options = {
            //  Yai to Needed Data hai Mtlb Jruri Send Krna hai
            Amount : Amount * 100,
            Currency,
            //  Yai Optional Data Hai MArzi Ho to Send Kr dena..
            receipt : Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                UserId
            }
        }

        //  Function Call Krni Hai
        try{

            //  Initiate Payment Razorpay Karna hai
            //  (Order.create) <=  Es Metod Sai Haam Apni Razorpay Payment Create Karte Hai
            const PaymentResponce = await instance.orders.create(options);
            console.log(PaymentResponce);

            //  Responce Return 
            return res.status(200).json(
                {
                    success:true,
                    message:"SuccessFully Payment Responce Done....",
                    courseName:Course.courseName,
                    courseDescription:Course.courseDescription,
                    thumbnail:Course.thumbnail,
                    orderId:PaymentResponce.id,
                    Currency:PaymentResponce.Currency,
                    Amount:PaymentResponce.Amount
                }
            )

        }catch(error){
            return res.status(402).json(
                {
                    success:false,
                    message:"Payment Ka Responce Nhi Mila Please Try Again..."
                }
            )
        }

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


// Verify Signature (Ki Payment Done Hue hai ya nhi i mean RazorPay or Other Website CrossCheck Ki Payment done Hue h ya ni)
exports.verifySignature = async (req, res) => {
    try{

        //  Server Ka Secret Code
        const WebHookSecret = "12345678";

        //  Razorpay Secret Hook   (Yai Enka Biheviour Hai RAzarapay valo ka)   (Yai Hamara Input Mai Aarha hoga)
        const RazorpaySecret = req.headers["x-razorpay-signature"]

        // HMAC Object Create Karne Kai Liye 2Cheez Ki Need Hoti hai (Ek elgo Ki Or Ek secretKey)
        const Shasum = crypto.createHmac("sh256", WebHookSecret);

        // HMAC Ko String Mai Convert Karna hai
        Shasum.update(JSON.stringify(req.body));
        const digest = Shasum.digest("hex");    // hexja Desimal Format Kai Liye

        if(RazorpaySecret === digest){
            console.log("Payment Is Authorised..");

            const {courseId, UserId} = req.body.payload.payment.entity.notes;

            try{

                // FullField The Action..

                // Find The Courseand enroll the Student in it...
                const enrolledCourse = await Course.findByIdAndUpdate(
                    {_id:courseId},
                    {$push:{studentInRoll:UserId}},
                    {new:true},
                )

                // Varify Krdo Kush Issue To nhi hai
                if(!enrolledCourse){
                    return res.status(200).json(
                        {
                            success:false,
                            message:"Course Not Found..."
                        }
                    )
                }

                console.log(enrolledCourse);

                // find the Student Andadd the course to their list enrolled course me..
                const enrollStudent = await User.findBbodyyIdAndUpdate(
                    {_id:UserId},
                    {$push:{courses:courseId}},
                    {new:true}
                )

                console.log(enrollStudent)

                //  Send Email Ki Course Done Ho Gya
                const email = await MailSender(
                    enrollStudent.email,
                    "Congratulation For New Course...",
                    " you are Oborded into new Course...",
                )

                console.log(email);

                return res.status(200).json(
                    {
                        success:true,
                        message:"Signature Verify and Course Added"
                    }
                )

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