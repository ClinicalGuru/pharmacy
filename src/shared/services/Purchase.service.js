import { firestore } from "../../context/firebase";
import { addDoc, getDocs, collection, setDoc, deleteDoc, doc, query, onSnapshot, writeBatch } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const vendorCollectionRef = collection(firestore, "vendors");
const requisitionCollectionRef = collection(firestore, "purchaseRequisition");
class PurchaseService {
    addVendor = (newVendor) => {
        return addDoc(vendorCollectionRef, newVendor);
    }

    getAllVendors = () => {
        return getDocs(vendorCollectionRef);
    }

    addRequisitionData = async (newData) => {
        const batch = [];
        newData.forEach((object) => {
            const docRef = requisitionCollectionRef;
            batch.push(addDoc(docRef, object));
        });

        try {
            await Promise.all(batch);
            console.log('Data added to Firestore successfully!');
        } catch (error) {
            console.error('Error adding data to Firestore: ', error);
        }
    }

    getRequestionData = () => {
        return getDocs(requisitionCollectionRef);
    }
}
export default new PurchaseService();
