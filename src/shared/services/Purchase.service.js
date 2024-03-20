import { firestore } from "../../context/firebase";
import { addDoc, getDocs, collection, setDoc, deleteDoc, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const vendorCollectionRef = collection(firestore, "vendors");
const requisitionCollectionRef = collection(firestore, "purchaseRequisition");
const quotationCollectionRef = collection(firestore, "quotation");
const medicineCollectionRef = collection(firestore, "pMedicines")

class PurchaseService {
    addVendor = (newVendor) => {
        return addDoc(vendorCollectionRef, newVendor);
    }

    addMedicine = async (medicine) => {
        //  await addDoc(medicineCollectionRef, medicine);
        try {
            const docRef = await addDoc(medicineCollectionRef, medicine);
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

    getAllMedicinesByFilter = async (medicine) => {
        console.log(medicine, 'medicine serveice')
        const queryRef = await query(medicineCollectionRef, where("brandName", "==", medicine?.brandName), where("dose", "==", medicine?.dose), where("form", "==", medicine?.form));
        const querySnapshot = await getDocs(queryRef);
        const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return filteredData;
    }

    getAllMedicines = async () => {
        return getDocs(medicineCollectionRef);
    }

    getAllVendors = () => {
        return getDocs(vendorCollectionRef);
    }

    getVendor = async (vendorId) => {
        const queryRef = query(vendorCollectionRef, where("vendorId", "==", vendorId));
        const querySnapshot = await getDocs(queryRef);
        const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return filteredData;
    }

    addRequisitionData = async (data) => {
        // const batch = [];
        // data.forEach((object) => {
        //     const docRef = requisitionCollectionRef;
        //     batch.push(addDoc(docRef, object));
        // });

        // try {
        //     await Promise.all(batch);
        //     console.log('Requisition data added to Firestore successfully!');
        // } catch (error) {
        //     console.error('Error adding data to Firestore: ', error);
        // }
        return addDoc(requisitionCollectionRef, data);
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

    saveQuotation = async (data) => {
        // return addDoc(quotationCollectionRef, data);
        const batch = [];
        data.forEach((object) => {
            const docRef = quotationCollectionRef;
            batch.push(addDoc(docRef, object));
        });

        try {
            await Promise.all(batch);
            console.log('Quotation data added to Firestore successfully!');
        } catch (error) {
            console.error('Error adding data to Firestore: ', error);
        }
    }
    medicineById = async (medicineId) => {
        console.log(medicineId, 'medicine id')
        const queryRef = query(quotationCollectionRef, where("id", "==", medicineId));
        const querySnapshot = await getDocs(queryRef);
        const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return filteredData;
    }
}
export default new PurchaseService();
