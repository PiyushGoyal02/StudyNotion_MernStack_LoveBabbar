const mongoose = require("mongoose")
require("dotenv").config();

exports.DBConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Db Connect Successfully "))
    .catch( (error) => {
        console.log("Sorry DbConnect Nhi hua")
        console.error(error.message)
        process.exit(1);
    })
}