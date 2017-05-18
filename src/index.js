'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const scanner = require('./server/bin')
const config = require('./config/')
const mediator = new EventEmitter()

console.log('--- Movies Service ---')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

const startStaticServer = _ => {
  scanner.start({}).then(_ => {
    return server.start({
      folder: config.serverSettings.folder,
      filesPort: config.serverSettings.filesPort,
      port: config.serverSettings.port,
      ssl: config.serverSettings.ssl
    })
  })
}

startStaticServer()

mediator.emit('boot.ready')
