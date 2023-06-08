var admin = require("firebase-admin");

var serviceAccount = require("./capstone-recotive-firebase-adminsdk-91sz0-13707e85bd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-recotive-default-rtdb.asia-southeast1.firebasedatabase.app"
});
// Referensi ke database
var db = admin.database();
var ref = db.ref('C:\Farhan\Sistem Informasi\Matkul\semester 6\Bangkit\Capstone Project\Product Project\Reco');

// Membaca data
ref.on('value', function(snapshot) {
  console.log(snapshot.val());
});

// Menulis data
ref.set('Hello, Firebase!');


// Referensi ke koleksi data
var collectionRef = db.ref('content');

// Membuat data baru di koleksi dengan ID unik
var newDataRef = collectionRef.push();
newDataRef.set({
content: 'hello gusys',
youtube: 'hangli',

});
