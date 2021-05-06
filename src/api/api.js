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