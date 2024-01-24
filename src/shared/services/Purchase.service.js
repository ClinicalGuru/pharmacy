import { firestore } from "../../context/firebase";
import { addDoc, getDocs, collection, setDoc, deleteDoc, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";
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

    getRequesitionData = async (vendorId) => {
        const queryRef = query(requisitionCollectionRef, where("vendorId", "==", vendorId));
        const querySnapshot = await getDocs(queryRef);

        // Now you can use the querySnapshot as needed
        const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        return filteredData;
    }

    savingPurchageRequesition = async (data) => {

    }
}
export default new PurchaseService();
