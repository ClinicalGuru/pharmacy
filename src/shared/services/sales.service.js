import { firestore } from "../../context/firebase";
import { addDoc, getDocs, getDoc, collection, orderBy, limit, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const patientDetailsRef = collection(firestore, "patients");
const pharmacyBillingRef = collection(firestore, "pharmacyBilling");
// const inventoryRef = collection(firestore, "medicineInventory");

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
}
export default new SalesService();
