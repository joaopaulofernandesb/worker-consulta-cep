require('dotenv').config()

module.exports = {
  aws: {
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sqsQueueUrl: process.env.QUEUESQS,
  },
  mongodb: {
    dbUrl: process.env.DB_HOST,
  },
}
