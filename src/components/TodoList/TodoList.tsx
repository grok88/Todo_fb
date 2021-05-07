import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppContent from '../AppContent/AppContent';
import {getSortedCollection} from '../../api/api';

export type TodoType = { title: string, id: string, listId: string };

type  ParamsType = {
    listId: string
}
type TodoListPropsType = {
    // todos:TodoType[]
}
export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const {listId} = useParams<ParamsType>();
    useEffect(() => {
        if (listId) {
            // @ts-ignore
            getSortedCollection('todos', 'listId', listId).then(setTodos);
        }
    }, [listId]);

    return (
        <AppContent>
            <ul>
                {
                    todos.map(todo => <li key={todo.id}>{todo.title}</li>)
                }
            </ul>
        </AppContent>
    );
});