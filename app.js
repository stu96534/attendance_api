const express = require('express')
const passport = require('./config/passport')
const apis = require('./routes/apis')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.urlencoded({ extender: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', apis)

app.listen(PORT, () => {
  console.log(`This is listening on http:/localhost:${PORT}`)
})