const bodyparser      =   require('body-parser')
const express         =   require('express')
const router          =   require('./router/register')
const bcrypt          =   require('bcryptjs')
const path            =   require('path')
const User            =   require('./model/user')
const jwt             =   require('jsonwebtoken')
const hbs             =   require('hbs')
const db              =   require('./db/mongoose')


const app             =  express()
 

app.use(bodyparser.json())


app.use(bodyparser.urlencoded({extended:false}))
app.use('/', router)

//define path for express config > > >
const publicDirctoryPath     = path.join(__dirname, '/public')
const viewsPath              = path.join(__dirname, '/template/views') // this is for customizing your view to any of your choice
const partialPath            = path.join(__dirname, '/template/partials')

// setup handlebar for engine and view location > > >
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//set up static directory to serve > > >
app.use(express.static(publicDirctoryPath))




// setup server port > > >
const port = process.env.PORT || 3088
app.listen(port,()=>{
    console.log('server is listening on port ' + port)
})
