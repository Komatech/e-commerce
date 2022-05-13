const router = require('express').Router()
const user = require('../controllers/userController')

router.get('/',(req,res)=>{
    res.send('Hello')
})

router.post('/setup',user.registerAdmin)
router.post('/roles',user.roleSetup)

module.exports = router