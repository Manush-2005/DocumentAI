import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHEBCc0UvXC1Qt5WZvCrwtPS-EyQHoZd8",
  authDomain: "github-expoxler.firebaseapp.com",
  databaseURL: "https://github-expoxler-default-rtdb.firebaseio.com",
  projectId: "github-expoxler",
  storageBucket: "gs://github-expoxler.appspot.com",
  messagingSenderId: "930061828551",
  appId: "1:930061828551:web:74a9860f653b03da3219e2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;

