import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
 
const firebaseConfig = {
  apiKey: "AIzaSyAwYwqnguc2ceukeOUBxZt0KTInoHHnDXM",
  authDomain: "clinios-dev-257e9.firebaseapp.com",
  projectId: "clinios-dev-257e9",
  storageBucket: "clinios-dev-257e9.appspot.com",
  messagingSenderId: "906627808913",
  appId: "1:906627808913:web:f1d8776f84bd87187b4930",
  measurementId: "G-H3E7DQS7NK"
};
 
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)