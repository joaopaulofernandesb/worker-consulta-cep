const pino = require('pino')

const logger = pino({ enabled: true })

module.exports = {
  logger,
}
