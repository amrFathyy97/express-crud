import Joi from "joi";


const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(30),
    last_name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    SSN: Joi.string().pattern(/\d{3}-\d{3}-\d{3}/)
    
});


export default schema