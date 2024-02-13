import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOA_DatoyS5TInUbzaOOTYQSAC9YawO94",
  authDomain: "herrands-62c51.firebaseapp.com",
  projectId: "herrands-62c51",
  storageBucket: "herrands-62c51.appspot.com",
  messagingSenderId: "691399101275",
  appId: "1:691399101275:web:0f7f1e121ece135c63e87e",
  measurementId: "G-8JZZN94XDT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export {firebase}