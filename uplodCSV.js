const { Storage } = require('@google-cloud/storage')

// Initialize storage
const storage = new Storage({
  keyFilename: `./capstone-recotive-bde93f5faa84.json`,
})

const bucketName = 'capstone-recotive.appspot.com'
const bucket = storage.bucket(bucketName)

// Sending the upload request
bucket.upload(
  `pemandangan.jpg`,
  {
    destination: `pemandangan.jpg`,
  },
  function (err, file) {
    if (err) {
      console.error(`Error uploading image image_to_upload.jpeg: ${err}`)
    } else {
      console.log(`Image image_to_upload.jpeg uploaded to ${bucketName}.`)
    }
  }
)
