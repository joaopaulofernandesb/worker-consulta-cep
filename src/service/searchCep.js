const axios = require('axios')
const { logger } = require('../lib/logger')

const searchCep = async cep => {
  logger.info({
    message: 'Efetundo a Requisição 📨',
    type: 'REQUISIÇÃO',
    CEP: cep,
  })
  const { data } = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
  return data
}

module.exports = { searchCep }
