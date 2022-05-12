const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const route = require('./routes/index')

dotenv.config()

// db COnnection
mongoose.connect(process.env.DB_CONNECT,()=>{console.log('connected')})

// app middleware
app.use('/api',route)

// port
app.listen(3000,()=>{
    console.log('WOrking')
})