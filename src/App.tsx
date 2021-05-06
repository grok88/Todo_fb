import React, {useEffect, useState} from 'react';
import {db} from './firebase';

const App = () => {
    console.log('App');
    const [todos, setTodos] = useState<Array<{ title: string, id: string }>>([]);

    useEffect(() => {
        db.collection('todos')
            // .where('capital', '==', true)
            .get()
            .then((snapshot) => {
                const todoData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(todoData)
                // @ts-ignore
                setTodos(todoData);

                // snapshot.forEach((doc) => {
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log(doc.id, ' => ', doc.data());
                // });
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }, []);

    return (
        <div className="App">
            <ul>
                {
                    todos.map(todo => <li key={todo.id}>{todo.title}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
