const User = require('../models/Usermodel')
const developer = require('../models/developerrmodel')
const bcrypt = require('bcrypt')
const saltround = 10
const jwt = require('jsonwebtoken')
const secretkey = "Project123#@"

register = (req,res)=>{
    var validator = ""

    if(req.body.full_name == "")
        validator += "full_name is required"
    if(req.body.email == "")
        validator += "Email is required"
    if(req.body.password == "")
        validator += "Password is required"
    if(req.body.bio == "")
        validator += "bio is required"
    if(req.body.city == "")
        validator += "city is required"
    if(req.body.state == "")
        validator += "state is required"
    if(req.body.address == "")
        validator += "address is required"
    if(req.body.contact == "")
        validator += "contact is required"
    if(req.body.image == "")
        validator += "image is required"
    
    
    if(!!validator)
    {
        res.json({
            status:409,success:false,msg:validator
        })
    }
    else{
        //duplicacy
        User.findOne({email:req.body.email})
        .then(udata=>{
            if(udata == null)
            {
                //insert
                let userobj = new User()
                userobj.full_name = req.body.full_name
                userobj.email = req.body.email
                userobj.password = bcrypt.hashSync(req.body.password,saltround)
                userobj.save()
                .then(userdata=>{
                    let developerobj = new developer()
                    developerobj.full_name = req.body.full_name
                    developerobj.email = req.body.email
                    developerobj.password =  bcrypt.hashSync(req.body.password,saltround)
                    developerobj.bio = req.body.bio
                    developerobj.city = req.body.city
                    developerobj.state = userdata.state
                    developerobj.contact = userdata.contact
                    developerobj.address = userdata.address
                    developerobj.image = userdata.image
                    developerobj.userId = userdata._id
                    if (req.file) {
                        developerobj.image = "User/" + req.file.filename;
                      }
                    
                    developerobj.save()
                    res.json({
                        status:200,success:true,msg:'User registered'
                    })
                })
            }
            else{
                res.json({
                    status:409,success:false,msg:'user already exists'
                })
            }
        })

    }
}

changepassword = (req,res)=>{
    validator = ""
    if(req.body.oldpassword == "")
        validator += "Old password is required"
    if(req.body.newpassword == "")
        validator += "New password is required"
    if(req.body.confirmpassword == "")
        validator += "Confirm password is required"
    if(req.body.userId == "")
        validator += "User Id  is required"

    if(!!validator)
    {
        res.json({
            status: 409,
            success:false,
            msg:validator
        })
    }
    else{
        //compare new password with confirm password
        if(req.body.newpassword == req.body.confirmpassword)
        {
            //check user existance
            User.findOne({_id:req.body.userId})
            .then(userdata=>{
                if(userdata != null)
                {
                    //compare old password with database password
                    bcrypt.compare(req.body.oldpassword,userdata.password,(err,data)=>{
                        if(data)
                        {
                            //update code
                            userdata.password = bcrypt.hashSync(req.body.newpassword,saltround)
                            userdata.save()
                            res.json({
                                status:200,
                                success:true,
                                msg:'password updated' 
                            })   
                        }
                        else{
                            res.json({
                                status:409,
                                success:false,
                                msg:'old password do not matched' 
                            })
                        }
                    })
                }
                else{
                    res.json({
                        status:409,
                        success:false,
                        msg:'User does not exists' 
                    })
                }
            })
        }
        else{
            res.json({
                status:409,
                success:false,
                msg:'new password and confirm password do not match'
            })
        }
    }
}

login = (req,res)=>{
    console.log(req.body)
    validator = ""
    if(req.body.email == "")
        validator += "Email is required"
    if(req.body.password == "")
        validator += "password is required"
  
    if(!!validator)
    {
        res.json({
            status: 409,
            success:false,
            msg:validator
        })
    }
    else{
        //check existance of email
        User.findOne({email:req.body.email})
        .then(userdata=>{
            if(userdata == null)
            {
                res.json({
                    status:404,
                    success:false,
                    msg:'User not found'
                })
            }
            else{
                //compare password with user password
                bcrypt.compare(req.body.password,userdata.password,(err,data)=>{
                    if(err){
                        res.json({
                            status:409,success:false,msg:'Invalid password'
                        })
                    }
                    else{
                        payload = {
                            _id : userdata._id,
                            name : userdata.name,
                            email : userdata.email,
                            userType : userdata.userType,
                        }
                        token = jwt.sign(payload,secretkey,{
                            // expiresIn:60*30
                        })
                        res.json({
                            status:200,success:true,msg:'login successfully',data:userdata,token:token
                        })
                    }
                })
            }
        })
    }
}

// --------get all  start-----------

getalluser = (req,res)=>{
    User.find(req.body).exec()
    .populate('use')
    .then(udata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':udata
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


// ---------get single User-----------
getsingleuser = (req,res)=>{
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
        User.findOne({_id:req.body._id})
        .then(udata=>{
            res.json({
                'status':200,
                'success':true,
                'msg':'data loaded',
                'data':udata
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

module.exports = {
    register,
    changepassword,
    login,
    getalluser,
    getsingleuser,
}