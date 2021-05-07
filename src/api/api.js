import {db} from "../firebase";

export function getCollection(collection) {
    return db.collection(collection)
        // .where('capital', '==', true)
        .get()
        .then((snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return items;
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
}

export function getSortedCollection(collection, sortBy, value) {
    return db.collection(collection)
        .where(sortBy, '==', value)
        .get()
        .then((snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return items;
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
}