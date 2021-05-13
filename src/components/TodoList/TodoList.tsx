import React from 'react';
import AppContent from '../AppContent/AppContent';
import {List, Typography} from '@material-ui/core';
import {ListsType} from '../AppDrawer/AppDrawer';
import {TodoListItem} from './TodoListItem/TodoListItem';

export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type TodoListPropsType = {
    list?: ListsType
    todos: Array<TodoType>
    onDeleteTodo:(todoId:string,) => void
    onStatusChange: (value:boolean,todoId:string) => void
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({todos, list,onDeleteTodo,onStatusChange}) => {
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
                                                 onDeleteTodo={onDeleteTodo}
                                                 onStatusChange={onStatusChange}/>
                        })
                    }
                </List>
            </div>
        </AppContent>
    );
});