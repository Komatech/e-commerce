const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    imgName:{},
    price:{},
    quantity:{},
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