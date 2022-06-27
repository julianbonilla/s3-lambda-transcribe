'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION
const transcribeService = new AWS.TranscribeService()
const s3 = new AWS.S3()

// Language list: en-US | es-US | en-AU | fr-CA | en-GB | de-DE | pt-BR | fr-FR | it-IT | ko-KR | es-ES | en-IN | hi-IN | ar-SA | ru-RU | zh-CN | nl-NL | id-ID | ta-IN | fa-IR | en-IE | en-AB | en-WL | pt-PT | te-IN | tr-TR | de-CH | he-IL | ms-MY | ja-JP | ar-AE
// See https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html for the most up-to-date list of languages available.
const DefaultLanguageCode = 'en-US'
const MediaFormat = 'mp3'

exports.handler = async (event) => {
  console.log (JSON.stringify(event, null, 2))

  try {
    await Promise.all(
      event.Records.map(async (record) => {
        const mediaUrl = `s3://${record.s3.bucket.name}/${record.s3.object.key}`
        const TranscriptionJobName = `${record.s3.object.key}-${Date.now()}`
    
        // Add dynamic language code
        let LanguageCode = DefaultLanguageCode
        
        // Submit job to Transcribe service
        const result =  await transcribeService.startTranscriptionJob({
          LanguageCode,
          Media: { MediaFileUri: mediaUrl },
          MediaFormat,
          TranscriptionJobName,
          OutputBucketName: process.env.TranscribeBucket
        }).promise()
        console.log(`Transcribe result: ${JSON.stringify(result, null, 0)}`)
      })
    )
  } catch (err) {
    console.error(err)
  }
}