const { Storage } = require('@google-cloud/storage');
const chokidar = require('chokidar');
const path = require('path');

// Initialize storage
const storage = new Storage({
  keyFilename: './capstone-recotive-5d79a14c2ccb.json',
});

const bucketName = 'capstone-recotive.appspot.com';
const bucket = storage.bucket(bucketName);

// Menentukan folder yang akan dipantau
const folderPath = './image';

// Membuat instance chokidar dan memantau folder
const watcher = chokidar.watch(folderPath, { ignored: /^\./, persistent: true });

// Mengunggah file saat ada perubahan
watcher.on('add', (filePath) => {
  const fileName = path.basename(filePath);
  const destination = `project/${fileName}`;

  bucket.upload(filePath, { destination }, (err, file) => {
    if (err) {
      console.error(`Error uploading file ${fileName}: ${err}`);
    } else {
      console.log(`File ${fileName} uploaded to ${bucketName} as ${destination}.`);
    }
  });
});

// Menampilkan pesan ketika memantau perubahan
watcher.on('ready', () => {
  console.log(`Mengawasi folder ${folderPath} untuk perubahan file...`);
});
