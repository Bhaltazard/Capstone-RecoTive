const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Inisialisasi aplikasi Firebase
const serviceAccount = require("./path/firebase-serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-recotive-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Referensi ke koleksi data
const db = admin.database();
const collectionRef = db.ref("youtube");
const categoryRef = collectionRef.child("category");

// Baca file CSV dan impor datanya serta tetapkan id nya secara berurutan 
let nextDataId = 1; // Nomor urutan berikutnya

collectionRef.once("value", (snapshot) => {
  const existingDataCount = snapshot.numChildren();
  nextDataId += existingDataCount;

  const dataToAdd = {}; // Object to store data grouped by category

  fs.createReadStream("./csv/data_clean.csv")
    .pipe(csv())
    .on("data", (data) => {
      const category = data.category;

      if (!dataToAdd[category]) {
        dataToAdd[category] = []; // Create an empty array for the category if it doesn't exist
      }

      // Add data to the corresponding category array
      dataToAdd[category].push({
        id: nextDataId,
        ...data
      });

      nextDataId++; // Increment the next data ID
    })
    .on("end", () => {
      // Add data to Firebase Realtime Database for each category
      const updates = {};
      for (const category in dataToAdd) {
        const categoryData = dataToAdd[category];
        categoryData.forEach((data) => {
          const newDataRef = categoryRef.child(data.id.toString()); // Use categoryRef instead of collectionRef
          updates[newDataRef.key] = data;
        });
      }

      categoryRef.update(updates, (error) => { // Use categoryRef instead of collectionRef
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
