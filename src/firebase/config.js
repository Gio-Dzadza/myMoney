import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDCjLx0fzIoQxpSuJTCGOwBaZwXB9kJmiE",
    authDomain: "mymoney-63192.firebaseapp.com",
    projectId: "mymoney-63192",
    storageBucket: "mymoney-63192.appspot.com",
    messagingSenderId: "822747607760",
    appId: "1:822747607760:web:0d08b966dfee53c6aa64d5"
};

// init firebase

firebase.initializeApp(firebaseConfig);

// init services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;


export { projectFirestore, projectAuth, timestamp }

