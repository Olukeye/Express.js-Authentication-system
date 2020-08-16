const express          = require('express')
const bcrypt           = require('bcryptjs')
const router           = new express.Router()
const User             = require('../model/user')
const auth             = require('../middleware/auth')
const jwt              = require('jsonwebtoken')



router.post('/register',async(req,res)=>{
    const  user = await User.findOne({ email: req.body.email });
    if (user) {
             return res.status(400).send('User already exist!');
         }
try{
    const salt = await bcrypt.genSalt(8)
         const user = new User({
             name: req.body.name,
             email: req.body.email,
             password: await bcrypt.hash(req.body.password,salt) // ->this is to hash the password using bcrypt
         });
         await user.save();

    const token = await user.generateAuthToken()
    res.send({user,token})
}catch(e){
    res.status(400).send()
}
})
// ===================================================>

// setup for login/sign in route ======================>
router.post('/login',async(req, res, next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).send ('incorrect email or password')
        }
       
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(400).send('unable to login!')
        }
        await user.save()
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(500).send()
    }
})
// ====================================================>

// =========Route for authenticating a user token===========>
router.get('/user/me', auth,  async (req, res) => {
    res.send(req.user)
})
// ===================================>


// setup for log out ====================================>
router.post('/logout', auth,  async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('you have logged out successfully')
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
