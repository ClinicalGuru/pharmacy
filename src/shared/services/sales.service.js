import { firestore } from "../../context/firebase";
import { addDoc, getDocs, updateDoc, collection, orderBy, limit, doc, query, onSnapshot, writeBatch, where, get} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const patientDetailsRef = collection(firestore, "patients");
const pharmacyBillingRef = collection(firestore, "pharmacyBills");
// const inventoryRef = collection(firestore, "medicineInventory");
const returnBillsRef = collection(firestore, 'returnBills');
class SalesService {
    addPatient = async (patientDetails) => {
        //  await addDoc(medicineCollectionRef, medicine);
        try {
            const docRef = await addDoc(patientDetailsRef, patientDetails);
            if (docRef && docRef.id) {
                console.log(docRef.id, docRef, 'docRef');
                return docRef.id;
            } else {
                throw new Error("Document reference or ID is undefined");
            }
        } catch (error) {
            console.error("Error adding medicine:", error);
            throw error;
        }
    }

    addPharmacyBilling = (newBill) => {
        return addDoc(pharmacyBillingRef, newBill);
    }

    addReturnBill = (returnBill) => {
        return addDoc(returnBillsRef, returnBill);
    }
    getReturnBills = async () => {
        const q = query(returnBillsRef);
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ returnBillDocId: doc.id, ...doc.data() }));
    }

    getBillsByTimestamp = async (startDate, endDate) => {
        const q = query(pharmacyBillingRef, where('billDate', '>=', startDate), where('billDate', '<=', endDate));
        return await getDocs(q);
        // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // updateBill = async (billDetails) => {
    //     const docRef = doc(pharmacyBillingRef, billDetails?.id);
    //     return await updateDoc(docRef, billDetails)
    // }
}
export default new SalesService();
