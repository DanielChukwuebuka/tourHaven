const hapijoi = require("@hapi/joi")

const  validateSignUP = (data)=>{

    const validate = hapijoi.object({
    
        fullName : hapijoi.string().empty("").min(5).max(40).trim().required().regex(/^[a-zA-Z]+$/).messages({
            "string.empty" :"field cant be left empty",
            "string.min" :"first name cannot be less than  5  characters",
            "string.pattern.base":"kindly use aplhabet alone"
        }),

        lastName : hapijoi.string().empty("").trim().min(10).max(40).required().regex(/^[a-zA-Z]+$/).messages({
    "string.empty" :"field cant be left empty",
    "string.min" :" last name cannot be less than  5  characters",
    "string.pattern.base":"kindly use aplhabet alone"
}),

        email : hapijoi.string().email({tlds: {allow: false}}).trim().empty('').required().messages({
    "string.empty" :"field cant be left empty",
    }),

        phoneNumber : hapijoi.string().required().empty('').min(11).trim().messages({
    "string.empty" :"field cant be left empty",
    "string.min": "phoneNumber cannot be less than 11 characters "
    }),

password : hapijoi.string().required().empty('').min(10).max(30).trim().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[a-zA-Z]).{8,}$/).messages({
    "string.empty" :"field cant be left empty",
    "string.pattern.base":"password must contain uppercase,lowercase,and special characters"

    
}),

    })
    
    return validate.validate(data)
    }

    module.exports = { validateSignUP}