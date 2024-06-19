import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
 
const firebaseConfig = {
  apiKey: "AIzaSyCNp3Qf0bA-je0fqwESO2uwQhQR6NWBQuA",
  authDomain: "cliniosqa-7f2c0.firebaseapp.com",
  projectId: "cliniosqa-7f2c0",
  storageBucket: "cliniosqa-7f2c0.appspot.com",
  messagingSenderId: "498980221279",
  appId: "1:498980221279:web:193be9b8e5d589f748c6ea"
};
 
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const db = getFirestore(app);
export { db };