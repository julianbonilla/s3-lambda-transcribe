# Audio converter - transcription and document converter

This application automatically transcribes uploaded MP3 audio files, and extracts the transcript to txt/pdf/doc files.

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 16.x installed](https://nodejs.org/en/download/)

## Installation Instructions

1. Clone the repo `git clone https://github.com/julianbonilla/s3-lambda-transcribe`.

1. From the command line, change directory to repo, then run:
```
sam build
sam deploy --guided
```
Follow the prompts in the deploy process to set the stack name, AWS Region and other parameters.

## Parameter Details

* AudioBucketName: unique name of an S3 bucket for mp3 uploads (.mp3)
* TranscribeBucketName: unique name of S3 bucket for transcription result (.json)
* ConvertBucketName: unique name of S3 bucket for converted transcript (.txt, .pdf, .doc)
* DefaultLanguageCode: The language code of your audio file (en-US)

## How it works

* Upload an MP3 file of a person speaking (ending in the suffix '.mp3') to the target S3 bucket.
* After a few seconds you will see a transcription file in the TranscribeBucketName (using the same object name with .json appended).
* This triggers a conversion from .json to .txt/pdf/doc and the result is stored in the ConvertBucketName.
