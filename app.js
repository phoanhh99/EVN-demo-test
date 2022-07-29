const express = require('express')
const app = express()
const path = require('path')
const moment = require('moment')

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
app.use(
  '/moment',
  express.static(path.join(__dirname, '/node_modules/moment/dist'))
)

app.use(
  '/chart',
  express.static(path.join(__dirname, '/node_modules/chart.js/dist'))
)

app.use('/js', express.static(path.join(__dirname, '/src/js')))
app.use('/css', express.static(path.join(__dirname, '/src/css')))
app.use('/img', express.static(path.join(__dirname, '/src/img')))

const FIXED_TIME = '13/09/2021 17:00'

const NEXT_MONTH = moment(FIXED_TIME, 'DD/MM/YYYY HH:mm', 'vi')
  .add('1', 'month')
  .format('MMMM')

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
  res.send({FIXED_TIME, NEXT_MONTH})
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
