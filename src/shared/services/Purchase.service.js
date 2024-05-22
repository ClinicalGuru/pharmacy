import { firestore } from "../../context/firebase";
import { addDoc, getDocs, getDoc, collection, orderBy, limit, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const vendorCollectionRef = collection(firestore, "vendors");
const requisitionCollectionRef = collection(firestore, "purchaseRequisition");
const quotationCollectionRef = collection(firestore, "quotation");
const medicineCollectionRef = collection(firestore, "pMedicines");
const purchageOrderRef = collection(firestore, "purchageOrder");

class PurchaseService {
    addVendor = (newVendor) => {
        return addDoc(vendorCollectionRef, newVendor);
    }
    getAllQuotationData = async () => {
        return getDocs(quotationCollectionRef);
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
        const queryRef = doc(vendorCollectionRef, vendorId);
        const vendorDocSnapshot = await getDoc(queryRef);
        if (vendorDocSnapshot.exists()) {
            // Document exists, return its data
            return { id: vendorDocSnapshot.id, ...vendorDocSnapshot.data() };
        } else {
            // Document does not exist
            throw new Error("Vendor document not found");
        }
        // const querySnapshot = await getDocs(queryRef);
        // const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        // return filteredData;
    }

    addRequisitionData = async (data) => {
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
        data?.forEach((object) => {
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
    medicineById = async (vendorId, medicineId) => {
        console.log(vendorId, medicineId, 'service call')
        let queryRef;
        if (medicineId && vendorId && medicineId !== '' && vendorId !== '') {
            queryRef = query(quotationCollectionRef,
                where("medicineId", "==", medicineId),
                where("vendorId", "==", vendorId),
                orderBy("ptr", "asc"),
                limit(5));
        } else if (medicineId && medicineId !== '') {
            queryRef = query(quotationCollectionRef,
                where("medicineId", "==", medicineId),
                orderBy("ptr", "asc"),
                limit(5));
        } else if (vendorId && vendorId !== '') {
            queryRef = query(quotationCollectionRef,
                where("vendorId", "==", vendorId),
                orderBy("ptr", "asc"),
                limit(5));
        } else {
            queryRef = query(quotationCollectionRef,
                orderBy("ptr", "asc"),
                limit(5));
        }
        const querySnapshot = await getDocs(queryRef);
        const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        console.log(filteredData)
        return filteredData;
    }

    savePO = async (data) => {
        const batch = [];
        data?.forEach((object) => {
            const docRef = purchageOrderRef;
            batch.push(addDoc(docRef, object));
        });
        try {
            await Promise.all(batch);
            console.log('Purchage order data added to Firestore successfully!');
        } catch (error) {
            console.error('Error adding purchage order data to Firestore: ', error);
        }
    }

}
export default new PurchaseService();
