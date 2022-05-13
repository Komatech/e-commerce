const Joi = require('joi')

const userSchema = (data)=> {
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
        telNo:Joi.string().min(3).required(),
        address: Joi.array().items({
            line1: Joi.string().min(3).required(),
            line2: Joi.string().min(3),
            city: Joi.string().min(3).required(),
            state: Joi.string().min(3).required(),
            zipCode: Joi.string().min(3),
            country: Joi.string().min(3).required(),
        }),
        role:Joi.string().min(3)
    })
    return schema.validate(data)
}

module.exports.userSchema = userSchema