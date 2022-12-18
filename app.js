const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extname: true }))

app.listen(PORT, () => {
  console.log(`This is listening on http:/localhost:${PORT}`)
})