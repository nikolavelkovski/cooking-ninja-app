import firebase from "firebase/app";
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBUFOgdBBryw40lUXtvw9c-Nd71A2yHRKg",
    authDomain: "cooking-ninja-3358e.firebaseapp.com",
    projectId: "cooking-ninja-3358e",
    storageBucket: "cooking-ninja-3358e.appspot.com",
    messagingSenderId: "525380904275",
    appId: "1:525380904275:web:53227c0db1e7927d672da6"
};


// init firebase
firebase.initializeApp(firebaseConfig);


//init services
firebase.firestore();

const projectFirestore = firebase.firestore();

export { projectFirestore }