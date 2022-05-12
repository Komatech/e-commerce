const User = require('../models/user')
const Role = require('../models/role')
const bcrypt = require('bcrypt')

exports.registerAdmin = async function(req,res){
    // Get data
    // console.log(req.body.name)
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