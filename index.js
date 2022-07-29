const express = require('express')
const app = express()
const path = require('path')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/index.html'))
})
app.use(
  '/jq',
  express.static(path.join(__dirname, '/node_modules/jquery/dist'))
)
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist'))
)
app.use(
  '/fontawesome',
  express.static(path.join(__dirname, '/node_modules/@fortawesome'))
)
app.use('/js', express.static(path.join(__dirname, '/src/js')))
app.use('/css', express.static(path.join(__dirname, '/src/css')))
app.use('/img', express.static(path.join(__dirname, '/src/img')))

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
