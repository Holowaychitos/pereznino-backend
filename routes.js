'use strict'
const router = require('express').Router()
const path = require('path')

const rest = function (id) {
  return {
    "messages": [
      {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": "¿Quieres calificar el servicio de la dependencia?",
            "buttons": [
              {
                "type": "web_url",
                "url": `https://21cb5645.ngrok.io/api/state?q=${id}`,
                "title": "Sí",
                "messenger_extensions": true,
                "webview_height_ratio": "compact",
                "fallback_url": "https://21cb5645.ngrok.io/api/verify?q="
              }, {
                "type": "show_block",
                "block_name": "SUPER BYE",
                "title": "En otra ocasión"
              },
            ]
          }
        }
      }
    ]
  }
}

router.route('/state').get((request, response) => {
  // response.render('index', {})

  response.sendFile(path.join(__dirname + '/views/stars.html'))
  // response.send(`ID user ${request.query.q}`)
})

router.route('/verify').get(function (request, response) {
  console.warn(request.query)
  // console.warn(request.params)
  // console.warn(request.body)
  // response.send(request.query['hub.challenge'])
  response.json(rest(request.query.q))
})

router.route('/verify').post(function (request, response) {
  console.warn(JSON.stringify(request.body, null, 2))
})

module.exports = router
