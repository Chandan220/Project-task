const mongoose = require("mongoose")

const developerschema = new mongoose.Schema({
    full_name : {type:String,default:null},
    email : {type:String,default:null},
    password : {type:String,default:null},
    bio : {type:String,default:null},
    city : {type:String,default:null},
    state : {type:String,default:null},
    address : {type:String,default:null},
    contact : {type:Number,default:0},
    image:{type:String, default:null},
    userId : {type:mongoose.SchemaTypes.ObjectId,ref:'user',default:null},
    created_at : {type:Date,default:Date.now()},
    status : { type:Boolean,default:true}
})

module.exports = new mongoose.model('developer',developerschema)