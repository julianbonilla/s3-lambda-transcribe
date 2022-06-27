'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION
const s3 = new AWS.S3()

exports.handler = async (event) => {
  const record = event.Records[0]
  
  // Load JSON object
  const response = await s3.getObject({
    Bucket: record.s3.bucket.name,
    Key: record.s3.object.key
  }).promise()

  // Extract the transcript
  const originalText = JSON.parse(response.Body.toString('utf-8'))
  const Text = originalText.results.transcripts[0].transcript

  // Convert to txt/doc/pdf and write to S3
  const result = await s3.putObject({
    Bucket: process.env.ConvertBucket,
    Key: `${record.s3.object.key}.txt`,
    ContentType: 'text/plain',
    Body: Text
  }).promise()
  
  console.log('Write result: ', result)
}