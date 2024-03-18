const Joi = require("joi");

const formSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    location: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

module.exports = formSchema;