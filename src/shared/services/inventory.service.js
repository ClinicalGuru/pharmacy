import { firestore } from "../../context/firebase";
import { addDoc, getDocs, getDoc, collection, orderBy, limit, doc, query, onSnapshot, writeBatch, where, updateDoc } from "firebase/firestore";
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

    getInventory = async () => {
        return await getDocs(inventoryRef);
    }

    queryInventoryWithMedicineIds = async (idsList) => {
        const q = query(inventoryRef, where('medicineId', 'in', idsList));
        try {
            return await getDocs(q);
        } catch (error) {
            console.error('Error fetching inventory: ', error);
            throw error;
        }
    }

    updatingInventory = async (inventoryList) => {
        try {
            await Promise.all(inventoryList.map(async (inventory) => {
                const { inventoryId, ...newData } = inventory;
                const docRef = doc(inventoryRef, inventoryId);
                return await updateDoc(docRef, newData);
            }))
        }
        catch (err) {
            console.error('Error updating inventory: ', err);

        }
    }
}
export default new InventoryService();
