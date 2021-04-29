const AWS = require("aws-sdk");

const http = require("./utils/http");

const QUEUE_URL = process.env.QUEUE_URL;

const sqs = new AWS.SQS();

exports.handler = async (event) => {
  for (let i = 0; i < event.Records.length; i++) {
    const record = event.Records[i];

    const { receiptHandle } = record;

    const { destination, ...messageBody } = JSON.parse(record.body);

    const deleteParams = {
      ReceiptHandle: receiptHandle,
      QueueUrl: QUEUE_URL,
    };

    await Promise.all([
      http.post(destination, messageBody),
      sqs.deleteMessage(deleteParams).promise(),
    ]);

    return 0;
  }
};
