// Import library yang dibutuhkan
const { Storage } = require('@google-cloud/storage');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
// Inisialisasi storage
const storage = new Storage({
  keyFilename: './capstone-recotive-5d79a14c2ccb.json',
});

const bucketName = 'capstone-recotive.appspot.com';
const bucket = storage.bucket(bucketName);

// Mendapatkan file dari Google Cloud Storage
async function getFileFromStorage(filePath) {
  try {
    const file = bucket.file(filePath);

    // Mendownload file dari penyimpanan
    const [data] = await file.download();

    // Proses data jika diperlukan untuk digunakan dalam machine learning

    return data;
  } catch (error) {
    console.error('Error retrieving file from Google Cloud Storage:', error);
    throw error;
  }
}

// Mendapatkan semua file dalam folder dari Google Cloud Storage
async function getAllFilesFromFolder(folderPath) {
  try {
    const query = {
      prefix: folderPath,
    };

    const [files] = await bucket.getFiles(query);

    return files;
  } catch (error) {
    console.error('Error retrieving files from Google Cloud Storage:', error);
    throw error;
  }
}

// Contoh penggunaan
const folderPath = 'Data_Kotor/';

getAllFilesFromFolder(folderPath)
  .then(files => {
    // Menyimpan setiap file dalam folder sebagai file CSV
    files.forEach((file, index) => {
      getFileFromStorage(file.name)
        .then(data => {
          const dataString = data.toString('utf-8'); // Ubah buffer menjadi string

          // Menyimpan dataString sebagai file CSV dengan nama yang sama
          const fileName = file.name.replace(folderPath, ''); // Menghapus folderPath dari nama file
          fs.writeFile(fileName, dataString, 'utf-8', (err) => {
            if (err) {
              console.error(`Terjadi kesalahan saat menyimpan file ${fileName}:`, err);
            } else {
              console.log(`File ${fileName} berhasil disimpan.`);
            }
          });
        })
        .catch(error => {
          console.error('Terjadi kesalahan:', error);
        });
    });
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });
