const firebase = require("firebase/app");
const storage = require("firebase/storage");

const firebaseConfig = {

  apiKey: "AIzaSyDHMIJWLSpn-VPs94bcVmZ3GDMRcoqlIaE",

  authDomain: "inventory-4d467.firebaseapp.com",

  projectId: "inventory-4d467",

  storageBucket: "inventory-4d467.appspot.com",

  messagingSenderId: "920592055735",

  appId: "1:920592055735:web:79c6bee31f48321e997c32"

};

const fireApp = firebase.initializeApp(firebaseConfig);
const fireStorage = storage.getStorage(fireApp);

module.exports = {
  fireStorage,
  storage
}