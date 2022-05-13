const User = require('../models/user')
const Role = require('../models/role')
const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const Minicategory = require('../models/minicategory')
const Product = require('../models/product')
const bcrypt = require('bcrypt')
const {userSchema} = require('../validate')

// setup admin account
exports.registerAdmin = async function(req,res){
    // Validate data
    const {error} = userSchema(req.body)

    if(error){
        return res.status(400).send(error.details[0].message)
    }
    // Get data
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const telNo = req.body.telNo
    const role = req.body.role
    // Check if email exists
    const emailExists = await User.findOne({email:email})
    if(emailExists){
        return res.status(400).send('Email already exists')
    }
    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    // insert into db
    const roles = new Role({name:role})

    try{

        const savedRole = await roles.save()

        const user = new User({
            name:name,
            email: email,
            password: hashPassword,
            address: address,
            telNo:telNo,
            role_id: savedRole._id
        })

        const savedUser = await user.save()
        
        res.status(200).send(savedUser)

    }catch(error){
        res.status(400).send(error)
    }

}

// Admin to setup role
exports.roleSetup = async (req,res)=>{
    // get data
    const roleName = req.body.name
    
    // Check if role exists
    const roleExists = await Role.findOne({name:roleName.toString().toLowerCase().trim()})
    if(roleExists){
        return res.status(400).send('Role already exists')
    }
    
    const roles = new Role({name:roleName.toString().toLowerCase().trim()})

    try{
        const savedRole = await roles.save()

        res.status(200).send(savedRole)
    }
    catch(error){
        res.status(400).send(error)
    }
}


//                                      Create Controllers

// add new category
exports.categorySetup = async (req,res)=>{
    // get data
    const categoryName = req.body.name
    
    // Check if role exists
    const categoryExists = await Category.findOne({name:categoryName.toString().toLowerCase().trim()})
    if(categoryExists){
        return res.status(400).send('Category already exists')
    }
    
    const category = new Category({name:categoryName.toString().toLowerCase().trim()})

    try{
        const savedCategory = await category.save()

        res.status(200).send(savedCategory)
    }
    catch(error){
        res.status(400).send(error)
    }
}

// add new subcategory
exports.subcategorySetup = async (req,res)=>{
    // get data
    const subcategoryName = req.body.name
    
    // Check if role exists
    const subcategoryExists = await Subcategory.findOne({name:subcategoryName.toString().toLowerCase().trim()})
    if(subcategoryExists){
        return res.status(400).send('Subcategory already exists')
    }
    
    const subcategory = new Subcategory({name:subcategoryName.toString().toLowerCase().trim()})

    try{
        const savedSubcategory = await subcategory.save()

        res.status(200).send(savedSubcategory)
    }
    catch(error){
        res.status(400).send(error)
    }
}

// add new minicategory
exports.minicategorySetup = async (req,res)=>{
    // get data
    const minicategoryName = req.body.name
    
    // Check if role exists
    const minicategoryExists = await Category.findOne({name:minicategoryName.toString().toLowerCase().trim()})
    if(minicategoryExists){
        return res.status(400).send('Minicategory already exists')
    }
    
    const minicategory = new Minicategory({name:minicategoryName.toString().toLowerCase().trim()})

    try{
        const savedminicategory = await minicategory.save()

        res.status(200).send(savedminicategory)
    }
    catch(error){
        res.status(400).send(error)
    }
}

// Product creation
exports.productCreation = async (req,res)=>{
    // Get data
    const product = new Product({
        name:req.body.name,
        imgName: req.body.imgName,
        price: req.body.price,
        quantity:req.body.quantity,
        category:req.body.category,
        description:req.body.description,
    })

    try{
        const savedproduct = await product.save()

        res.status(200).send(savedproduct)
    }
    catch(error){
        res.status(400).send(error)
    }
}


