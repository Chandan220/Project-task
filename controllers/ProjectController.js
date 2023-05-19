const Project = require("../models/Projectmodel")

// -------Check Validation and add Project -------

function addProject(req,res){

    var validation = ""
    if(req.body.Project_name == "")
    {
        validation += "Project name is required \n"
    }
    if(req.body.Description == "")
    {
        validation += "Description is required"
    }
    if(req.body.Category == "")
    {
        validation += "Category is required"
    }
    if(req.body.Owner == "")
    {
        validation += "Owner is required"
    }
    if(req.body.GitHub_Account == "")
    {
        validation += "GitHub_Account is required"
    }
    if(req.body.InstaGram == "")
    {
        validation += "InstaGram is required"
    }
    if(req.body.Gamil == "")
    {
        validation += "Gamil is required"
    }
    if(req.body.Mobile_Number == "")
    {
        validation += "Mobile_Number is required"
    }
    if(req.body.Project_Image == "")
    {
        validation += "Project_Image is required"
    }

    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        let mem = Array()

        

        // return 

        let Projectobj = new Project()
        Projectobj.Project_name = req.body.Project_name
        Projectobj.Description = req.body.Description
        Projectobj.Category = req.body.Category
        Projectobj.Owner = req.body.Owner
        if(typeof(req.body.member) == 'string')
        {
           let memebrs = JSON.parse(req.body.member)
            for(i=0;i<memebrs.length;i++)
            {
                mem.push(memebrs[i])
            }
            // console.log(mem)
            Projectobj.member = mem
        }
        else{
            mem = req.body.member
            // console.log(mem)
            Projectobj.member = mem

        }
        Projectobj.technology_use= req.body.technology_use
        Projectobj.GitHub_Account = req.body.GitHub_Account
        Projectobj.InstaGram = req.body.InstaGram
        Projectobj.Gamil = req.body.Gamil
        Projectobj.Mobile_Number = req.body.Mobile_Number
        if(req.file)
        {
            Projectobj.Project_Image = "Project/"+req.file.filename
        }
        Projectobj.save()
        res.json({
            'status':200,
            'success':true,
            'msg':'Project inserted',
            'data':req.body
        })
    }
    
}

// --------get all Project start-----------

getallProject = (req,res)=>{
    Project.find(req.body)
    .populate('member')
    .then(Projectdata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':Projectdata
        })
    })
    .catch(err=>{
        res.json({
            status:500,
            success:false,
            msg : 'Error Occur',
            error : String(err)
        })
    })
    
}


// ---------get single Project-----------
getsingleProject = (req,res)=>{
    var validate = ""
    if(req.body._id == "")
    {
        validate += "_id is required"
    }

    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            msg:validate
        })
    }
    else{
        Project.findOne({_id:req.body._id})
        .populate('member')
        .then(Projectdata=>{
            res.json({
                'status':200,
                'success':true,
                'msg':'data loaded',
                'data':Projectdata
            })
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg : 'Error Occur',
                error : String(err)
            })
        })
    }
}

// --------update Project-----------
updateProject = (req,res)=>{
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required "
    }
    if(req.body.Project_name == "")
    {
        validation += "Project name is required "
    }
    if(req.body.Description == "")
    {
        validation += "Description is required"
    }
    if(req.body.Category == "")
    {
        validation += "Category is required"
    }
    if(req.body.Owner == "")
    {
        validation += "Owner is required"
    }
    if(req.body.GitHub_Account == "")
    {
        validation += "GitHub_Account is required"
    }
    if(req.body.InstaGram == "")
    {
        validation += "InstaGram is required"
    }
    if(req.body.Gamil == "")
    {
        validation += "Gamil is required"
    }
    if(req.body.Mobile_Number == "")
    {
        validation += "Mobile_Number is required"
    }
    if(req.body.Project_Image == "")
    {
        validation += "Project_Image is required"
    }
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        //check whether data exists or not wrt particular id
        Project.findOne({_id:req.body._id})
        .then(Projectdata=>{
            if(Projectdata == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                //update 
                Projectobj.Project_name = req.body.Project_name
        Projectobj.Description = req.body.Description
        Projectobj.Category = req.body.Category
        Projectobj.Owner = req.body.Owner
        if(typeof(req.body.member) == 'string')
        {
           let memebrs = JSON.parse(req.body.member)
            for(i=0;i<memebrs.length;i++)
            {
                mem.push(memebrs[i])
            }
            // console.log(mem)
            Projectobj.member = mem
        }
        else{
            mem = req.body.member
            // console.log(mem)
            Projectobj.member = mem

        }
        Projectobj.technology_use= req.body.technology_use
        Projectobj.GitHub_Account = req.body.GitHub_Account
        Projectobj.InstaGram = req.body.InstaGram
        Projectobj.Gamil = req.body.Gamil
        Projectobj.Mobile_Number = req.body.Mobile_Number
        if(req.file)
        {
            Projectobj.Project_Image = "Project/"+req.file.filename
        }
                Projectdata.save()

                res.json({
                    status:200,success:true,msg:'Record updated'
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg:'Error',
                error:String(err)
            })
        }) 
    }
}

deletedata = (req,res)=>{
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required \n"
    }
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        //check whether data exists or not wrt particular id
        Project.findOne({_id:req.body._id})
        .then(Projectdata=>{
            if(Projectdata == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                //Delete 
                Project.deleteOne({_id:req.body._id})
                .then(data=>{
                    res.json({
                        status:200,success:true,msg:'Record Deleted'
                    })
                })
                .catch(err=>{
                    res.json({
                        status:500,
                        success:false,
                        msg:'Error',
                        error:String(err)
                    })
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg:'Error',
                error:String(err)
            })
        }) 
    }
}

module.exports = {
    addProject,
    getallProject,
    getsingleProject,
    updateProject,
    deletedata
}
