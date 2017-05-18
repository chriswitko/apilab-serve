'use strict'
const server = require('./server')
const config = require('../config/')

const startStaticServer = _ => {
  return server.start({
    port: config.serverSettings.port,
    ssl: config.serverSettings.ssl
  })
}

module.exports = Object.assign({}, {startStaticServer})

