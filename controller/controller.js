const userModel= require("../midmodel/midmodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateDynamicEmail} = require("../mailer/emailTemplate")
const {sendEmail} = require("")
require("dotenv").config()
const {validateSignUP} = require("../middleware/validation")

//  sign up user
exports.signUpUser = async (req, res)=>{
    try {

        const {error} = await validateSignUP(req.body)
            if (error){
                res.status(500).json({
                    message: error.details[0].message
                })
            }
        else{
    const {fullName,email,phoneNumber, password,confirmPassword} = req.body

    if(confirmPassword!== password){
    return res.status(400).json({
        message:"password does not match"
    })
    }
    const emailExists = await userModel.findOne({email})
    if(emailExists){
        res.status(409).json({
            message: "email is already registered"
        })
    }
    
        // to salt our password to be able to encrypt it
         const salt = bcrypt.genSaltSync(12);
    
        // to hash our password to be able to encrypt it
        const hashedPassword = bcrypt.hashSync(password, salt);

        // create user data
    
        const user = await new userModel({
            fullName: fullName,
            email: email.toLowerCase(),
            phoneNumber: phoneNumber,
            password: hashedPassword
            
    })

    // use this save to save any data manipulated
    await user.save();


// get the users token using the bearers authentication token

const token = jwt.sign(
    {
      userId: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email.toLowerCase(),
      password:user.password
    },
    process.env.jwt_secret,
    { expiresIn: "1day" }
  );

  const subject = "New user";
  const link = 
  const html = await generateDynamicEmail(user.fullName, link);

  const data = {
email: email,
subject,
html
  }
sendEmail(data)
    
    
    // return a success message to the user
    
    return res.status(201).json({
    message:"user created successfully",
     user,
    token
    })
}}
     catch (error) {
      return res.status(500).json({
    mesage: error.message
    
       })
    }
    }
    