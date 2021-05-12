import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {getCollection, getSortedCollection} from '../../api/api';
import {TodoList} from '../../components/TodoList/TodoList';
import {ListsType} from '../../components/AppDrawer/AppDrawer';


export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type  ParamsType = {
    listId: string
}
type TodoListPagePropsType = {
    // todos:TodoType[]
    lists: Array<ListsType>
}
export const TodoListPage: React.FC<TodoListPagePropsType> = React.memo((props) => {

    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const {listId} = useParams<ParamsType>();
    console.log(todos)

    useEffect(() => {
        if (listId) {
            // @ts-ignore
            getSortedCollection('todos', 'listId', listId).then(setTodos);
        } else {
            // @ts-ignore
            getCollection('todos').then(setTodos);
        }
    }, [listId]);

    const list = props.lists.find(list => list.id === listId);


    // if(!list ){
    //     return  <LinearProgress color="secondary" />
    // }
    return (
        <TodoList list={list} todos={todos}/>
    );
});