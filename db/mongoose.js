const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Authentication',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})