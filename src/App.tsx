import React, {useEffect, useState} from 'react';
import {db} from './firebase';
import './app.scss';
import AppContent from './components/AppContent/AppContent';
import AppDrawer from './components/AppDrawer/AppDrawer';
import {getCollection} from './api/api';

const App = () => {
    console.log('App');

    const [lists, setLists] = useState<Array<{ title: string, id: string }>>([]);
    const [todos, setTodos] = useState<Array<{ title: string, id: string }>>([]);

    useEffect(() => {
        // @ts-ignore
        getCollection('lists').then(setLists);
        // @ts-ignore
        getCollection('todos').then(setTodos);
    }, []);

    return (
        <div className="app">
            <AppDrawer/>
            <AppContent>
                <ul>
                    {
                        todos.map(todo => <li key={todo.id}>{todo.title}</li>)
                    }
                </ul>
            </AppContent>
        </div>
    );
}

export default App;
