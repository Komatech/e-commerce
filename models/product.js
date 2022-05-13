const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    imgName:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true},
    category:{
        id:{type:String,required:true},
        subCategory:[{
            id:{type:String,required:true},
            miniCategory:[{
                id:{type:String,required:true}
            }]
        }]
    },
    description:String,
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product',productSchema)