// src/hooks/useFirebaseQuery.js
import { useQuery, useMutation, queryCache } from '@tanstack/react-query'; // Import useMutation and queryCache
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
} from 'firebase/firestore'; // Import Firestore methods
import { db } from '../context/firebase';

// Function to fetch documents based on query parameters
const fetchDocuments = async (collectionName, conditions = []) => {
    let firestoreQuery = collection(db, collectionName);

    // Apply conditions dynamically
    conditions.forEach((condition) => {
        const { fieldPath, operator, value } = condition;
        firestoreQuery = query(firestoreQuery, where(fieldPath, operator, value));
    });

    const querySnapshot = await getDocs(firestoreQuery);
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents;
};

// React Query hook to use Firestore query
const useFirebaseQuery = (collectionName, conditions = []) => {
    return useQuery([collectionName, conditions], () => fetchDocuments(collectionName, conditions));
};

// React Query mutation hook to add a document
const useAddDocumentMutation = (collectionName) => {
    return useMutation((newDocument) => addDoc(collection(db, collectionName), newDocument), {
        onSuccess: () => {
            queryCache.invalidateQueries(collectionName); // Invalidate the cache to trigger a refetch
        },
    });
};

// React Query mutation hook to delete a document
const useDeleteDocumentMutation = (collectionName) => {
    return useMutation((documentId) => deleteDoc(doc(db, collectionName, documentId)), {
        onSuccess: () => {
            queryCache.invalidateQueries(collectionName); // Invalidate the cache to trigger a refetch
        },
    });
};

// React Query mutation hook to update a document
const useUpdateDocumentMutation = (collectionName) => {
    return useMutation(
        ({ documentId, updatedFields }) =>
            updateDoc(doc(db, collectionName, documentId), updatedFields),
        {
            onSuccess: () => {
                queryCache.invalidateQueries(collectionName); // Invalidate the cache to trigger a refetch
            },
        }
    );
};

// React Query mutation hook to update multiple documents in a batch
const useUpdateDocumentsInBatchMutation = (collectionName) => {
    return useMutation((updates) => {
        const batch = db.batch();
        updates.forEach(({ id, fields }) => {
            const docRef = doc(db, collectionName, id);
            batch.update(docRef, fields);
        });
        return batch.commit().then(() => updates.map(({ id, fields }) => ({ id, ...fields })));
    }, {
        onSuccess: () => {
            queryCache.invalidateQueries(collectionName); // Invalidate the cache to trigger a refetch
        },
    });
};

export {
    useFirebaseQuery,
    useAddDocumentMutation,
    useDeleteDocumentMutation,
    useUpdateDocumentMutation,
    useUpdateDocumentsInBatchMutation,
};
