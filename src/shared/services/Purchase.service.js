import { db } from "../../context/firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
const vendorCollectionRef = collection(db, "vendor");

class PurchaseService {
    addVendor = (newVendor) => {
        return addDoc(vendorCollectionRef, newVendor);
    }
    
}
export default new PurchaseService();
