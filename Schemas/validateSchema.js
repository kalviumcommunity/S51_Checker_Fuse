const Joi = require("joi")

const userSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().label('Name'),
    location: Joi.string().allow('').required().optional().label('Location'),
    age: Joi.number().min(16).max(50).required().label('age')
   
});

module.exports = userSchema;