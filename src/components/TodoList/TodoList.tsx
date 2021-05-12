import React from 'react';
import AppContent from '../AppContent/AppContent';
import {List, Typography} from '@material-ui/core';
import {ListsType} from '../AppDrawer/AppDrawer';
import {TodoListItem} from './TodoListItem/TodoListItem';

export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type TodoListPropsType = {
    list?: ListsType
    todos: Array<TodoType>
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({todos, list}) => {
    console.log('TodoList');
    return (
        <AppContent>
            <div className={'todo-list'}>
                <Typography variant="h3" component="h2" style={{margin: '16px'}} align={'center'}>
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