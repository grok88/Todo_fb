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
    list?: ListsType
    todos:Array<TodoType>
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({todos, list}) => {

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