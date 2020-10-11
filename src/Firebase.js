import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBmTZsRYQh4kqILJ1cWY935gONzNWrrkY0",
    authDomain: "carstagram-react.firebaseapp.com",
    databaseURL: "https://carstagram-react.firebaseio.com",
    projectId: "carstagram-react",
    storageBucket: "carstagram-react.appspot.com",
    messagingSenderId: "789677972926",
    appId: "1:789677972926:web:b212a2a8624fa90ba5edef",
    measurementId: "G-WYP8HKZMZH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export { auth , db };