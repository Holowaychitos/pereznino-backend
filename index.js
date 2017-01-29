'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors') // @TODO: remove dependecie for production
const swig = require('swig')
const routes = require('./routes')

swig.setDefaults({
   varControls: ['[[', ']]']
})

let app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'))
app.use(cors())

const pub = __dirname + '/static'
app.use(express.static(pub))

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.use('/api', routes)

app.listen(3000, function () {
  console.log(`server running on: \n └─> http://localhost:3000`)
})

//
// const http = require('http')
// const Bot = require('messenger-bot')
//
// let bot = new Bot({
//   token: 'EAACuaOL6jxsBAItwc4Fk6MYsyOVrWVgOD5wDhESbbTZC5eOtNTg3AegFCGBdmiPZAaDH3lmTKdLCRuZCQ66iEFqyCPK4IWAwJb4PgkoeupUnXxz1R3QeSQVF6NrwLAMHP47n3BG4BZBPWSQq7fRlLKkFAmgGNwIZD',
//   verify: 'holaperritos',
//   app_secret: 'a9df93ebe012088b015a0e4ff7d14905'
// })
//
// bot.on('error', (err) => {
//   console.log(err.message)
// })
//
// bot.on('message', (payload, reply) => {
//   console.warn(JSON.stringify(payload))
//   let text = payload.message.text
//
//   bot.getProfile(payload.sender.id, (err, profile) => {
//     if (err) throw err
//
//     reply({ text }, (err) => {
//       if (err) throw err
//
//       console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
//     })
//   })
// })
//
// http.createServer(bot.middleware()).listen(3000)
// console.log('Echo bot server running at port 3000.')
