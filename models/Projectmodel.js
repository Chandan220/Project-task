let mongoose = require("mongoose")

let ProjectSchema = new mongoose.Schema({

    Project_name:{type:String,default:""},
    Description :{type:String,default:""},
    Category:{type:String,default:""},
    Developer:{type:String,default:""},
    member : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
           }],
    technology_use:{type:String,default:""},
    GitHub_Account:{type:String,default:""},
    InstaGram:{type:String,default:""},
    Gamil:{type:String,default:""},
    Mobile_Number:{type:Number,default:""},
    Project_Image:{type:String,default:"no-image.jpg"},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("Project",ProjectSchema)
