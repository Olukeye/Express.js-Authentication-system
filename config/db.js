// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/Authentication',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology: true 
// })

const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`Connected to MongoDB Successfully`);
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}