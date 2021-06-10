const { logger } = require('../lib/logger')
const Ceps = require('../model/cep')

const searchBanco = async id => {
  logger.info({
    message: 'Buscando no Banco 🔎',
    type: 'CONSULTA',
    idReceived: id,
  })
  const data = await Ceps.findOne({ _id: id })
  return data
}

module.exports = { searchBanco }
