const { logger } = require('../lib/logger')
const Ceps = require('../model/cep')

const updateCep = async (id, retornoConsulta, cep) => {
  logger.info({
    message: 'Efetundo a UPDATE ⚙️',
    type: 'UPDATE',
    idUpdate: id,
  })
  const objectUpdate = retornoConsulta.erro
    ? { status: 'REJEITADO', motivo: `CEP ${cep} inválido` }
    : { status: 'CONCLUIDO', data: { ...retornoConsulta } }

  return await Ceps.updateOne({ _id: id }, objectUpdate, { upsert: true })
}

module.exports = { updateCep }
