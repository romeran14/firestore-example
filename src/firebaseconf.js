import { initializeApp } from "firebase/app";
//import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDWVbgBYyqnPXih1OdMsv446GgVp8Umbwo",
    authDomain: "curso-react-1bb36.firebaseapp.com",
    projectId: "curso-react-1bb36",
    storageBucket: "curso-react-1bb36.appspot.com",
    messagingSenderId: "798634473775",
    appId: "1:798634473775:web:b67841ba68cbe7aad549da",
    measurementId: "G-H98VQKQHTS"
  };

  const app = initializeApp(firebaseConfig);
 //const auth =getAuth(app)
 //const store = app.firestore()
 const store = getFirestore(app);

 // export default {auth}
  export default store