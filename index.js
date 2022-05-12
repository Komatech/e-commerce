const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')

dotenv.config()

// db COnnection
mongoose.connect(process.env.DB_CONNECT,()=>{console.log('connected')})

app.listen(3000,()=>{
    console.log('WOrking')
})