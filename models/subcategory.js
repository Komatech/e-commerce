const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('subcategory',subCategorySchema)