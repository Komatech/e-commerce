const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    imgName:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true},
    category:{
        name:{type:String,required:true},
        subCategory:[{
            name:{type:String,required:true},
            miniCategory:[{
                name:{type:String,required:true}
            }]
        }]
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product',productSchema)