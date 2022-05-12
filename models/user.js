const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    email:{
        type: String,
        required: true,
        max: 255
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    address:[
        {
            line1: String,
            line2: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        }
    ],
    telNo:String,
    role_id : String,
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user',userSchema)