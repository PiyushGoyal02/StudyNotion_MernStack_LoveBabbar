const express = require('express');
const app = express();

const userRoute = require("./Routes/RouteUser");
const profileRoute = require("./Routes/RouteProfile");
const paymentRoute = require("./Routes/RoutePayment");
const courseRoute = require("./Routes/RouteCourse");

const databseConnect = require("./Config/DataBaseConnect");
databseConnect.DBConnect();

const cookieParser = require("cookie-parser");

// Mai Chahta Hu ki Jo Mera Backend Hai Vo meri Frontend Ki Request Ko Intertain Kare so Using For (Cors)
const cors = require("cors");

// Cloudinary 
const {cloudinaryConnect} = require("./Config/CloudinaryConnect");
cloudinaryConnect();

// File Uploader
const FileUploader = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// MidleWare
app.use(express.json());
app.use(cookieParser());

// Jo be Request Apke Frontend Sai Aari hai usko Intertain Karna hai
app.use(
    cors({
        origin:"http://localhost:3000"
    })
)

app.use(
    FileUploader({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment ", paymentRoute);


app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your Server 4000 is up and Running..."
    })
})

app.listen(PORT, () => {
    console.log(`Server Starting PORT ${PORT}`)
})
