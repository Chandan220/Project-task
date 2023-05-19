const express = require("express")
const app=express()
const port=4000
const cors = require('cors')

const db = require("./config/dp")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'50mb'}))
app.use(express.static(__dirname+("/public")))

const adminroutes=require("./routes/adminroutes")
app.use("/admin",adminroutes)

const seeder = require('./config/seeder')
seeder.adminseeder()

app.listen(port,()=>{
    console.log("server running at", ""+ port)
})