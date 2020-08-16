const validator   = require('validator')
const mongoose    = require('mongoose')
const router      =  require('../router/register')
const jwt         = require('jsonwebtoken')

// setup for Schema ===============================>
const userSchema  = new mongoose.Schema({
    name:{
        type:   'string',
        require: true, 
        trim:    true
    },
    email:{
        type:'string',
        require: true,
        trim: true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error('Email is invalid')
            }
        }
    },
    password:{
        type:'string',
        require:true,
        trim:true,
        minlength:8,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new error('password cannot contain password')
            }
        }
    },
    tokens:[{
        token:{
            type:'string',
            require:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user  = this 
    const token = jwt.sign({_id:user._id.toString() }, 'thisisthetoken')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const Register = mongoose.model('Register', userSchema)

module.exports = Register