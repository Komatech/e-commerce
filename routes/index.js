const router = require('express').Router()
const user = require('../controllers/userController')

router.get('/',(req,res)=>{
    res.send('Hello')
})

//                  Create Routes
router.post('/setup',user.registerAdmin)
router.post('/create/roles',user.roleSetup)
router.post('/create/category',user.categorySetup)
router.post('/create/subcategory',user.subcategorySetup)
router.post('/create/minicategory',user.minicategorySetup)
router.post('/create/product',user.productCreation)


//                  Read Routes
router.get('/users',user.viewAllUsers)
module.exports = router