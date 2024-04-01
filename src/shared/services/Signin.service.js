import { firestore } from "../../context/firebase";
import { addDoc, getDocs, getDoc, collection, orderBy, deleteDoc, doc, query, onSnapshot, writeBatch, where } from "firebase/firestore";

const employeesCollectionRef = collection(firestore, "employees");

class SigninService {
    validateUser = async (name) => {
        const queryRef = query(employeesCollectionRef, where("firstName", "==", name));
        const querySnapshot = await getDocs(queryRef);
        const filterData = querySnapshot.docs.map((doc) => ({ ...doc.data()}));
        console.log(filterData)
        return filterData;

        // const queryRef = query(employeesCollectionRef, where("firstName", "==", name));
        // const querySnapshot = await getDocs(queryRef);

        // // Now you can use the querySnapshot as needed
        // const filteredData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        // return filteredData;
    }
}

export default new SigninService()