// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


interface FirebaseConfig {
    apiKey:string,
    authDomain:string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string
}
// Your web app's Firebase configuration
const firebaseConfig : FirebaseConfig ={
  apiKey: "AIzaSyDOKymLq3GGU1xh8tVU5UHmgioIVuaBMqk",
  authDomain: "chat-appbybhagyashree.firebaseapp.com",
  projectId: "chat-appbybhagyashree",
  storageBucket: "chat-appbybhagyashree.appspot.com",
  messagingSenderId: "910938813759",
  appId: "1:910938813759:web:9988de5320d61304fe0f8a"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app