import {db} from "../firebase";
import firebase from "firebase";

export function getLists(userId) {
    return db.collection('lists')
        .where('userId', '==', userId)
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

export function getTodos(userId = '') {
    return db.collection('todos')
        // .where('listId', '==', '')
        .where('userId', '==', userId)
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

// TODO
export function createTodo(data) {
    return db.collection("todos").add({
        completed: false,
        notes: '',
        steps: [],
        ...data,
    })
        .then(docRef => docRef.get())
        .then(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export function deleteTodoTask(todoId) {
    return db.collection("todos").doc(todoId).delete()
        .then(() => todoId);
}

export function updateTodo(data, todoId) {
    return db.collection("todos").doc(todoId)
        .update(data)
        .then(() => {
            // console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

//LIST
export function createList(data) {
    return db.collection("lists").add({
        sort: '',
        ...data,
    })
        .then(docRef => docRef.get())
        .then(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}


//AUTH
export const authAPI = {
    loginByPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    logOut() {
        return firebase.auth().signOut();
    }
}

// export function loginByPassword(email, password) {
//     return firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(() => console.log('User is Login'))
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage)
//         });
// }
