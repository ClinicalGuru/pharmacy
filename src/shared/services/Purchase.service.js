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
        console.log(newVendor, db,'vendor')
        return addDoc(vendorCollectionRef, newVendor);
    }

    getAllVendors = () => {
        return getDocs(vendorCollectionRef);
    }
    
}
export default new PurchaseService();
