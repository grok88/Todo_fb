import React, {useEffect, useState} from 'react';
import './app.scss';
import AppDrawer, {ListsType} from './components/AppDrawer/AppDrawer';
import {getCollection} from './api/api';
import {Route, Switch} from 'react-router-dom';
import {TodoList} from './components/TodoList/TodoList';

const App = () => {
    console.log('App');

    const [lists, setLists] = useState<Array<ListsType>>([]);
    // const [todos, setTodos] = useState<Array<TodoType>>([]);

    useEffect(() => {
        // @ts-ignore
        getCollection('lists').then(setLists);
        // @ts-ignore
        // getCollection('todos').then(setTodos);
    }, []);

    return (
        <div className="app">
            <AppDrawer lists={lists}/>
            <Switch>
                <Route exact path={'/:listId?'} render={() => <TodoList lists={lists} />}/>
            </Switch>
        </div>
    );
}

export default App;
