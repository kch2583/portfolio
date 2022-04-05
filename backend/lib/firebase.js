const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { getStorage, ref, uploadBytes } = require("firebase-admin/storage");
// const {  } = require("firebase-admin/database");
var admin = require("firebase-admin");

var serviceAccount = require("../../my-portfolio-102b1-firebase-adminsdk-n8220-31f2b21a09.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const firebaseConfig = {
  apiKey: "AIzaSyDUp3qw8jAKf87yQk4RRwynBCD0pw1BMPk",
  authDomain: "my-portfolio-102b1.firebaseapp.com",
  databaseURL: "https://my-portfolio-102b1-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-102b1",
  storageBucket: "my-portfolio-102b1.appspot.com",
  messagingSenderId: "438446072055",
  appId: "1:438446072055:web:19304dd53ed34a464ff3f2",
  measurementId: "G-Q5KDKDVH6E",
  credential: admin.credential.cert(serviceAccount),
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

module.exports = { db, storage };
