import { firestore } from "../../context/firebase";
import { addDoc, getDocs, collection, setDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const vendorCollectionRef = collection(firestore, "vendors");

class PurchaseService {
    addVendor = (newVendor) => {
        return addDoc(vendorCollectionRef, newVendor);
    }

    getAllVendors = () => {
        return getDocs(vendorCollectionRef);
    }

}
export default new PurchaseService();
