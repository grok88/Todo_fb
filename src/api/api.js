import {db} from "../firebase";
import firebase from 'firebase';

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

export function createTodo(data) {
    return db.collection("todos").add({
        ...data,
        completed: false
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

export function changeTodoTaskStatus(value, todoId) {
    return db.collection("todos").doc(todoId)
        .update({completed: value})
        .then(() => {
            // console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

export function loginByPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => console.log('User is Login'))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

export function checkUserAuth() {
    return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const email = user.email;
            const name = user.displayName;
            console.log({
                uid,
                email,
                name,
            })
            return {
                uid,
                email,
                name,
            }
            // ...
        } else {
            // User is signed out
            // ...
        }
    })
}