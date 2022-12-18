const express = require('express')
const apis = require('./routes/apis')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.urlencoded({ extender: true }))
app.use('/api', apis)

app.listen(PORT, () => {
  console.log(`This is listening on http:/localhost:${PORT}`)
})