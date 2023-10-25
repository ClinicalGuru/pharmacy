import { firestore } from "../../context/firebase";
import { addDoc, getDocs, collection, setDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const vendorCollectionRef = collection(firestore, "vendors");
const RequisitionCollectionRef = collection(firestore, "purchaseRequisition")

class PurchaseService {
    addVendor = (newVendor) => {
        return addDoc(vendorCollectionRef, newVendor);
    }

    getAllVendors = () => {
        return getDocs(vendorCollectionRef);
    }

    addRequisitionData = (newData) => {
        const data = Object.assign({}, newData)
        return addDoc(RequisitionCollectionRef, data);
    }

    // addRequisitionData = (newData) => {
    //     let batch = db.batch();
    //     if (newData.length > 0) {
    //         newData.forEach((doc) => {
    //             let docRef = db.collection(firestore, 'purchaseRequisition').doc();
    //             batch.set(docRef, JSON.parse(JSON.stringify(doc)))
    //         });
    //         return batch.commit();
    //     } else {
    //         return;
    //     }
    // }

}
export default new PurchaseService();
