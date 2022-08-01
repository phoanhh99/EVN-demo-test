const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/index.html'))
})

// app.use('/js', express.static(path.join(__dirname, '/src/js')))
// app.use('/css', express.static(path.join(__dirname, '/src/css')))
// app.use('/img', express.static(path.join(__dirname, '/src/img')))
app.use('/dist', express.static(path.join(__dirname, '/dist')))

const FIXED_TIME = '13/09/2021 17:00'

const FIXED_USERACCOUNT = {
  fullname: 'Nguyễn Văn A',
  uid: 'PD10000011297',
}

const TARIFF_LIST = [
  {id: 1, value: '15,200.74', color: '#6C5DD3'},
  {id: 2, value: '6,775.64', color: '#FFA2C0'},
  {id: 3, value: '5,112.81', color: '#3F8CFF'},
]

app.get('/GetUser', (req, res) => {
  res.send(FIXED_USERACCOUNT)
})
app.get('/GetTime', (req, res) => {
  res.send({FIXED_TIME})
})
app.get('/GetThongSo', (req, res) => {
  res.send(JSON.stringify(TARIFF_LIST))
})
// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
