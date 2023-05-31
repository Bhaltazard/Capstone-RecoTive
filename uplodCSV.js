const { Storage } = require('@google-cloud/storage')

// Initialize storage
const storage = new Storage({
  keyFilename: `./capstone-recotive-bde93f5faa84.json`,
})

const bucketName = 'capstone-recotive.appspot.com'
const bucket = storage.bucket(bucketName)

// Sending the upload request
bucket.upload(
    `catviewCount.csv`,
    {
      destination: `coba/catviewCount.csv`,
    },
    function (err, file) {
      if (err) {
        console.error(`Error uploading file catviewCount.csv: ${err}`)
      } else {
        console.log(`file catviewCount.csv uploaded to ${bucketName}.`)
      }
    }
  )
