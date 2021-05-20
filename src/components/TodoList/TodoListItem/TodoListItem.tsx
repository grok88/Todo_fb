import React from 'react';

import {TodoType} from '../TodoList';
import {Checkbox, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

type TodoListItemPropsType = {
    todo: TodoType
    onUpdate: (field: any, todoId: string) => void
    onDeleteTodo: (todoId: string) => void
    onSelectedTodo: (todo: TodoType | null) => void
}

export const TodoListItem: React.FC<TodoListItemPropsType> = React.memo((props) => {
    const {todo, onUpdate, onDeleteTodo, onSelectedTodo} = props;
    return (
        <ListItem key={todo.id} dense button>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={todo.completed}
                    disableRipple
                    onChange={(e) => onUpdate({completed: e.currentTarget.checked}, todo.id)}
                />
            </ListItemIcon>
            <ListItemText onClick={() => onSelectedTodo(todo)}>
                {todo.title}
            </ListItemText>
            <ListItemIcon onClick={() => onUpdate({important: !todo.important}, todo.id)} style={{cursor: 'pointer'}}>
                {todo.important ? <StarIcon/> : <StarBorderIcon/>}
            </ListItemIcon>
            <ListItemIcon onClick={() => onDeleteTodo(todo.id)} style={{cursor: 'pointer'}}>
                <DeleteIcon/>
            </ListItemIcon>
        </ListItem>
    );
});