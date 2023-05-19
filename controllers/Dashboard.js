const project = require("../models/Projectmodel")
const User = require ("../models/developerrmodel")

dashboard = async (req,res)=>{
    totalproject = 0
    totalcategory = 0

    await project.countDocuments().then(projectcount =>{
        totalproject = projectcount
    })
    await User.countDocuments().then(usercount =>{
        totaluser = usercount
    })

    res.json({
        status:200,success:true,total_projects : totalproject, total_user : totaluser
    })
}

module.exports = {
    dashboard    
}