require('dotenv').config()
const AWS = require('aws-sdk')
const { logger } = require('./lib/logger')
const config = require('./config/config')
const { searchCep } = require('./service/searchCep')
const { searchBanco } = require('./service/searchBanco')
const { updateCep } = require('./service/updateCep')
const banco = require('./lib/banco')

AWS.config.update(config.aws)

AWS.config.update({ region: config.aws.region })

var sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

banco.connect()

const containsNewMessage = response =>
  response.Messages ? response.Messages.length !== 0 : false

logger.info({
  message: 'Worker Started 🔂',
  type: 'CONSULTA',
})

const start = async () => {
  var queueURL = config.aws.sqsQueueUrl

  const params = {
    QueueUrl: queueURL,
    MessageAttributeNames: ['id'],
  }

  try {
    const response = await sqs.receiveMessage(params).promise()

    if (!containsNewMessage(response)) return start()

    const [message] = response.Messages

    const id =
      message.MessageAttributes.id && message.MessageAttributes.id.StringValue

    if (id) {
      logger.info({
        message: 'Menssagem Recebida ✅',
        type: 'CONSULTA',
        idReceived: id,
      })
      const deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: message.ReceiptHandle,
      }

      const { cep } = await searchBanco(id)

      const retornoConsulta = await searchCep(cep)

      await updateCep(id, retornoConsulta, cep)

      await deleteSqs(deleteParams)
    }

    if (!id) {
      return start()
    }
  } catch (error) {
    console.log(error)
  }

  return start()
}

const main = async () => {
  start().catch(error => {
    console.log(error, 'Fail on worker execution')
  })
}

const deleteSqs = async (deleteParams, id) => {
  sqs.deleteMessage(deleteParams, function (err, data) {
    if (err) {
      logger.info({
        message: 'Menssagem Deletada ❌',
        type: 'CONSULTA',
        idReceived: err,
      })
    } else {
      logger.info({
        message: 'Mensagem Deletada com Sucesso da Fila 🗑️',
        type: 'CONSULTA',
        idReceived: data,
      })
    }
  })
}

main()
