if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const passport = require('./config/passport')
const cors = require('cors')

const apis = require('./routes/apis')

const app = express()

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://attendance-management-tau.vercel.app'
  ],
  methods: [
    'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'
  ],
  allowedHeaders: ['content-type', 'authorization']
}

const port = process.env.PORT || 3000

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apis)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
