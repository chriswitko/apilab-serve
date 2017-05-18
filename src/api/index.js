'use strict'

const ResponseInterceptor = require('./ResponseInterceptor')

module.exports = (app, options) => {
  // publish to CDN only, create new git @tag and chekcout to @master branch

  app.get('/api/insights', (req, res, next) => {
    ResponseInterceptor({
      status: 'insights'
    }, res)
  })

  // get the list of the assets
  app.get('/api/list', (req, res, next) => {
    ResponseInterceptor({
      status: 'list'
    }, res)
  })

  // download zipped folder
  app.get('/api/download', (req, res, next) => {
    ResponseInterceptor({
      status: 'download'
    }, res)
  })

  // app.get('/*/@:id', (req, res, next) => {
  //   ResponseInterceptor({
  //     status: 'single version'
  //   }, res)
  // })

  // rename asset
  app.put('/api/rename', (req, res, next) => {
    ResponseInterceptor({
      status: 'list'
    }, res)
  })

  // always to @develop branch
  app.post('/api/mv', (req, res, next) => {
    ResponseInterceptor({
      status: 'upload'
    }, res)
  })

  // always to @develop branch
  app.post('/api/upload', (req, res, next) => {
    ResponseInterceptor({
      status: 'upload'
    }, res)
  })

  app.post('/api/publish', (req, res, next) => {
    ResponseInterceptor({
      status: 'publish'
    }, res)
  })

  // delete folder
  app.delete('/api/delete', (req, res, next) => {
    ResponseInterceptor({
      status: 'delete'
    }, res)
  })

  // POST: upload

  // app.get('/version/:id/download', (req, res, next) => {
  //   ResponseInterceptor({
  //     status: '_versions'
  //   }, res)
  // })

  app.get('/test', (req, res, next) => {
    next(new Error('Something went wrong :-('))
  })
}

