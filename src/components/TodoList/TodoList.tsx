import React from 'react';
import AppContent from '../AppContent/AppContent';
import {List} from '@material-ui/core';
import {ListsType} from '../AppDrawer/AppDrawer';
import {TodoListItem} from './TodoListItem/TodoListItem';
import {TodoHeader} from './TodoHeader/TodoHeader';

export type TodoType = {
    title: string, id: string,
    listId: string,
    completed: boolean,
    dueDate: null | string
    important: boolean
    notes: string
    userId: string
    steps: Array<any>
};

type TodoListPropsType = {
    list: ListsType
    todos: Array<TodoType>
    onDeleteTodo: (todoId: string,) => void
    onUpdate: (field: any, todoId: string) => void
    onSelectedTodo: (todo: TodoType | null) => void
    // sortBy:string
    // onSort:(sort:string) => void
    onUpdateList:(field: any, listId: string) => void
}
export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {
    const {todos, list, onDeleteTodo, onUpdate, onSelectedTodo,onUpdateList} = props;
    return (
        <AppContent>
            <div className={'todo-list'}>
                <TodoHeader list={list}
                            // sortBy={sortBy} onSort={onSort}
                            onUpdateList={onUpdateList}/>
                <List>
                    {
                        todos.map(todo => {
                            return <TodoListItem key={todo.id} todo={todo}
                                                 onDeleteTodo={onDeleteTodo}
                                                 onSelectedTodo={onSelectedTodo}
                                                 onUpdate={onUpdate}
                            />
                        })
                    }
                </List>
            </div>
        </AppContent>
    );
});