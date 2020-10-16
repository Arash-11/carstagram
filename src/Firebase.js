import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBAllZhTQLY1F5_ESG_qJVCHHhrPivLMzU",
    authDomain: "organizr-1be2c.firebaseapp.com",
    databaseURL: "https://organizr-1be2c.firebaseio.com",
    projectId: "organizr-1be2c",
    storageBucket: "organizr-1be2c.appspot.com",
    messagingSenderId: "666570776322",
    appId: "1:666570776322:web:20dd1215f5c5a07d9f2c1b",
    measurementId: "G-ZDG59TZWDX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export { auth , db };