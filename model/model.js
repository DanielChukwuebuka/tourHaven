const mongoose = require("mongoose")

const user = new mongoose.Schema({

    fullName : { 
        type:String,
        required: [true, "firstName is required"]

    },
    email :{ 
        type:String,
        required: [true, "email is required"]

    },
    phoneNumber :{ 
        type:String,
        required: [true, "phonenumber is required"]

    },
    password : { 
        type:String,
        required: [true, "password is required"]

    },
confirmPassword:{
    type: String,
    required : true
},
},{timestamps: true})

const userModel = mongoose.model("jobFinder", user)

module.exports = userModel