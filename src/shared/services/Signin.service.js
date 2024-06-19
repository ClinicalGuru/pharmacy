import { firestore } from "../../context/firebase";
import { addDoc, getDocs, getDoc, collection, orderBy, deleteDoc, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";

const employeesCollectionRef = collection(firestore, "employees");

class SigninService {
    validateUser = async (name, pharmacyId) => {
        const queryRef = query(employeesCollectionRef, where("pharmacyId", "==", pharmacyId), where("firstName", "==", name));
        const querySnapshot = await getDocs(queryRef);
        const filterData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        return filterData;
    }
}

export default new SigninService()