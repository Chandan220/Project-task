// console.log("Hello")
const router = require('express').Router()
const Projectcontroller = require("../controllers/ProjectController")
const usercontroller = require('../controllers/UserController')
const dashboardcontroller = require('../controllers/Dashboard')

const multer = require('multer')

// ----------multer start----------


const Projectstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Project')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  
  const Projectupload = multer({ storage: Projectstorage })


// ----------multer end----------
// ----------multer start----------


const Userstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/User')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  
  const Userupload = multer({ storage: Userstorage })


// ----------multer end----------


// --------User Router------------
router.post("/register",Userupload.single('image'),usercontroller.register)
router.post("/login",usercontroller.login)
router.post("/getalluser",usercontroller.getalluser)
router.post("/getallProject",Projectcontroller.getallProject)
// --------User Router------------

// router.use(require('../config/middleware'))

// ----------change pssword-----------
router.post("/dashboard",dashboardcontroller.dashboard)
router.post("/changepassword",usercontroller.changepassword)
router.post("/getsingleuser",usercontroller.getsingleuser)
// ----------change pssword-----------

// -------Project Router Start------------
router.post("/addProject",Projectupload.single('Project_Image'),Projectcontroller.addProject)
router.post("/getsingleProject",Projectcontroller.getsingleProject)
router.post("/updateProject",Projectcontroller.updateProject)
router.post("/deleteProject",Projectcontroller.deletedata)
// -------Project Router End------------





module.exports = router