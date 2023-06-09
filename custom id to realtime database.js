const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Inisialisasi aplikasi Firebase
const serviceAccount = require("./path/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-recotive-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Referensi ke koleksi data
const db = admin.database();
const collectionRef = db.ref("youtube");

// Membuat data baru di koleksi dengan ID 1
var newDataRef1 = collectionRef.child("1");
newDataRef1.set({
  content: "Hello",
  youtube: "Video 1"
}, function(error) {
  if (error) {
    console.log("Data gagal ditambahkan: " + error);
  } else {
    console.log("Data berhasil ditambahkan dengan ID: 1");
  }
});

// Membuat data baru di koleksi dengan ID 2
var newDataRef2 = collectionRef.child("2");
newDataRef2.set({
  content: "Hi",
  youtube: "Video 2"
}, function(error) {
  if (error) {
    console.log("Data gagal ditambahkan: " + error);
  } else {
    console.log("Data berhasil ditambahkan dengan ID: 2");
  }
});
// Baca file CSV dan impor datanya serta tetapkan id nya secara berurutan 
let nextDataId = 1; // Nomor urutan berikutnya

collectionRef.once("value", (snapshot) => {
  const existingDataCount = snapshot.numChildren();
  nextDataId += existingDataCount;

  const dataToAdd = []; // Array untuk menyimpan data yang akan ditambahkan

  fs.createReadStream("./csv/catrelevance.csv")
    .pipe(csv())
    .on("data", (data) => {
      // Menambahkan data ke array dengan ID yang telah ditetapkan
      dataToAdd.push({
        id: nextDataId,
        ...data
      });

      nextDataId++; // Tambahkan nomor urutan untuk data selanjutnya
    })
    .on("end", () => {
      // Menambahkan seluruh data ke Firebase Realtime Database secara transaksional
      const updates = {};
      dataToAdd.forEach((data) => {
        const newDataRef = collectionRef.child(data.id.toString());
        updates[newDataRef.key] = data;
      });

      collectionRef.update(updates, (error) => {
        if (error) {
          console.error("Gagal menambahkan data:", error);
        } else {
          console.log("Data berhasil ditambahkan.");
        }
      });
    })
    .on("error", (error) => {
      console.error("Terjadi kesalahan saat membaca file CSV:", error);
    });
});


