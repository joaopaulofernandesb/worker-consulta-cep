const mongoose = require('mongoose')

const dadosCep = new mongoose.Schema({
  cep: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: 'PROCESSANDO',
  },
  motivo: {
    type: String,
  },
  data: {
    logradouro: {
      type: String,
      required: false,
    },
    complemento: {
      type: String,
      required: false,
      default: null,
    },
    bairro: {
      type: String,
      required: false,
    },
    localidade: {
      type: String,
      required: false,
    },
    uf: {
      type: String,
      required: false,
    },
    ibge: {
      type: String,
      required: false,
    },
    gia: {
      type: String,
    },
    ddd: {
      type: String,
      required: false,
    },
    siafi: {
      type: String,
      required: false,
    },
  },
  timestamps: false,
})

module.exports = mongoose.model('Ceps', dadosCep)
