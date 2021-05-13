import React from 'react';

import {TodoType} from '../TodoList';
import {Checkbox, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type TodoListItemPropsType = {
    todo: TodoType
    onStatusChange: (value:boolean,todoId:string) => void
    onDeleteTodo:(todoId:string) => void
}

export const TodoListItem: React.FC<TodoListItemPropsType> = React.memo((props) => {
    console.log('TodoListItem')
    const {todo, onStatusChange,onDeleteTodo} = props;
    return (
        <ListItem key={todo.id} dense  >
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={todo.completed}
                    disableRipple
                    onChange={(e) => onStatusChange(e.currentTarget.checked,todo.id)}
                />
            </ListItemIcon>
            <ListItemText>
                {todo.title}
            </ListItemText>
            <ListItemIcon onClick={() => onDeleteTodo(todo.id)} style={{cursor:'pointer'}}>
                <DeleteIcon/>
            </ListItemIcon>
        </ListItem>
    );
});