const express = require('express')
const path = require('path')
const proxy = require('express-http-proxy')
const morgan = require('morgan')
const helmet = require('helmet')
const api = require('../api')
const movies = require('../api/movies')

const cacheTime = 86400000 * 7 // 7 days

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())

    app.use('/assets', express.static(path.join(process.cwd(), './src/assets'), { maxAge: cacheTime }))

    api(app, options)
    movies(app, options)

    app.use('/', proxy('http://localhost:' + options.filesPort, {
      preserveHostHdr: true,
      timeout: 10000
    }))

    app.use((req, res, next) => {
      res.sendfile(path.join(__dirname, '../assets/404.html'))
    })

    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    const server = app.listen(options.port, () => resolve(server))
    console.log(`Server connected listening on port ${options.port}`)
  })
}

module.exports = Object.assign({}, {start})
