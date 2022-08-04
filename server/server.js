const express = require('express')
const https = require('https')
const config = require('./config/config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const employeerouter = require('./routes/employee-router')
const userrouter = require('./routes/user-router')

const app = express()

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000 }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))

//Routing
app.use(employeerouter).use(userrouter)

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4897
app.listen(port, () => {
    console.log('Server listening on port ' + port)
});