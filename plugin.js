'use strict'

const fp = require('fastify-plugin')
const urijs = require('uri-js')

function plugin (fastify, options, next) {
  fastify.decorateRequest('urlData', function (key) {
    const scheme = this.headers[':scheme'] ? this.headers[':scheme'] : this.protocol
    const host = this.headers[':authority'] || this.headers.host
    const path = this.headers[':path'] || this.raw.url
    const urlData = urijs.parse(scheme + '://' + host + path)
    if (key) return urlData[key]
    return urlData
  })
  next()
}

module.exports = fp(plugin, {
  fastify: '4.x',
  name: '@fastify/url-data'
})
