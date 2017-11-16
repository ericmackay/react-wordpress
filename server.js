const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
;(async () => {
  await app.prepare()

  server.get('/blog/:slug', (req, res) =>
    app.render(req, res, '/blogpost', req.params)
  )

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`Listening on http://0.0.0.0:${port}`)
  })
})()
