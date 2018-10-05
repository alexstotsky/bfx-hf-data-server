'use strict'

process.env.DEBUG = 'hf:*'

require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('hf:data-server:examples:server')
const bfx = require('./bfx')

const logDataDBInfo = require('../lib/db/log_info')
const auditDB = require('../lib/db/audit')
const startDataServer = require('../lib/start')

const rest = bfx.rest(2)

const run = async () => {
  await logDataDBInfo()

  const ds = startDataServer({
    port: 8899,
    rest
  })

  await auditDB(ds)
  await logDataDBInfo()
}

try {
  run()
} catch (e) {
  debug(e.stack)
}
