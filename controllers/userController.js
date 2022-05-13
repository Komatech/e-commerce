const User = require('../models/user')
const Role = require('../models/role')
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

// setup customer account
exports.customerRegistration = async function(req,res){
    // validate data
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

    // Check if email exists
    const emailExists = await User.findOne({email:email})
    if(emailExists){
        return res.status(400).send('Email already exists')
    }
    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

}