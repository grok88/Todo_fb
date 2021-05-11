import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppContent from '../AppContent/AppContent';
import {getCollection, getSortedCollection} from '../../api/api';
import {List, Typography} from '@material-ui/core';
import {ListsType} from '../AppDrawer/AppDrawer';
import {TodoListItem} from './TodoListItem/TodoListItem';


export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type  ParamsType = {
    listId: string
}
type TodoListPropsType = {
    // todos:TodoType[]
    lists: Array<ListsType>
}
export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

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
        <AppContent>
            <div className={'todo-list'}>
                <Typography variant="h3" component="h2" style={{margin: '16px'}}>
                    {list && list.title}
                </Typography>

                <List>
                    {
                        todos.map(todo => {
                            return <TodoListItem key={todo.id} todo={todo}
                                                 onStatusChange={() => console.log('CHANGE')}/>
                        })
                    }
                </List>
            </div>
        </AppContent>
    );
});