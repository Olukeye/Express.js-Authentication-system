const bodyparser      =   require('body-parser')
// const express         =   require('express')
// const router          =   require('./router/register')
// const bcrypt          =   require('bcryptjs')
// const path            =   require('path')
const cors            =   require('cors')
// const User            =   require('./model/user')
// const jwt             =   require('jsonwebtoken')
// const db              =   require('./db/mongoose')


// const app             =  express()
 
// app.use( cors())
// app.use(bodyparser.json())


// app.use(bodyparser.urlencoded({extended:false}))
// app.use('/', router)


// //define path for express config > > >
// const publicDirctoryPath     = path.join(__dirname, '/public')
// const viewsPath              = path.join(__dirname, '/template/views') // this is for customizing your view to any of your choice
// const partialPath            = path.join(__dirname, '/template/partials')

// // setup handlebar for engine and view location > > >
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)


// //set up static directory to serve > > >
// app.use(express.static(publicDirctoryPath))




// // setup server port > > >
// const port = process.env.PORT || 3088
// app.listen(port,()=>{
//     console.log('server is listening on port ' + port)
// })

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const indexRouter = require('./router/index.js');
const { connectDB } = require('./config/db.js');

dotenv.config();
connectDB();
const app = express();
app.use(morgan('dev'));
app.use(express.json())

app.use( cors())
app.use(bodyparser.json())


app.use(bodyparser.urlencoded({extended:false}))
const port = process.env.PORT || 5000;


app.use('/api/v1', indexRouter);



// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'https://firstporfolio.herokuapp.com/')))

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html')))
// } else {
//   app.get('/', (req, res) => { res.send('API is running') })
// }

app.get('/', (_req, res) => {
  res.send('/api/v1');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})