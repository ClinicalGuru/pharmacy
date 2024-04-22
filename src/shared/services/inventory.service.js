import { firestore } from "../../context/firebase";
import { addDoc, getDocs, getDoc, collection, orderBy, limit, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const invoiceRef = collection(firestore, "invoice");
const inventoryRef = collection(firestore, "medicineInventory");

class InventoryService {

    addInvoice = async (data) => {
        return addDoc(invoiceRef, data);
    }

    addInventory = async (data) => {
        const batch = [];
        data?.forEach((object) => {
            const docRef = inventoryRef;
            batch.push(addDoc(docRef, object));
        });

        try {
            await Promise.all(batch);
            console.log('Medicine inventory data added to Firestore successfully!');
        } catch (error) {
            console.error('Error adding data to medicine inventory Firestore: ', error);
        }
    }

    getAllInventory = () => {
        return getDocs(inventoryRef);
    }
}
export default new InventoryService();
