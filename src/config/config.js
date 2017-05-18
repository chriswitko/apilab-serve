// TODO: Add env versions dev, beta, prod
const serverSettings = {
  static: true,
  folder: '/Users/chris/projects/stuff/ismp_data',
  port: process.env.PORT || 3000,
  filesPort: process.env.FILES_PORT || 3001,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { serverSettings })
