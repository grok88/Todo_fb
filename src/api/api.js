import {db} from "../firebase";
import firebase from "firebase";

//AUTH
export const authAPI = {
    loginByPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    logOut() {
        return firebase.auth().signOut();
    }
}
//LISTS
export const listsAPI = {
    getLists(userUid) {
        return db.collection('lists')
            .where('userId', '==', userUid)
            .get()
            .then((snapshot) => {
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                return items;
            })
    },
    updateList(data, listId) {
        return db.collection("lists").doc(listId).update(data);
    },
    createList(data) {
        return db.collection("lists").add({
            sort: '',
            ...data,
        })
            .then(docRef => docRef.get())
            .then(doc => ({
                id: doc.id,
                ...doc.data()
            }))
    },
    deleteList(listId) {
        return db.collection("lists").doc(listId).delete();
    }
}
//TODOS
export const todosAPI = {
    getTodos(userId = '') {
        return db.collection('todos')
            .where('userId', '==', userId)
            .get()
            .then((snapshot) => {
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                return items;
            })
    },
    createTodo(data) {
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
    },
    updateTodo(data, todoId) {
        return db.collection("todos").doc(todoId).update(data)
    },
    deleteTodo(todoId) {
        return db.collection("todos").doc(todoId).delete()
        // .then(() => todoId);
    }
}


